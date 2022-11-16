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
      {userdata?.type == 'SA' && <MenuItem title='Admin' to='/superadmin' />}
      {userdata?.type == 'OA' ||
        (userdata?.type == 'SA' && <MenuItem title='Organisation Admin' to='/orgadmin' />)}
      {userdata?.type == 'SA' ||
        (userdata?.type == 'OA' && <MenuItem title='Organisation' to='/dashboard' />)}
      {userdata?.type == 'SA' ||
        // userdata?.type == 'OA' ||
        (userdata?.type == 'NU' && <MenuItem title='Products' to='/products' />)}
      {userdata?.type == 'SA' ||
        userdata?.type == 'OA' ||
        (userdata?.type == 'NU' && <MenuItem title='Requests' to='/requests' />)}
      {userdata?.type == 'SA' ||
        userdata?.type == 'OA' ||
        (userdata?.type == 'NU' && <MenuItem title='Reports' to='/reports' />)}
    </>
  )
}
