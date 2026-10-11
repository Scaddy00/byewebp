export const SITE_CONFIG = {
  name: 'ZapWebp',
  tagline: 'Instant WebP to PNG/JPG Converter (100% Client-Side)',
  url: 'https://zapwebp.pages.dev',
  githubUrl: 'https://github.com/Scaddy00/zapwebp',
  /**
   * Tip Jar / Donation URL (Ko-fi):
   */
  donationUrl: 'https://ko-fi.com/scaddy00',
  donationLabel: 'Support on Ko-fi',
};

export interface AffiliateTool {
  id: string;
  category: string;
  name: string;
  description: string;
  tag: string;
  highlight: string;
  url: string;
  ctaText: string;
}

export const AFFILIATE_TOOLS: AffiliateTool[] = [
  {
    id: 'hosting',
    category: 'Fast Web Hosting',
    name: 'Hostinger Cloud & WordPress',
    description: 'High-speed NVMe storage, LiteSpeed caching, and automatic image optimization for WordPress blogs and portfolio websites.',
    tag: '⚡ 99.9% Uptime',
    highlight: 'Up to 75% Off + Free Domain',
    url: 'https://www.hostinger.com/',
    ctaText: 'Claim Hosting Discount',
  },
  {
    id: 'vpn',
    category: 'Privacy & Security',
    name: 'NordVPN Threat Protection',
    description: 'Protect your browsing privacy, mask your IP address, and block malicious tracking and deceptive ads across all devices.',
    tag: '🛡️ Zero-Logs Verified',
    highlight: 'Special 30-Day Risk Free Deal',
    url: 'https://nordvpn.com/',
    ctaText: 'Get Privacy Protection',
  },
];


