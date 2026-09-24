import type { PageServerLoad } from './$types';
import { site } from '$lib/site';
import { env } from '$env/dynamic/private';
import {
	fetchWakaTime,
	fetchWakaTimeWeek,
	fetchGitHub,
	fetchLeetCode
} from '$lib/server/stats';

export const load: PageServerLoad = async () => {
	const [wakaTime, wakaTimeWeek, github, leetCode] = await Promise.all([
		env.WAKATIME_API && env.WAKATIME_API_KEY
			? fetchWakaTime(env.WAKATIME_API, env.WAKATIME_API_KEY)
			: Promise.resolve({ data: { total_seconds: 0, text: 'N/A', range: { start: new Date().toISOString() } } }),

		env.WAKATIME_API && env.WAKATIME_API_KEY
			? fetchWakaTimeWeek(env.WAKATIME_API, env.WAKATIME_API_KEY)
			: Promise.resolve({ worldRank: null, countryRank: null, totalSeconds: 0, dailyAverage: 0, languages: [] }),

		env.GITHUB_API && env.GITHUB_API_KEY && env.GITHUB_USERNAME
			? fetchGitHub(env.GITHUB_API, env.GITHUB_API_KEY, env.GITHUB_USERNAME)
			: Promise.resolve(null),

		env.LEETCODE_API && env.LEETCODE_USERNAME
			? fetchLeetCode(env.LEETCODE_API, env.LEETCODE_USERNAME)
			: Promise.resolve(null)
	]);

	return {
		metaTitle: `${site.title} — ${site.tagline}`,
		metaDescription: site.description.replace(/\s+/g, ' ').trim(),
		wakaTime,
		wakaTimeWeek,
		github,
		leetCode
	};
};
