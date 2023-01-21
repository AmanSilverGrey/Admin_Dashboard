/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from '../../../../app/FetchApi/Api'
import React, {useEffect, useState} from 'react'
import {KTSVG} from '../../../helpers'
import moment from 'moment'

const ReportsTable = ({className}) => {
  const [data, setData] = useState([])
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  //Org filter and value
  const [orgDropdown, setOrgDropdown] = useState([])
  const [orgFilter, setOrgFilter] = useState('')

  // User dropdown and value
  const [userDropdown, setUserDropdown] = useState([])
  const [userFilter, setUserFilter] = useState('')
  const [productFilter, setProductFilter] = useState('')

  // Data from localStorage

  const LocalStorageData = JSON.parse(localStorage.getItem('User-Details'))
  const userType = LocalStorageData?.type

  useEffect(() => {
    //Org list dropdown
    axios.get('/orgadminlist').then((res) => {
      setOrgDropdown(res?.data?.data)
    })

    //table data
    axios
      .get(
        `/reports/?from_date=${fromDate}&to_date=${toDate}&organization=${orgFilter}&user=${userFilter}&product=${productFilter}`
      )
      .then((response) => {console.log('Reports Data', response.data)})

    //User list dropdown
    axios.get('/user').then((res) => {
      const userResponseData = res?.data?.results
      const filtereduserResponseData = userResponseData?.filter(
        (active) => active?.is_active == true
      )
      setUserDropdown(filtereduserResponseData)
    })
  }, [])

  return (
    <>
      <div className='w-75 mx-auto'>
        <h3>Reports</h3>
        <div className='d-flex justify-content-around my-sm-5'>
          <div className='mt-3'>
            <span>From</span>
            <span className='mr-3'>
              <input
                className='p-3 border border-secondary rounded-1 cursor-pointer '
                type='date'
                onChange={(e) => setFromDate(moment(e.target.value).format('DD-MM-YYYY'))}
              />
            </span>
          </div>
          <div className='mt-3'>
            <span>To</span>
            <span>
              <input
                className='p-3 border border-secondary rounded-1 '
                type='date'
                onChange={(e) => setToDate(moment(e.target.value).format('DD-MM-YYYY'))}
              />
            </span>
          </div>

          {/* Select by organisation */}
          {userType == 'SA' && (
            <div>
              <select
                className='form-select mt-3 cursor-pointer'
                onChange={(e) => setOrgFilter(e.target.value)}
              >
                <option value=''>Select organization</option>
                {orgDropdown?.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.org_name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* User Filter */}
          <div>
            <select
              className='form-select mt-3 cursor-pointer'
              onChange={(e) => setUserFilter(e.target.value)}
            >
              <option value=''>Select user</option>
              {userDropdown?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.first_name} {item?.last_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select className='form-select mt-3 cursor-pointer'>
              <option>Products</option>
              <option>DUMMY1</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </div>
        <div className={`card ${className}`}>
          {/* <div className={`card ${className}`}> */}
          {/* begin::Body */}
          <div className='card-body py-3 shadow bg-body rounded'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table table-striped table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                {/* begin::Table head */}
                <thead>
                  <tr className='fw-bold text-muted'>
                    <th className='min-w-150px'>First Name</th>
                    <th className='min-w-140px'>Last Name</th>
                    <th className='min-w-120px'>Email</th>
                    <th className='min-w-120px'>Phone Number</th>
                    <th className='min-w-120px'>Phone Number</th>
                    <th className='min-w-120px'>Organization</th>
                    <th className='min-w-120px'>Status</th>
                    <th className='min-w-120px'>View / Edit/ Delete</th>
                    {/* <th className='min-w-120px'>Status</th> */}
                    {/* <th className='min-w-100px text-end'>Actions</th> */}
                  </tr>
                </thead>
                {/* end::Table head */}
                <h3 className='text-center'>Data not available</h3>
                {/* begin::Table body */}
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <p className='text-dark fw-bold fs-6'>{item.first_name}</p>
                      </td>
                      <td>
                        <p className='text-dark fw-bold fs-6'>{item.last_name}</p>
                      </td>
                      <td>
                        <p className='text-dark fw-bold fs-6'>{item.email}</p>
                      </td>
                      <td>
                        <p className='text-dark fw-bold fs-6'>{item.phone}</p>
                      </td>
                      <td>
                        <p className='text-dark fw-bold fs-6'>Had to be updated</p>
                      </td>
                      <td>
                        <p className='text-dark fw-bold fs-6'>{item.phone}</p>
                      </td>
                      <td>
                        <span className='badge badge-light-success'>Approved</span>
                      </td>

                      {/* <td className='text-dark fw-bold text-hover-primary fs-6'>$3560</td> */}
                      {/* <td>
                  <span className='badge badge-light-success'>Approved</span>
                </td> */}
                      <td className=''>
                        <a
                          href='#'
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen019.svg'
                            className='svg-icon-3'
                          />
                        </a>
                        <a
                          href='#'
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        >
                          <KTSVG
                            path='/media/icons/duotune/art/art005.svg'
                            className='svg-icon-3'
                          />
                        </a>
                        <a
                          href='#'
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen027.svg'
                            className='svg-icon-3'
                          />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* end::Table body */}
              </table>
              {/* end::Table */}
            </div>
            {/* end::Table container */}
          </div>
          {/* begin::Body */}
        </div>
      </div>
    </>
  )
}

export {ReportsTable}
