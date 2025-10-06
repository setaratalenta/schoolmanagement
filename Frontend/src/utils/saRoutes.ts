export const saRoutes = {
  root: () => `/sa`,
  organizations: () => `/sa/organizations`,
  orgDetail: (orgId: string) => `/sa/organizations/${orgId}`,
  billingPlans: () => `/sa/billing-plans`,
  featureFlags: () => `/sa/feature-flags`,
  providersPayments: () => `/sa/providers/payments`,
  providersMessaging: () => `/sa/providers/messaging`,
  security: () => `/sa/security`,
  audit: () => `/sa/audit`,
  observability: () => `/sa/observability`,
  templates: () => `/sa/templates`,
  backups: () => `/sa/backups`,
  dev: () => `/sa/developers`,
  helpdesk: () => `/sa/helpdesk`,
  settings: () => `/sa/settings`
}

export default saRoutes