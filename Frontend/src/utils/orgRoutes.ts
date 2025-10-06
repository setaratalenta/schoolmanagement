export const orgRoutes = {
  root: (orgId: string) => `/org/${orgId}`,
  schools: (orgId: string) => `/org/${orgId}/schools`,
  users: (orgId: string) => `/org/${orgId}/users`,
  curriculum: (orgId: string) => `/org/${orgId}/curriculum-repo`,
  finance: (orgId: string) => `/org/${orgId}/finance`,
  academics: (orgId: string) => `/org/${orgId}/academics`,
  studentAffairs: (orgId: string) => `/org/${orgId}/student-affairs`,
  assets: (orgId: string) => `/org/${orgId}/assets`,
  library: (orgId: string) => `/org/${orgId}/library`,
  reports: (orgId: string) => `/org/${orgId}/reports`,
  announcements: (orgId: string) => `/org/${orgId}/announcements`,
  featurePolicy: (orgId: string) => `/org/${orgId}/feature-policy`,
  helpdesk: (orgId: string) => `/org/${orgId}/helpdesk`,
  settings: (orgId: string) => `/org/${orgId}/settings`
}

export default orgRoutes