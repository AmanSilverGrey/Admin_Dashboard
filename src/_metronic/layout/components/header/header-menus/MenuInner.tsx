//import {useIntl} from 'react-intl'
import {useState} from 'react'
import {MenuItem} from './MenuItem'
//import {MenuInnerWithSub} from './MenuInnerWithSub'
//import {MegaMenu} from './MegaMenu'
import asc_logo from './Assests/asc_logo.png'

export function MenuInner() {
  const UserDetails = localStorage.getItem('User-Details')
  const userdata = JSON.parse(JSON.parse(JSON.stringify(UserDetails)))
  return (
    <>
      <figure className='figure my-4 p-4'>
        <img src={asc_logo} alt='logo' width={70} />
        {/* <figcaption className='figure-caption'>  Complete Rapid Drug Testing
         and PPE Solutions</figcaption> */}
      </figure>
      {/* 1 */}
      {(userdata?.type == 'SA' || localStorage.getItem('Developers')) && (
        <MenuItem title='Admin' to='/superadmin' />
      )}
      {/* 2 */}
      {(userdata?.type == 'SA' || localStorage.getItem('Developers')) && (
        <MenuItem title='Organisation Admin' to='/orgadmin' />
      )}
      {/* 3 */}

      <MenuItem title='Organisation' to='/dashboard' />

      {/* 4 */}

      <MenuItem title='Products' to='/products' />

      {/* 5 */}

      <MenuItem title='Requests' to='/requests' />

      {/* 6 */}

      <MenuItem title='Reports' to='/reports' />
    </>
  )
}
