import React from 'react'
import patient from '../../PNGS/patient.png'

const NoData = ({setAddUser}) => {
  return (
    <>
      {/* begin::Title fs-2hx */}
      <h2 className='fw-bolder text-gray-900 mb-10'>No requests available!</h2>
      {/* end::Title */}

      {/* begin::Illustration */}
      <div className='mb-3'>
        <img src={patient} className='mw-70 mh-150px' alt='' />
        {/* <img
          src={'/media/auth/404-error-dark.png'}
          className='mw-100 mh-300px theme-dark-show'
          alt=''
        /> */}
      </div>

      {/* begin::Text */}

      <div className='fw-semibold fs-6 text-gray-500 mt-10'>You can add a new user</div>
      {/* end::Text */}
      {/* end::Illustration */}

      {/* begin::Link */}
      {/* <div className='mb-0'>
        <div className='btn btn-sm btn-primary'>
          Add
        </div>
      </div> */}
      {/* end::Link */}
    </>
  )
}

export default NoData
