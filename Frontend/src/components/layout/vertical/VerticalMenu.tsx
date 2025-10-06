// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'
import schoolRoutes from '@/utils/schoolRoutes'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { getDictionary } from '@/utils/getDictionary'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'
import CustomChip from '@core/components/mui/Chip'

// import { GenerateVerticalMenu } from '@components/GenerateMenu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

// Menu Data Imports
// import menuData from '@/data/navigation/verticalMenuData'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const { lang: locale, orgId, schoolId } = params as { lang: string; orgId?: string; schoolId?: string }

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        {orgId && schoolId && (
          <SubMenu label={'School'} icon={<i className='tabler-school' />}>
            <MenuItem href={`/${locale}${schoolRoutes.root(orgId, schoolId)}`}>Overview</MenuItem>
            <SubMenu label={'Academics'} icon={<i className='tabler-notebook' />}>
              <MenuItem href={`/${locale}${schoolRoutes.academics(orgId, schoolId)}`}>Overview</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.calendar(orgId, schoolId)}`}>Calendar</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.classes(orgId, schoolId)}`}>Classes</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.schedule(orgId, schoolId)}`}>Schedule</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.teachers(orgId, schoolId)}`}>Teachers</MenuItem>
            </SubMenu>
            <MenuItem href={`/${locale}${schoolRoutes.students(orgId, schoolId)}`} icon={<i className='tabler-users' />}>Students</MenuItem>
            <MenuItem href={`/${locale}${schoolRoutes.lms(orgId, schoolId)}`} icon={<i className='tabler-notebook' />}>LMS</MenuItem>
            <MenuItem href={`/${locale}${schoolRoutes.kesiswaan(orgId, schoolId)}`} icon={<i className='tabler-user-circle' />}>Kesiswaan</MenuItem>
            <SubMenu label={'Finance'} icon={<i className='tabler-wallet' />}>
              <MenuItem href={`/${locale}${schoolRoutes.finance(orgId, schoolId)}`}>Overview</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.fees(orgId, schoolId)}`}>Fees</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.invoices(orgId, schoolId)}`}>Invoices</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.payments(orgId, schoolId)}`}>Payments</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.reconciliation(orgId, schoolId)}`}>Reconciliation</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.savings(orgId, schoolId)}`}>Savings</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.wallet(orgId, schoolId)}`}>Wallet</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.merchants(orgId, schoolId)}`}>Merchants</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.settlements(orgId, schoolId)}`}>Settlements</MenuItem>
            </SubMenu>
            <SubMenu label={'Library'} icon={<i className='tabler-book' />}>
              <MenuItem href={`/${locale}${schoolRoutes.library(orgId, schoolId)}`}>Overview</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.catalog(orgId, schoolId)}`}>Catalog</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.circulation(orgId, schoolId)}`}>Circulation</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.members(orgId, schoolId)}`}>Members</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.fines(orgId, schoolId)}`}>Fines</MenuItem>
            </SubMenu>
            <SubMenu label={'Assets'} icon={<i className='tabler-building' />}>
              <MenuItem href={`/${locale}${schoolRoutes.assets(orgId, schoolId)}`}>Overview</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.register(orgId, schoolId)}`}>Register</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.qr(orgId, schoolId)}`}>QR</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.maintenance(orgId, schoolId)}`}>Maintenance</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.loans(orgId, schoolId)}`}>Loans</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.facilities(orgId, schoolId)}`}>Facilities</MenuItem>
            </SubMenu>
            <SubMenu label={'Student Affairs'} icon={<i className='tabler-user-cog' />}>
              <MenuItem href={`/${locale}${schoolRoutes.studentAffairs(orgId, schoolId)}`}>Overview</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.attendance(orgId, schoolId)}`}>Attendance</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.permissions(orgId, schoolId)}`}>Permissions</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.behavior(orgId, schoolId)}`}>Behavior</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.counseling(orgId, schoolId)}`}>Counseling</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.extracurricular(orgId, schoolId)}`}>Extracurricular</MenuItem>
            </SubMenu>
            <SubMenu label={'Reports'} icon={<i className='tabler-report' />}>
              <MenuItem href={`/${locale}${schoolRoutes.reportsA(orgId, schoolId)}`}>Academics</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.reportsAtd(orgId, schoolId)}`}>Attendance</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.reportsFin(orgId, schoolId)}`}>Finance</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.reportsLib(orgId, schoolId)}`}>Library</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.reportsAst(orgId, schoolId)}`}>Assets</MenuItem>
              <MenuItem href={`/${locale}${schoolRoutes.reportsSA(orgId, schoolId)}`}>Student Affairs</MenuItem>
            </SubMenu>
            <MenuItem href={`/${locale}${schoolRoutes.announcements(orgId, schoolId)}`} icon={<i className='tabler-megaphone' />}>Announcements</MenuItem>
            <MenuItem href={`/${locale}${schoolRoutes.helpdesk(orgId, schoolId)}`} icon={<i className='tabler-help' />}>Helpdesk</MenuItem>
            <MenuItem href={`/${locale}${schoolRoutes.settings(orgId, schoolId)}`} icon={<i className='tabler-settings' />}>Settings</MenuItem>
            <MenuItem href={`/${locale}${schoolRoutes.audit(orgId, schoolId)}`} icon={<i className='tabler-shield-lock' />}>Audit</MenuItem>
          </SubMenu>
        )}
        <SubMenu
          label={dictionary['navigation'].dashboards}
          icon={<i className='tabler-smart-home' />}
          suffix={<CustomChip label='5' size='small' color='error' round='true' />}
        >
          <MenuItem href={`/${locale}/dashboards/crm`}>{dictionary['navigation'].crm}</MenuItem>
          <MenuItem href={`/${locale}/dashboards/analytics`}>{dictionary['navigation'].analytics}</MenuItem>
          <MenuItem href={`/${locale}/dashboards/ecommerce`}>{dictionary['navigation'].eCommerce}</MenuItem>
          <MenuItem href={`/${locale}/dashboards/academy`}>{dictionary['navigation'].academy}</MenuItem>
          <MenuItem href={`/${locale}/dashboards/logistics`}>{dictionary['navigation'].logistics}</MenuItem>
        </SubMenu>
        <SubMenu label={'Superadmin'} icon={<i className='tabler-shield' />}> 
          <MenuItem href={`/${locale}/sa`} icon={<i className='tabler-shield-lock' />}>Overview</MenuItem>
          <MenuItem href={`/${locale}/sa/organizations`} icon={<i className='tabler-building' />}>Organizations</MenuItem>
          <MenuItem href={`/${locale}/sa/billing-plans`} icon={<i className='tabler-currency-dollar' />}>Billing Plans</MenuItem>
          <MenuItem href={`/${locale}/sa/feature-flags`} icon={<i className='tabler-toggle-left' />}>Feature Flags</MenuItem>
          <SubMenu label={'Providers'} icon={<i className='tabler-cloud' />}> 
            <MenuItem href={`/${locale}/sa/providers/payments`} icon={<i className='tabler-credit-card' />}>Payments</MenuItem>
            <MenuItem href={`/${locale}/sa/providers/messaging`} icon={<i className='tabler-message-circle' />}>Messaging</MenuItem>
          </SubMenu>
          <MenuItem href={`/${locale}/sa/security`} icon={<i className='tabler-lock' />}>Security</MenuItem>
          <MenuItem href={`/${locale}/sa/audit`} icon={<i className='tabler-list-details' />}>Audit</MenuItem>
          <MenuItem href={`/${locale}/sa/observability`} icon={<i className='tabler-eye' />}>Observability</MenuItem>
          <MenuItem href={`/${locale}/sa/templates`} icon={<i className='tabler-template' />}>Templates</MenuItem>
          <MenuItem href={`/${locale}/sa/backups`} icon={<i className='tabler-database' />}>Backups</MenuItem>
          <MenuItem href={`/${locale}/sa/developers`} icon={<i className='tabler-code' />}>Developers</MenuItem>
          <MenuItem href={`/${locale}/sa/helpdesk`} icon={<i className='tabler-help' />}>Helpdesk</MenuItem>
          <MenuItem href={`/${locale}/sa/settings`} icon={<i className='tabler-settings' />}>Settings</MenuItem>
        </SubMenu>
        <SubMenu label={dictionary['navigation'].frontPages} icon={<i className='tabler-files' />}>
          <MenuItem href='/front-pages/landing-page' target='_blank'>
            {dictionary['navigation'].landing}
          </MenuItem>
          <MenuItem href='/front-pages/pricing' target='_blank'>
            {dictionary['navigation'].pricing}
          </MenuItem>
          <MenuItem href='/front-pages/payment' target='_blank'>
            {dictionary['navigation'].payment}
          </MenuItem>
          <MenuItem href='/front-pages/checkout' target='_blank'>
            {dictionary['navigation'].checkout}
          </MenuItem>
          <MenuItem href='/front-pages/help-center' target='_blank'>
            {dictionary['navigation'].helpCenter}
          </MenuItem>
        </SubMenu>
        <MenuSection label={dictionary['navigation'].appsPages}>
          <SubMenu label={dictionary['navigation'].eCommerce} icon={<i className='tabler-shopping-cart' />}>
            <MenuItem href={`/${locale}/apps/ecommerce/dashboard`}>{dictionary['navigation'].dashboard}</MenuItem>
            <SubMenu label={dictionary['navigation'].products}>
              <MenuItem href={`/${locale}/apps/ecommerce/products/list`}>{dictionary['navigation'].list}</MenuItem>
              <MenuItem href={`/${locale}/apps/ecommerce/products/add`}>{dictionary['navigation'].add}</MenuItem>
              <MenuItem href={`/${locale}/apps/ecommerce/products/category`}>
                {dictionary['navigation'].category}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].orders}>
              <MenuItem href={`/${locale}/apps/ecommerce/orders/list`}>{dictionary['navigation'].list}</MenuItem>
              <MenuItem
                href={`/${locale}/apps/ecommerce/orders/details/5434`}
                exactMatch={false}
                activeUrl='/apps/ecommerce/orders/details'
              >
                {dictionary['navigation'].details}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].customers}>
              <MenuItem href={`/${locale}/apps/ecommerce/customers/list`}>{dictionary['navigation'].list}</MenuItem>
              <MenuItem
                href={`/${locale}/apps/ecommerce/customers/details/879861`}
                exactMatch={false}
                activeUrl='/apps/ecommerce/customers/details'
              >
                {dictionary['navigation'].details}
              </MenuItem>
            </SubMenu>
            <MenuItem href={`/${locale}/apps/ecommerce/manage-reviews`}>
              {dictionary['navigation'].manageReviews}
            </MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/referrals`}>{dictionary['navigation'].referrals}</MenuItem>
            <MenuItem href={`/${locale}/apps/ecommerce/settings`}>{dictionary['navigation'].settings}</MenuItem>
          </SubMenu>
          <SubMenu label={dictionary['navigation'].academy} icon={<i className='tabler-school' />}>
            <MenuItem href={`/${locale}/apps/academy/dashboard`}>{dictionary['navigation'].dashboard}</MenuItem>
            <MenuItem href={`/${locale}/apps/academy/my-courses`}>{dictionary['navigation'].myCourses}</MenuItem>
            <MenuItem href={`/${locale}/apps/academy/course-details`}>
              {dictionary['navigation'].courseDetails}
            </MenuItem>
          </SubMenu>
          <SubMenu label={dictionary['navigation'].logistics} icon={<i className='tabler-truck' />}>
            <MenuItem href={`/${locale}/apps/logistics/dashboard`}>{dictionary['navigation'].dashboard}</MenuItem>
            <MenuItem href={`/${locale}/apps/logistics/fleet`}>{dictionary['navigation'].fleet}</MenuItem>
          </SubMenu>
          <MenuItem
            href={`/${locale}/apps/email`}
            icon={<i className='tabler-mail' />}
            exactMatch={false}
            activeUrl='/apps/email'
          >
            {dictionary['navigation'].email}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/chat`} icon={<i className='tabler-message-circle-2' />}>
            {dictionary['navigation'].chat}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/calendar`} icon={<i className='tabler-calendar' />}>
            {dictionary['navigation'].calendar}
          </MenuItem>
          <MenuItem href={`/${locale}/apps/kanban`} icon={<i className='tabler-copy' />}>
            {dictionary['navigation'].kanban}
          </MenuItem>
          <SubMenu label={dictionary['navigation'].invoice} icon={<i className='tabler-file-description' />}>
            <MenuItem href={`/${locale}/apps/invoice/list`}>{dictionary['navigation'].list}</MenuItem>
            <MenuItem
              href={`/${locale}/apps/invoice/preview/4987`}
              exactMatch={false}
              activeUrl='/apps/invoice/preview'
            >
              {dictionary['navigation'].preview}
            </MenuItem>
            <MenuItem href={`/${locale}/apps/invoice/edit/4987`} exactMatch={false} activeUrl='/apps/invoice/edit'>
              {dictionary['navigation'].edit}
            </MenuItem>
            <MenuItem href={`/${locale}/apps/invoice/add`}>{dictionary['navigation'].add}</MenuItem>
          </SubMenu>
          <SubMenu label={dictionary['navigation'].user} icon={<i className='tabler-user' />}>
            <MenuItem href={`/${locale}/apps/user/list`}>{dictionary['navigation'].list}</MenuItem>
            <MenuItem href={`/${locale}/apps/user/view`}>{dictionary['navigation'].view}</MenuItem>
          </SubMenu>
          <SubMenu label={dictionary['navigation'].rolesPermissions} icon={<i className='tabler-lock' />}>
            <MenuItem href={`/${locale}/apps/roles`}>{dictionary['navigation'].roles}</MenuItem>
            <MenuItem href={`/${locale}/apps/permissions`}>{dictionary['navigation'].permissions}</MenuItem>
          </SubMenu>
          <SubMenu label={dictionary['navigation'].pages} icon={<i className='tabler-file' />}>
            <MenuItem href={`/${locale}/pages/user-profile`}>{dictionary['navigation'].userProfile}</MenuItem>
            <MenuItem href={`/${locale}/pages/account-settings`}>{dictionary['navigation'].accountSettings}</MenuItem>
            <MenuItem href={`/${locale}/pages/faq`}>{dictionary['navigation'].faq}</MenuItem>
            <MenuItem href={`/${locale}/pages/pricing`}>{dictionary['navigation'].pricing}</MenuItem>
            <SubMenu label={dictionary['navigation'].miscellaneous}>
              <MenuItem href={`/${locale}/pages/misc/coming-soon`} target='_blank'>
                {dictionary['navigation'].comingSoon}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/misc/under-maintenance`} target='_blank'>
                {dictionary['navigation'].underMaintenance}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/misc/404-not-found`} target='_blank'>
                {dictionary['navigation'].pageNotFound404}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/misc/401-not-authorized`} target='_blank'>
                {dictionary['navigation'].notAuthorized401}
              </MenuItem>
            </SubMenu>
          </SubMenu>
          <SubMenu label={dictionary['navigation'].authPages} icon={<i className='tabler-shield-lock' />}>
            <SubMenu label={dictionary['navigation'].login}>
              <MenuItem href={`/${locale}/pages/auth/login-v1`} target='_blank'>
                {dictionary['navigation'].loginV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/login-v2`} target='_blank'>
                {dictionary['navigation'].loginV2}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].register}>
              <MenuItem href={`/${locale}/pages/auth/register-v1`} target='_blank'>
                {dictionary['navigation'].registerV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/register-v2`} target='_blank'>
                {dictionary['navigation'].registerV2}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/register-multi-steps`} target='_blank'>
                {dictionary['navigation'].registerMultiSteps}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].verifyEmail}>
              <MenuItem href={`/${locale}/pages/auth/verify-email-v1`} target='_blank'>
                {dictionary['navigation'].verifyEmailV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/verify-email-v2`} target='_blank'>
                {dictionary['navigation'].verifyEmailV2}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].forgotPassword}>
              <MenuItem href={`/${locale}/pages/auth/forgot-password-v1`} target='_blank'>
                {dictionary['navigation'].forgotPasswordV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/forgot-password-v2`} target='_blank'>
                {dictionary['navigation'].forgotPasswordV2}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].resetPassword}>
              <MenuItem href={`/${locale}/pages/auth/reset-password-v1`} target='_blank'>
                {dictionary['navigation'].resetPasswordV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/reset-password-v2`} target='_blank'>
                {dictionary['navigation'].resetPasswordV2}
              </MenuItem>
            </SubMenu>
            <SubMenu label={dictionary['navigation'].twoSteps}>
              <MenuItem href={`/${locale}/pages/auth/two-steps-v1`} target='_blank'>
                {dictionary['navigation'].twoStepsV1}
              </MenuItem>
              <MenuItem href={`/${locale}/pages/auth/two-steps-v2`} target='_blank'>
                {dictionary['navigation'].twoStepsV2}
              </MenuItem>
            </SubMenu>
          </SubMenu>
          <SubMenu label={dictionary['navigation'].wizardExamples} icon={<i className='tabler-dots' />}>
            <MenuItem href={`/${locale}/pages/wizard-examples/checkout`}>{dictionary['navigation'].checkout}</MenuItem>
            <MenuItem href={`/${locale}/pages/wizard-examples/property-listing`}>
              {dictionary['navigation'].propertyListing}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/wizard-examples/create-deal`}>
              {dictionary['navigation'].createDeal}
            </MenuItem>
          </SubMenu>
          <MenuItem href={`/${locale}/pages/dialog-examples`} icon={<i className='tabler-square' />}>
            {dictionary['navigation'].dialogExamples}
          </MenuItem>
          <SubMenu label={dictionary['navigation'].widgetExamples} icon={<i className='tabler-chart-bar' />}>
            <MenuItem href={`/${locale}/pages/widget-examples/basic`}>{dictionary['navigation'].basic}</MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/advanced`}>{dictionary['navigation'].advanced}</MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/statistics`}>
              {dictionary['navigation'].statistics}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/charts`}>{dictionary['navigation'].charts}</MenuItem>
            <MenuItem href={`/${locale}/pages/widget-examples/actions`}>{dictionary['navigation'].actions}</MenuItem>
          </SubMenu>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].formsAndTables}>
          <MenuItem href={`/${locale}/forms/form-layouts`} icon={<i className='tabler-layout' />}>
            {dictionary['navigation'].formLayouts}
          </MenuItem>
          <MenuItem href={`/${locale}/forms/form-validation`} icon={<i className='tabler-checkup-list' />}>
            {dictionary['navigation'].formValidation}
          </MenuItem>
          <MenuItem href={`/${locale}/forms/form-wizard`} icon={<i className='tabler-git-merge' />}>
            {dictionary['navigation'].formWizard}
          </MenuItem>
          <MenuItem href={`/${locale}/react-table`} icon={<i className='tabler-table' />}>
            {dictionary['navigation'].reactTable}
          </MenuItem>
          <MenuItem
            icon={<i className='tabler-checkbox' />}
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements`}
            suffix={<i className='tabler-external-link text-xl' />}
            target='_blank'
          >
            {dictionary['navigation'].formELements}
          </MenuItem>
          <MenuItem
            icon={<i className='tabler-layout-board-split' />}
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/mui-table`}
            suffix={<i className='tabler-external-link text-xl' />}
            target='_blank'
          >
            {dictionary['navigation'].muiTables}
          </MenuItem>
        </MenuSection>
        <MenuSection label={dictionary['navigation'].chartsMisc}>
          <SubMenu label={dictionary['navigation'].charts} icon={<i className='tabler-chart-donut-2' />}>
            <MenuItem href={`/${locale}/charts/apex-charts`}>{dictionary['navigation'].apex}</MenuItem>
            <MenuItem href={`/${locale}/charts/recharts`}>{dictionary['navigation'].recharts}</MenuItem>
          </SubMenu>
          <MenuItem
            icon={<i className='tabler-cards' />}
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/foundation`}
            suffix={<i className='tabler-external-link text-xl' />}
            target='_blank'
          >
            {dictionary['navigation'].foundation}
          </MenuItem>
          <MenuItem
            icon={<i className='tabler-atom' />}
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components`}
            suffix={<i className='tabler-external-link text-xl' />}
            target='_blank'
          >
            {dictionary['navigation'].components}
          </MenuItem>
          <MenuItem
            icon={<i className='tabler-list-search' />}
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/menu-examples/overview`}
            suffix={<i className='tabler-external-link text-xl' />}
            target='_blank'
          >
            {dictionary['navigation'].menuExamples}
          </MenuItem>
          <MenuItem
            icon={<i className='tabler-lifebuoy' />}
            suffix={<i className='tabler-external-link text-xl' />}
            target='_blank'
            href='https://pixinvent.ticksy.com'
          >
            {dictionary['navigation'].raiseSupport}
          </MenuItem>
          <MenuItem
            icon={<i className='tabler-book-2' />}
            suffix={<i className='tabler-external-link text-xl' />}
            target='_blank'
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}`}
          >
            {dictionary['navigation'].documentation}
          </MenuItem>
          <SubMenu label={dictionary['navigation'].others} icon={<i className='tabler-box' />}>
            <MenuItem suffix={<CustomChip label='New' size='small' color='info' round='true' />}>
              {dictionary['navigation'].itemWithBadge}
            </MenuItem>
            <MenuItem
              href='https://pixinvent.com'
              target='_blank'
              suffix={<i className='tabler-external-link text-xl' />}
            >
              {dictionary['navigation'].externalLink}
            </MenuItem>
            <SubMenu label={dictionary['navigation'].menuLevels}>
              <MenuItem>{dictionary['navigation'].menuLevel2}</MenuItem>
              <SubMenu label={dictionary['navigation'].menuLevel2}>
                <MenuItem>{dictionary['navigation'].menuLevel3}</MenuItem>
                <MenuItem>{dictionary['navigation'].menuLevel3}</MenuItem>
              </SubMenu>
            </SubMenu>
            <MenuItem disabled>{dictionary['navigation'].disabledMenu}</MenuItem>
          </SubMenu>
        </MenuSection>
      </Menu>
      {/* <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <GenerateVerticalMenu menuData={menuData(dictionary)} />
      </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu
