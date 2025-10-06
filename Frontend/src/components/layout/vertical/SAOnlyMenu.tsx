// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { getDictionary } from '@/utils/getDictionary'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, SubMenu, MenuItem } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'

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

const SAOnlyMenu = ({ dictionary, scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const { lang: locale } = params as { lang: string }

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
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
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
      >
        <SubMenu label={dictionary['sa']?.title ?? 'Superadmin'} icon={<i className='tabler-shield' />}>
          <MenuItem href={`/${locale}/sa`} icon={<i className='tabler-shield-lock' />}>{dictionary['sa']?.overview ?? 'Overview'}</MenuItem>
          <MenuItem href={`/${locale}/sa/organizations`} icon={<i className='tabler-building' />}>{dictionary['sa']?.organizations ?? 'Organizations'}</MenuItem>
          <MenuItem href={`/${locale}/sa/billing-plans`} icon={<i className='tabler-currency-dollar' />}>{dictionary['sa']?.billingPlans ?? 'Billing Plans'}</MenuItem>
          <MenuItem href={`/${locale}/sa/feature-flags`} icon={<i className='tabler-toggle-left' />}>{dictionary['sa']?.featureFlags ?? 'Feature Flags'}</MenuItem>
          <SubMenu label={dictionary['sa']?.providers ?? 'Providers'} icon={<i className='tabler-cloud' />}>
            <MenuItem href={`/${locale}/sa/providers/payments`} icon={<i className='tabler-credit-card' />}>{dictionary['sa']?.payments ?? 'Payments'}</MenuItem>
            <MenuItem href={`/${locale}/sa/providers/messaging`} icon={<i className='tabler-message-circle' />}>{dictionary['sa']?.messaging ?? 'Messaging'}</MenuItem>
          </SubMenu>
          <MenuItem href={`/${locale}/sa/security`} icon={<i className='tabler-lock' />}>{dictionary['sa']?.security ?? 'Security'}</MenuItem>
          <MenuItem href={`/${locale}/sa/audit`} icon={<i className='tabler-list-details' />}>{dictionary['sa']?.audit ?? 'Audit'}</MenuItem>
          <MenuItem href={`/${locale}/sa/observability`} icon={<i className='tabler-eye' />}>{dictionary['sa']?.observability ?? 'Observability'}</MenuItem>
          <MenuItem href={`/${locale}/sa/templates`} icon={<i className='tabler-template' />}>{dictionary['sa']?.templates ?? 'Templates'}</MenuItem>
          <MenuItem href={`/${locale}/sa/backups`} icon={<i className='tabler-database' />}>{dictionary['sa']?.backups ?? 'Backups'}</MenuItem>
          <MenuItem href={`/${locale}/sa/developers`} icon={<i className='tabler-code' />}>{dictionary['sa']?.developers ?? 'Developers'}</MenuItem>
          <MenuItem href={`/${locale}/sa/helpdesk`} icon={<i className='tabler-help' />}>{dictionary['sa']?.helpdesk ?? 'Helpdesk'}</MenuItem>
          <MenuItem href={`/${locale}/sa/settings`} icon={<i className='tabler-settings' />}>{dictionary['sa']?.settings ?? 'Settings'}</MenuItem>
        </SubMenu>
      </Menu>
    </ScrollWrapper>
  )
}

export default SAOnlyMenu