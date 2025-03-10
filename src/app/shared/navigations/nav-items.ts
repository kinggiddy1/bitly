export const NAV_ITEMS: Record<string, Array<{ label: string; link: string; icon: string }>> = {
  Admin: [
    { label: 'Dashboard', link: '/dashboard', icon: 'house-check-fill' },
    { label: 'My URLs', link: '/urls', icon: 'link-45deg' },
    { label: 'Analytics', link: '/analytics', icon: 'graph-up' },
    { label: 'Profile', link: '/profile', icon: 'person-circle' },
  ],
  User: [
    { label: 'Dashboard', link: '/dashboard', icon: 'house-check-fill' },
    { label: 'Links', link: '/urls', icon: 'link-45deg' },
    { label: 'Analytics', link: '/analytics', icon: 'graph-up' },
    { label: 'Profile', link: '/profile', icon: 'person-circle' },
  ]
};