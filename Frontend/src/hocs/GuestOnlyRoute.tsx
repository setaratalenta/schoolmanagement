// Next Imports
import { redirect } from 'next/navigation'

// Third-party Imports
import { getServerSession } from 'next-auth'

// Lib Imports
import { authOptions } from '@/libs/auth'

// Type Imports
import type { ChildrenType } from '@core/types'
import type { Locale } from '@configs/i18n'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const GuestOnlyRoute = async ({ children, lang }: ChildrenType & { lang: Locale }) => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect(getLocalizedUrl(themeConfig.homePageUrl, lang))
  }

  return <>{children}</>
}

export default GuestOnlyRoute
