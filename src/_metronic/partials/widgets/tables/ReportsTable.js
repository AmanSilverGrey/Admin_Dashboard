/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from '../../../../app/FetchApi/Api'
import React, {useCallback, useEffect, useState} from 'react'
import {KTSVG} from '../../../helpers'
import moment from 'moment'
import debounce from 'lodash.debounce'
import {ReportsDetailCard} from '../../../../app/pages/Reports/ReportsDetailCard'

const ReportsTable = ({className}) => {
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  //Org filter and value
  const [orgDropdown, setOrgDropdown] = useState([])

  // User dropdown and value
  const [tableData, setTableData] = useState([])
  const [searchUserList, setsearchUserList] = useState([])
  const [searchOrgList, setsearchOrgList] = useState([])
  const [searchProductList, setsearchProductList] = useState([])
  const [searchUserTerm, setsearchUserTerm] = useState(null)
  const [searchOrgTerm, setsearchOrgTerm] = useState(null)
  const [searchProductTerm, setsearchProductTerm] = useState(null)
  const [orgId, setOrgId] = useState('')
  const [productId, setProductId] = useState('')
  const [userId, setUserId] = useState('')
  const [openDetailCard, setOpenDetailCard] = useState({
    value: false,
    id: null,
  })

  // Data from localStorage

  const LocalStorageData = JSON.parse(localStorage.getItem('User-Details'))
  const userType = LocalStorageData?.type

  useEffect(() => {
    //Org list dropdown
    //table data
    axios
      .get(
        `reports/?product_sku=${productId}&organization_id=${orgId}&user=${userId}&from_date=${fromDate}&to_date=${toDate}`
      )
      .then((response) => {
        setTableData(response?.data)
      })
  }, [orgId, searchOrgTerm, userId, searchUserTerm, fromDate, toDate, searchProductTerm])

  // fiter

  const delayUserSearch = useCallback(
    debounce((val) => {
      axios.get(`customUsersearchview/?search=${val}`).then((res) => {
        setsearchUserList(res?.data?.results)
      })
    }, 500),
    []
  )

  const delayOrgSearch = useCallback(
    debounce((val) => {
      axios.get(`/organizationsearchview/?search=${val}`).then((res) => {
        setsearchOrgList(res?.data?.results)
      })
    }, 500),
    []
  )

  const delayProductSearch = useCallback(
    debounce((val) => {
      axios.get(`productsearchview/?search=${val}`).then((res) => {
        console.log('Product', res)
        setsearchProductList(res?.data?.results)
      })
    }, 500),
    []
  )

  // userfunction
  const handleUserSearch = (e) => {
    setUserId('')
    setsearchUserTerm(e.target.value)
    delayUserSearch(e.target.value)
  }

  const handleOrgSearch = (e) => {
    setOrgId('')
    setsearchOrgTerm(e.target.value)
    delayOrgSearch(e.target.value)
  }

  const handleProductSearch = (e) => {
    setProductId('')
    setsearchProductTerm(e.target.value)
    delayProductSearch(e.target.value)
  }

  const handleSearchbyUser = (option) => {
    setsearchUserTerm(option?.first_name + ' ' + option.last_name)
    setsearchUserList([])
    setUserId(option?.id)
  }

  const handleSearchbyOrg = (option) => {
    setsearchOrgTerm(option?.name)
    setsearchOrgList([])
    setOrgId(option?.id)
  }
  const handleSearchbyProduct = (option) => {
    setsearchProductTerm(option?.Brand_Name)
    setsearchProductList([])
    setProductId(option?.SKU)
  }

  const handleClose = () => {
    setOpenDetailCard(false)
  }

  return (
    <>
      {!openDetailCard?.value && (
        <div className='w-sm-75 w-100 mx-auto'>
          <h3>Reports</h3>
          <div className='d-flex flex-wrap justify-content-around my-5 fw-bold'>
            <div className=''>
              <span className='me-5'>From</span>
              <span className=''>
                <input
                  className='p-3 border border-secondary rounded-1 cursor-pointer '
                  type='date'
                  onChange={(e) => setFromDate(moment(e.target.value).format('DD-MM-YYYY'))}
                />
              </span>
            </div>
            <div className=''>
              <span className='me-5'>To</span>
              <span>
                <input
                  className='p-3 border border-secondary rounded-1 '
                  type='date'
                  onChange={(e) => (
                    setToDate(moment(e.target.value).format('DD-MM-YYYY')),
                    console.log('Date', e.target.value)
                  )}
                />
              </span>
            </div>

            {/* Select by organisation */}
            {userType == 'SA' && (
              <div className='w-auto'>
                <input
                  type='text'
                  value={searchOrgTerm}
                  onChange={handleOrgSearch}
                  placeholder='Search org..'
                  className='form-control py-2'
                  style={{position: 'relative'}}
                />
                {searchOrgList.length > 0 && searchOrgTerm && (
                  <ul
                    className='bg-white overflow-auto mx-15 py-2 p-0 shadow rounded '
                    style={{position: 'absolute', zIndex: '10', listStyle: 'none'}}
                  >
                    {searchOrgList.map((option) => (
                      <div key={option.id} className=''>
                        <li
                          className='py-1 cursor-pointer bg-hover-secondary px-10  mx-auto'
                          onClick={() => {
                            handleSearchbyOrg(option)
                          }}
                        >
                          {option?.name}
                        </li>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {/* User Filter */}
            <div className='w-auto'>
              <input
                type='text'
                value={searchUserTerm}
                onChange={handleUserSearch}
                placeholder='Search user..'
                className='form-control py-2'
                style={{position: 'relative'}}
              />
              {searchUserList.length > 0 && searchUserTerm && (
                <ul
                  className='bg-white overflow-auto mx-15 py-2 p-0 shadow rounded '
                  style={{position: 'absolute', zIndex: '10', listStyle: 'none'}}
                >
                  {searchUserList.map((option) => (
                    <div key={option.id} className=''>
                      <li
                        className='py-1 cursor-pointer bg-hover-secondary px-10  mx-auto'
                        onClick={() => {
                          handleSearchbyUser(option)
                        }}
                      >
                        {option?.first_name} {option?.last_name}
                      </li>
                    </div>
                  ))}
                </ul>
              )}
            </div>

            {/* Select by product */}
            <div className='w-auto'>
              <input
                type='text'
                value={searchProductTerm}
                onChange={handleProductSearch}
                placeholder='Search by product..'
                className='form-control py-2'
                style={{position: 'relative'}}
              />
              {searchProductList.length > 0 && searchProductTerm && (
                <ul
                  className='bg-white overflow-auto mx-15 py-2 p-0 shadow rounded '
                  style={{position: 'absolute', zIndex: '10', listStyle: 'none'}}
                >
                  {searchProductList.map((option) => (
                    <div key={option.id} className=''>
                      <li
                        className='py-1 cursor-pointer bg-hover-secondary px-10  mx-auto'
                        onClick={() => {
                          handleSearchbyProduct(option)
                        }}
                      >
                        {option?.Brand_Name}
                      </li>
                    </div>
                  ))}
                </ul>
              )}
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
                      <th className='text-nowrap'>First Name</th>
                      <th className='text-nowrap'>Last Name</th>
                      <th className='text-nowrap'>Email</th>
                      <th className='text-nowrap'>Phone Number</th>
                      <th className='text-nowrap'>Organization</th>
                      <th className='text-nowrap'>User</th>
                      <th className='text-nowrap'>Product</th>
                      <th className='text-nowrap'>View</th>
                      {/* <th className='text-nowrap'>Status</th> */}
                      {/* <th className='min-w-100px text-end'>Actions</th> */}
                    </tr>
                  </thead>
                  {/* end::Table head */}
                  {/* begin::Table body */}
                  <tbody>
                    {tableData?.results?.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <p className='text-dark fw-bold fs-6'>{item?.fname}</p>
                        </td>
                        <td>
                          <p className='text-dark fw-bold fs-6'>{item?.lname}</p>
                        </td>
                        <td>
                          <p className='text-dark fw-bold fs-6'>{item?.email}</p>
                        </td>
                        <td>
                          <p className='text-dark fw-bold fs-6'>{item?.phone}</p>
                        </td>
                        <td>
                          <p className='text-dark fw-bold fs-6'>{item?.org_name}</p>
                        </td>

                        <td>
                          <p className='text-dark fw-bold fs-6'>{item?.username}</p>
                        </td>
                        <td>
                          <p className='text-dark fw-bold fs-6'>{item?.product_name}</p>
                        </td>

                        {/* <td className='text-dark fw-bold text-hover-primary fs-6'>$3560</td> */}
                        {/* <td>
                  <span className='badge badge-light-success'>Approved</span>
                </td> */}
                        <td className=''>
                          <span
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                            onClick={() => setOpenDetailCard({value: true, id: item})}
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen019.svg'
                              className='svg-icon-3'
                            />
                          </span>
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
      )}
      {openDetailCard?.value && (
        <ReportsDetailCard option={openDetailCard?.id} handleClose={handleClose} />
      )}
    </>
  )
}

export {ReportsTable}
