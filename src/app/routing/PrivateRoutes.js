import {lazy, FC, Suspense, useEffect} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import AdminPageWrapper from '../pages/layout-builder/AdminPageWrapper'
import Reports from '../pages/Reports/Reports'
import Products from '../pages/Products/Products'
import Requests from '../pages/Requests/Requests'
import OrgAdmin from '../pages/Admin/OrgAdmin'
import SuperAdmin from '../pages/Admin/SuperAdmin'
import {userdata} from '../LocalStorage/UserDetails'
import {useAuth} from '../modules/auth'

const PrivateRoutes = () => {
  const {currentUser} = useAuth()
  // console.log('Aman :', currentUser);

  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/requests' />} />
        {/* Pages */}

        <Route path='organization' element={<DashboardWrapper />} />

        {/* <Route path='admin' element={<AdminPageWrapper />} /> */}

        {/* Reports */}

        <Route path='reports' element={<Reports />} />

        {/* Products */}

        <Route path='products' element={<Products />} />

        {/* Requests */}

        <Route path='requests' element={<Requests />} />

        {/* Super Admin */}
        {currentUser?.type == 'SA' && <Route path='superadmin' element={<OrgAdmin />} />}

        {/* Org Admin */}

        {currentUser?.type == 'SA' && <Route path='orgadmin' element={<SuperAdmin />} />}

        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      0: baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
