//import {useIntl} from 'react-intl'
import {useState} from 'react'
import {MenuItem} from './MenuItem'
//import {MenuInnerWithSub} from './MenuInnerWithSub'
//import {MegaMenu} from './MegaMenu'
import asc_logo from './Assests/asc_logo.png'
import {useAuth} from '../../../../../app/modules/auth'

export function MenuInner() {
  const {currentUser} = useAuth()
  // const UserDetails = localStorage.getItem('User-Details')
  // const userdata = JSON.parse(JSON.parse(JSON.stringify(UserDetails)))
  return (
    <>
      <figure className='figure my-4 p-4'>
        <img src={asc_logo} alt='logo' width={60} />
        {/* <figcaption className='figure-caption'>  Complete Rapid Drug Testing
         and PPE Solutions</figcaption> */}
      </figure>
      {/* 1 */}
      {currentUser?.type == 'SA' && <MenuItem title='Super Admin' to='/superadmin' />}
      {/* 2 */}
      {currentUser?.type == 'SA' && <MenuItem title='Organization Admin' to='/orgadmin' />}
      {/* 3 */}

      <MenuItem title='Organization' to='/organization' />

      {/* 4 */}

      <MenuItem title='Product' to='/products' />

      {/* 5 */}

      <MenuItem title='Request' to='/requests' />

      {/* 6 */}

      <MenuItem title='Report' to='/reports' />
    </>
  )
}
