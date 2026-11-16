export interface Route {
  path: string;
  label: string;
  pageFile: string;
}

export const routes: Route[] = [
  { path: '/', label: 'Home', pageFile: 'HomePage' },
  { path: '/privacy', label: 'Privacy Policy', pageFile: 'PrivacyPage' },
  { path: '/privacy-policy', label: 'Privacy Policy', pageFile: 'PrivacyPage' },
];
