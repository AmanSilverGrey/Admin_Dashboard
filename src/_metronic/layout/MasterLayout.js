import axios from '../../app/FetchApi/Api'
import {useEffect, useState} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {HeaderWrapper} from './components/header'
// import {RightToolbar} from '../partials/layout/RightToolbar'
import {ScrollTop} from './components/scroll-top'
import {Content} from './components/content'
// import {FooterWrapper} from './components/footer'
import {Sidebar} from './components/sidebar'
import {
  DrawerMessenger,
  ActivityDrawer,
  InviteUsers,
  UpgradePlan,
  ThemeModeProvider,
  logout,
} from '../partials'
import {PageDataProvider} from './core'
import {reInitMenu} from '../helpers'
import {ToolbarWrapper} from './components/toolbar'

const MasterLayout = () => {
  // To check user is active or not
  const [adminActive, setAdminActive] = useState(null)
  const LocalStorageData = JSON.parse(localStorage.getItem('User-Details'))
  const userType = LocalStorageData?.id

  const location = useLocation()

  useEffect(() => {
    reInitMenu()
    axios
      .get('/superadminlist/')
      .then((response) => {
        const AdminData = response?.data?.data
        // console.log('Unfiltered', AdminData)
        const filteredAdminData = AdminData.filter((active) => active?.id == userType)
        {
          filteredAdminData[0].is_active == false && logout()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [location.key])

  return (
    <PageDataProvider>
      <ThemeModeProvider>
        <div className='d-flex flex-column flex-root app-root' id='kt_app_root'>
          <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
            <HeaderWrapper />
            <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
              {/* <Sidebar /> */}
              <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
                <div className='d-flex flex-column flex-column-fluid'>
                  {/* <ToolbarWrapper /> */}
                  <Content>
                    <Outlet />
                  </Content>
                </div>
                {/* <FooterWrapper /> */}
              </div>
            </div>
          </div>
        </div>

        {/* begin:: Drawers */}
        {/* <ActivityDrawer /> */}
        {/* <RightToolbar /> */}
        {/* <DrawerMessenger /> */}
        {/* end:: Drawers */}

        {/* begin:: Modals */}
        {/* <InviteUsers /> */}
        {/* <UpgradePlan /> */}
        {/* end:: Modals */}
        <ScrollTop />
      </ThemeModeProvider>
    </PageDataProvider>
  )
}

export {MasterLayout}
