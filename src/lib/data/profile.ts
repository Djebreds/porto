// Single source for CV content — the home page and the chat assistant both read from here,
// so updating the CV means editing this file only.

export type Job = {
	role: string;
	company: string;
	location: string;
	start: string;
	end: string;
	highlights: string[];
};

export type Project = {
	title: string;
	subtitle: string;
	roles: string[];
	period: string;
	summary: string;
	highlights?: string[];
	stack: string[];
	image?: string;
	href?: string;
	featured?: boolean;
};

export type Certification = {
	name: string;
	issuer: Issuer;
	date: string;
	url: string;
};

export type Issuer = 'Anthropic' | 'HackerRank' | 'Dicoding Academy' | 'Udemy';

export type SkillGroup = { label: string; items: string[] };

export type Place = { name: string; location: [number, number]; current?: boolean };

export const summary =
	'Software engineer with nearly four years of experience in backend and full-stack development, specializing in Ruby on Rails and NestJS. I build scalable applications, design RESTful APIs and microservices, and work with cross-functional teams to deliver user-centric products for clients across healthcare, education, fintech, and property.';

export const spokenLanguages = [
	{ name: 'Indonesian', level: 'Native' },
	{ name: 'English', level: 'Professional working' },
	{ name: 'Malay', level: 'Elementary' }
] as const;

// Cities on the globe: where I've worked from or shipped for.
export const places: Place[] = [
	{ name: 'Kuala Lumpur', location: [3.139, 101.6869], current: true },
	{ name: 'Jakarta', location: [-6.2088, 106.8456] },
	{ name: 'Bandung', location: [-6.9175, 107.6191] },
	{ name: 'Riyadh', location: [24.7136, 46.6753] }
];

export const skills: SkillGroup[] = [
	{ label: 'Languages', items: ['Ruby', 'TypeScript', 'JavaScript', 'Python', 'SQL'] },
	{
		label: 'Backend',
		items: [
			'Ruby on Rails',
			'NestJS',
			'Node.js',
			'Express.js',
			'Django',
			'Laravel',
			'REST APIs',
			'GraphQL',
			'Microservices'
		]
	},
	{
		label: 'Frontend & Mobile',
		items: ['Hotwire', 'Stimulus.js', 'React', 'Next.js', 'Vue.js', 'TailwindCSS', 'Flutter']
	},
	{
		label: 'Data & Messaging',
		items: [
			'PostgreSQL',
			'MySQL',
			'SQLite',
			'Redis',
			'Sidekiq',
			'BullMQ',
			'RabbitMQ',
			'Kafka',
			'TypeORM',
			'Prisma'
		]
	},
	{
		label: 'DevOps & Cloud',
		items: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'DigitalOcean', 'Nginx', 'CI/CD', 'Git']
	},
	{
		label: 'Testing & Practices',
		items: [
			'RSpec',
			'Unit Testing',
			'Code Review',
			'System Design',
			'Database Design',
			'OOP',
			'Agile/Scrum'
		]
	},
	{ label: 'AI Tools', items: ['Claude Code', 'Codex', 'OpenCode', 'Hermes', 'Cursor'] }
];

export const experience: Job[] = [
	{
		role: 'Software Engineer',
		company: 'Snappymob Sdn. Bhd.',
		location: 'Kuala Lumpur, Malaysia',
		start: 'Jul 2025',
		end: 'Present',
		highlights: [
			'Deliver custom software solutions for clients across multiple industries.',
			'Contribute to backend development, planning, and architectural design of client applications.',
			'Support full product delivery from API design through frontend integration.',
			'Apply testing and code standards to keep releases reliable and maintainable.'
		]
	},
	{
		role: 'Software Engineer',
		company: 'Aajil Inc.',
		location: 'Riyadh, Saudi Arabia',
		start: 'Apr 2025',
		end: 'Jul 2025',
		highlights: [
			'Built and maintained a scalable Buy Now, Pay Later (BNPL) web application using Django.',
			'Integrated n8n workflows and Zoho Books for automation and accounting.',
			'Collaborated on AI-powered quotation line features.',
			'Improved deployment efficiency with CI/CD and enhanced system performance.'
		]
	},
	{
		role: 'Backend Developer',
		company: 'PT. Kiranatama Teknologi (Emveep)',
		location: 'Bandung, Indonesia',
		start: 'Jul 2023',
		end: 'Mar 2025',
		highlights: [
			'Built scalable backend systems with a focus on reliability and performance.',
			'Optimized API performance, reducing response times through caching.',
			'Integrated a microservices architecture to improve scalability.',
			'Implemented security protocols to safeguard data and ensure compliance.'
		]
	},
	{
		role: 'Full-Stack Developer (Ruby on Rails)',
		company: 'PT. Halalin Digital International',
		location: 'Jakarta, Indonesia',
		start: 'May 2023',
		end: 'Jul 2024',
		highlights: [
			'Designed SSO, LMS, and certification systems for enterprise clients.',
			'Delivered client MVPs by prioritizing key backend features in agile sprints.',
			'Reduced production defects through rigorous code reviews and testing.',
			'Translated business requirements into scalable technical specifications.'
		]
	},
	{
		role: 'Full-Stack Developer (Ruby on Rails)',
		company: 'PT. NIT Studio Kreatif',
		location: 'Bandung, Indonesia',
		start: 'Jul 2022',
		end: 'Apr 2023',
		highlights: [
			'Contributed to full-cycle development of scalable web applications using Ruby on Rails.',
			'Developed robust backend APIs using Ruby on Rails.',
			'Implemented automated testing and CI/CD pipelines for efficient deployments.',
			'Optimized system performance, improving processing speeds.'
		]
	},
	{
		role: 'Full-Stack Developer Intern',
		company: 'PT. Basic Teknologi Intersolusi',
		location: 'Bandung, Indonesia',
		start: 'May 2022',
		end: 'Jul 2022',
		highlights: [
			'Developed LMS platforms to automate internal workflows and communication.',
			'Enhanced financial applications through backend logic refinement.',
			'Created detailed documentation, reducing developer onboarding time.'
		]
	}
];

export const projects: Project[] = [
	{
		title: 'Cahaves Cloud',
		subtitle: 'Platform as a Service',
		roles: ['Founder'],
		period: '2026 — Present',
		summary:
			'A PaaS that builds and deploys apps on git push. Founded PT Cahaves Technology International to build it.',
		highlights: [
			'Rails 8 API with a Next.js console that provisions containerized workloads on DigitalOcean.',
			'GitHub App deploys, managed databases, custom domains with automatic HTTPS, volumes, metrics, and SSH into running containers.'
		],
		stack: ['Rails 8', 'Next.js', 'Docker', 'DigitalOcean', 'PostgreSQL', 'Redis'],
		href: 'https://cloud.cahaves.com',
		featured: true
	},
	{
		title: 'Nukitu',
		subtitle: 'Healthcare technician marketplace',
		roles: ['Backend'],
		period: '2025 — 2026',
		summary:
			'On-demand platform connecting healthcare institutions with certified medical device technicians, with contract and payment workflows, QR work verification, and auto escalation.',
		stack: ['Ruby on Rails', 'PostgreSQL', 'REST API']
	},
	{
		title: 'BPK Penabur',
		subtitle: 'School management system',
		roles: ['Backend'],
		period: '2023 — 2025',
		summary:
			'Microservice architecture that centralizes academic operations, shipped with Docker and Kubernetes CI/CD and IoT devices for attendance tracking.',
		stack: ['NestJS', 'Microservices', 'Docker', 'Kubernetes']
	},
	{
		title: 'Gravesaint',
		subtitle: 'Streetwear e-commerce',
		roles: ['Full-stack'],
		period: '2025',
		summary:
			'Online store for a local T-shirt label with local payment gateways, real-time shipping tracking, and a full admin and storefront.',
		stack: ['Ruby on Rails', 'PostgreSQL', 'Stimulus.js']
	},
	{
		title: 'Halalin',
		subtitle: 'Halal certification, LMS, and back office',
		roles: ['Full-stack'],
		period: '2023 — 2024',
		summary:
			'Halal certification platform with manual approval workflows, an LMS serving 500+ professionals, and a Hotwire back office that cut data entry errors by 30%.',
		stack: ['Ruby on Rails', 'Hotwire', 'Stimulus.js', 'PostgreSQL', 'Sidekiq'],
		image: '/projects/halalin.webp'
	},
	{
		title: 'Property Listing',
		subtitle: 'Bali rental and sale platform',
		roles: ['Full-stack'],
		period: '2023',
		summary:
			'Property search with geolocation filters that boosted engagement by 45%, and Google Maps listings that cut agent coordination time by 30%.',
		stack: ['Ruby on Rails', 'Google Maps', 'PostgreSQL'],
		image: '/projects/property.webp'
	},
	{
		title: 'Neqat',
		subtitle: 'QR and geolocation attendance',
		roles: ['Full-stack', 'Mobile'],
		period: '2023',
		summary:
			'Rails backend validating QR attendance with geofencing, reducing proxy entries by 90%, plus a Flutter companion app and Excel/CSV exports for HR.',
		stack: ['Ruby on Rails', 'Flutter', 'PostgreSQL']
	},
	{
		title: 'Abapparel Store',
		subtitle: 'Custom apparel e-commerce',
		roles: ['Full-stack'],
		period: '2023',
		summary:
			'Custom shirt store on Solidus with size customization, bulk ordering, and one-click guest checkout.',
		stack: ['Ruby on Rails', 'Solidus', 'PostgreSQL']
	},
	{
		title: 'Supirin',
		subtitle: 'Online taxi aggregator',
		roles: ['Full-stack', 'Mobile'],
		period: '2022 — 2023',
		summary:
			'Ride booking and dispatch APIs, Xendit payments, and a Flutter app with fare estimates and driver tracking.',
		stack: ['Ruby on Rails', 'Flutter', 'Xendit', 'Redis'],
		image: '/projects/supirin.webp'
	},
	{
		title: 'Central Acrylic',
		subtitle: 'Industrial machine monitoring',
		roles: ['Full-stack'],
		period: '2022',
		summary:
			'Dashboards for CNC, cutting, and welding machine status, with maintenance and downtime reporting.',
		stack: ['Ruby on Rails', 'PostgreSQL'],
		image: '/projects/central-acrylic.webp'
	},
	{
		title: 'Basic School',
		subtitle: 'Coding bootcamp platform',
		roles: ['Full-stack'],
		period: '2022',
		summary:
			'Bootcamp platform with pre-recorded lessons, downloadable resources, and student and instructor roles.',
		stack: ['Laravel', 'MySQL'],
		image: '/projects/basic-school.webp'
	}
];

export const education = {
	degree: "Bachelor's Degree in Computer Science",
	program: 'Fast Track Program',
	school: 'Cakrawala University',
	start: 'Mar 2026',
	end: 'Jul 2028 (Expected)',
	highlights: [
		'Coursework in algorithms and data structures, system design, databases, and the software development life cycle.',
		'Led a team project developing a school management system.',
		'Ran knowledge-sharing sessions, mentoring classmates in full-stack development.'
	]
};

export const certifications: Certification[] = [
	{
		name: 'Building with the Claude API',
		issuer: 'Anthropic',
		date: 'Jul 2026',
		url: 'https://verify.skilljar.com/c/gpnpdmaxrgyi'
	},
	{
		name: 'Claude Code in Action',
		issuer: 'Anthropic',
		date: 'Jul 2026',
		url: 'https://verify.skilljar.com/c/9ix7rksa5diu'
	},
	{
		name: 'Introduction to Model Context Protocol',
		issuer: 'Anthropic',
		date: 'Jul 2026',
		url: 'https://verify.skilljar.com/c/3qy5ivqu4mum'
	},
	{
		name: 'Claude Code 101',
		issuer: 'Anthropic',
		date: 'Jul 2026',
		url: 'https://verify.skilljar.com/c/gi23nth6pa8c'
	},
	{
		name: 'Claude 101',
		issuer: 'Anthropic',
		date: 'Jul 2026',
		url: 'https://verify.skilljar.com/c/3eifx5qcak8p'
	},
	{
		name: 'Introduction to Agent Skills',
		issuer: 'Anthropic',
		date: 'Jun 2026',
		url: 'https://verify.skilljar.com/c/4yeczpgmu7es'
	},
	{
		name: 'Software Engineer',
		issuer: 'HackerRank',
		date: 'Dec 2024',
		url: 'https://hackerrank.com/certificates/f982dc9bd7a4'
	},
	{
		name: 'SQL (Advanced)',
		issuer: 'HackerRank',
		date: 'Sep 2024',
		url: 'https://hackerrank.com/certificates/f21523d9a50c'
	},
	{
		name: 'SQL (Intermediate)',
		issuer: 'HackerRank',
		date: 'Sep 2024',
		url: 'https://hackerrank.com/certificates/e3280155734e'
	},
	{
		name: 'SQL (Basic)',
		issuer: 'HackerRank',
		date: 'Sep 2024',
		url: 'https://hackerrank.com/certificates/496f130f723b'
	},
	{
		name: 'Node.js (Basic)',
		issuer: 'HackerRank',
		date: 'Sep 2024',
		url: 'https://hackerrank.com/certificates/9aa01b7d992c'
	},
	{
		name: 'Basics of Networking',
		issuer: 'Dicoding Academy',
		date: 'Jun 2023',
		url: 'https://dicoding.com/certificates/EYX46GO4JPDL'
	},
	{
		name: 'Basics of JavaScript',
		issuer: 'Dicoding Academy',
		date: 'Jun 2023',
		url: 'https://dicoding.com/certificates/EYX46GO4JPDL'
	},
	{
		name: 'Basics of Ruby',
		issuer: 'Udemy',
		date: 'May 2023',
		url: 'https://udemy.com/certificate/UC-cab4b357-e9c3-4d9c-b999-45352adce6da'
	},
	{
		name: 'Ruby with RSpec',
		issuer: 'Udemy',
		date: 'Feb 2023',
		url: 'https://udemy.com/certificate/UC-78145369-abfe-4f3f-a525-378038a2bd54'
	},
	{
		name: 'Basics of DevOps',
		issuer: 'Dicoding Academy',
		date: 'Jan 2023',
		url: 'https://dicoding.com/certificates/RVZKKWM4EZD5'
	},
	{
		name: 'AWS Cloud Practitioner Essentials',
		issuer: 'Dicoding Academy',
		date: 'Dec 2021',
		url: 'https://dicoding.com/certificates/ERZR4DW6WZYV'
	}
];

export const issuers: Issuer[] = ['Anthropic', 'HackerRank', 'Dicoding Academy', 'Udemy'];
