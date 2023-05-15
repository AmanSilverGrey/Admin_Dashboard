/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from '../../../../app/FetchApi/Api'
import React, {useCallback, useEffect, useState} from 'react'
import {KTSVG} from '../../../helpers'
import moment from 'moment'
import debounce from 'lodash.debounce'
import {ReportsDetailCard} from '../../../../app/pages/Reports/ReportsDetailCard'
import ReportsFilter from '../../../../app/pages/Reports/ReportsFilter'

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

  const [openFilter, setOpenFilter] = useState(false)

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

  const CloseFilter = () => {
    setOpenFilter(!openFilter)
  }

  const closeModal = () => {
    setFromDate(null)
    setToDate(null)
    setOrgId(null)
    setProductId(null)
    setUserId(null)
    setOpenFilter(!openFilter)
  }

  return (
    <>
      {!openDetailCard?.value && (
        <div className='w-sm-75 w-100 mx-auto'>
          <div className='d-flex justify-content-between align-items-center mb-5'>
            <h3>Reports</h3>
            <div className='btn bg-primary py-2 text-white fs-5' onClick={CloseFilter}>
              Filter
            </div>
          </div>
          <div className={` shadow-sm`}>
            {/* <div className={`card ${className}`}> */}
            {/* begin::Body */}
            <div className='card-body  m-0 p-0'>
              {/* begin::Table container */}
              <div className='table-responsive bg-white' style={{borderRadius: '10px'}}>
                {/* begin::Table */}
                <table className='table table-striped table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                  {/* begin::Table head */}
                  <thead className='text-gray-900 bg-gray-300'>
                    <tr className='fw-bold fs-6'>
                      <th className='text-nowrap p-6'>Report id</th>
                      <th className='text-nowrap p-6'>Name</th>
                      <th className='text-nowrap p-6'>Email</th>
                      <th className='text-nowrap p-6'>Phone Number</th>
                      <th className='text-nowrap p-6'>Organization</th>
                      <th className='text-nowrap p-6'>User</th>
                      <th className='text-nowrap p-6'>Product</th>
                      <th className='text-nowrap p-6'>Submitted on</th>
                      <th className='text-nowrap p-6'>View</th>
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
                          <p className='text-dark text-center fw-bold fs-6'>{item?.id}</p>
                        </td>
                        <td>
                          <p className='text-dark fw-bold fs-6'>
                            {item?.fname} {item?.lname}
                          </p>
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
                        <td>
                          <p className='text-dark text-nowrap fw-bold fs-6'>
                            {moment(item?.datetime).format('DD-MM-YYYY')}
                          </p>
                        </td>

                        {/* <td className='text-dark fw-bold text-hover-primary fs-6'>$3560</td> */}
                        {/* <td>
                  <span className='badge badge-light-success'>Approved</span>
                </td> */}
                        <td className='text-center'>
                          <span
                            className='bi bi-eye-fill fs-2 text-dark cursor-pointer text-hover-primary btn-sm '
                            onClick={() => setOpenDetailCard({value: true, id: item})}
                          ></span>
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

      <ReportsFilter
        setFromDate={setFromDate}
        setToDate={setToDate}
        userType={userType}
        searchOrgTerm={searchOrgTerm}
        handleOrgSearch={handleOrgSearch}
        searchOrgList={searchOrgList}
        handleSearchbyOrg={handleSearchbyOrg}
        searchUserTerm={searchUserTerm}
        handleUserSearch={handleUserSearch}
        searchUserList={searchUserList}
        handleSearchbyUser={handleSearchbyUser}
        searchProductTerm={searchProductTerm}
        handleProductSearch={handleProductSearch}
        searchProductList={searchProductList}
        handleSearchbyProduct={handleSearchbyProduct}
        closeModal={closeModal}
        show={openFilter}
        handleClose={CloseFilter}
      />
    </>
  )
}

export {ReportsTable}
