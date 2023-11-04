/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	headers: () => [
		{
			source: "/contact",
			headers: [
				{
					key: "Cache-Control",
					value: "no-store",
				},
			],
		},
	],
};

module.exports = nextConfig;
