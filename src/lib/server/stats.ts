// ── Types ─────────────────────────────────────────────────────────────────────

export type WakaTimeData = {
	data: {
		total_seconds: number;
		text: string;
		range: { start: string };
	};
};

export type WakaTimeWeek = {
	worldRank: number | null;
	countryRank: number | null;
	totalSeconds: number;
	dailyAverage: number;
	languages: { name: string; total: string }[];
};

export type GitHubStats = {
	contributionsCollection: { totalCommitContributions: number };
	repositoriesContributedTo: { totalCount: number };
	pullRequests: { totalCount: number };
	openIssues: { totalCount: number };
	closedIssues: { totalCount: number };
	repositories: {
		totalCount: number;
		nodes: { stargazers: { totalCount: number }; name: string }[];
	};
};

export type LeetCodeStats = {
	allQuestionsCount: { difficulty: string; count: number }[];
	matchedUser: {
		username: string;
		profile: { ranking: number };
		problemsSolvedBeatsStats: { difficulty: string; percentage: number | null }[];
		submitStatsGlobal: {
			acSubmissionNum: { difficulty: string; count: number; submissions: number }[];
		};
		userCalendar: { submissionCalendar: string };
	} | null;
};

// ── Fallbacks ─────────────────────────────────────────────────────────────────

function wakaFallback(): WakaTimeData {
	const now = new Date().toISOString();
	return { data: { total_seconds: 0, text: 'N/A', range: { start: now } } };
}

function wakaWeekFallback(): WakaTimeWeek {
	return { worldRank: null, countryRank: null, totalSeconds: 0, dailyAverage: 0, languages: [] };
}

function githubFallback(): GitHubStats {
	return {
		contributionsCollection: { totalCommitContributions: 0 },
		repositoriesContributedTo: { totalCount: 0 },
		pullRequests: { totalCount: 0 },
		openIssues: { totalCount: 0 },
		closedIssues: { totalCount: 0 },
		repositories: { totalCount: 0, nodes: [] }
	};
}

function leetFallback(): LeetCodeStats {
	return {
		allQuestionsCount: [
			{ difficulty: 'Easy', count: 0 },
			{ difficulty: 'Medium', count: 0 },
			{ difficulty: 'Hard', count: 0 }
		],
		matchedUser: null
	};
}

// ── Fetchers ──────────────────────────────────────────────────────────────────

export async function fetchWakaTime(apiUrl: string, apiKey: string): Promise<WakaTimeData> {
	try {
		const token = Buffer.from(apiKey).toString('base64');
		const res = await fetch(`${apiUrl}/users/current/all_time_since_today`, {
			headers: { Authorization: `Basic ${token}` }
		});
		if (!res.ok) return wakaFallback();
		return res.json();
	} catch {
		return wakaFallback();
	}
}

export async function fetchWakaTimeWeek(apiUrl: string, apiKey: string): Promise<WakaTimeWeek> {
	try {
		const token = Buffer.from(apiKey).toString('base64');
		const headers = { Authorization: `Basic ${token}` };
		const [leadersRes, regionalRes, statsRes] = await Promise.all([
			fetch(`${apiUrl}/leaders`, { headers }),
			fetch(`${apiUrl}/leaders?country_code=ID`, { headers }),
			fetch(`${apiUrl}/users/current/stats?including_today=true`, { headers })
		]);
		if (!leadersRes.ok || !regionalRes.ok || !statsRes.ok) return wakaWeekFallback();
		const [leaders, regional, stats] = await Promise.all([
			leadersRes.json(),
			regionalRes.json(),
			statsRes.json()
		]);
		return {
			worldRank: leaders.current_user?.rank ?? null,
			countryRank: regional.current_user?.rank ?? null,
			totalSeconds: stats.data?.total_seconds_including_other_language ?? 0,
			dailyAverage: stats.data?.daily_average_including_other_language ?? 0,
			languages:
				stats.data?.languages?.map((l: Record<string, string>) => ({
					name: l.name,
					total: l.text
				})) ?? []
		};
	} catch {
		return wakaWeekFallback();
	}
}

const GH_QUERY = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection { totalCommitContributions }
    repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) { totalCount }
    pullRequests(first: 1) { totalCount }
    openIssues: issues(states: OPEN) { totalCount }
    closedIssues: issues(states: CLOSED) { totalCount }
    repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
      totalCount
      nodes { stargazers { totalCount } name }
    }
  }
}`;

export async function fetchGitHub(apiUrl: string, apiKey: string, username: string): Promise<GitHubStats> {
	try {
		const res = await fetch(apiUrl, {
			method: 'POST',
			headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
			body: JSON.stringify({ query: GH_QUERY, variables: { login: username } })
		});
		if (!res.ok) return githubFallback();
		const json = await res.json();
		return json.data?.user ?? githubFallback();
	} catch {
		return githubFallback();
	}
}

const LC_QUERY = `
query($username: String!, $year: Int!) {
  allQuestionsCount { difficulty count }
  matchedUser(username: $username) {
    username
    profile { ranking }
    problemsSolvedBeatsStats { difficulty percentage }
    submitStatsGlobal { acSubmissionNum { difficulty count submissions } }
    userCalendar(year: $year) { submissionCalendar }
  }
}`;

export async function fetchLeetCode(apiUrl: string, username: string): Promise<LeetCodeStats> {
	try {
		const res = await fetch(apiUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query: LC_QUERY, variables: { username, year: new Date().getFullYear() } })
		});
		if (!res.ok) return leetFallback();
		const json = await res.json();
		return json.data ?? leetFallback();
	} catch {
		return leetFallback();
	}
}
