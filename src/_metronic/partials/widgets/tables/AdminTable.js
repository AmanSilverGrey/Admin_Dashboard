/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from '../../../../app/FetchApi/Api'
import React, {useEffect, useState} from 'react'
import {KTSVG} from '../../../helpers'
import ReactTooltip from 'react-tooltip'
import AddAdmin from '../../../../app/pages/Admin/AddAdmin'
import _ from 'lodash'
import UpdateAdmin from '../../../../app/pages/Admin/UpdateAdmin'
import {userdata} from '../../../../app/LocalStorage/UserDetails'
import {useAuth} from '../../../../app/modules/auth'
import swal from 'sweetalert'

//type Props = {
//className: string,
//id: number
//}

//const AdminTable: React.FC<Props> = ({className}) => {
const AdminTable = ({className}) => {
  const [data, setData] = useState([])
  const [toggle, setToggle] = useState()
  const [addAdmin, setAddAdmin] = useState(false)
  const [active, setActive] = useState('')

  // const [approve, setApprove] = useState(-1);
  // Auth
  const {currentUser} = useAuth()

  // States for updating
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  // const [org, setOrg] = useState('')

  //Validating
  const [showTable, setShowTable] = useState('')

  //Api call to list users.
  const api = async () => {
    await axios
      .get('/superadminlist/')
      .then((response) => {
        setData(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    api()
    // console.log(data)
  }, [toggle, addAdmin])

  //Api call for particluar user to edit.
  const Toggle = async (item) => {
    setToggle(item.id)
  }

  // Handle AprroveDeactive
  const handleApproveDeactive = (item) => {
    // console.log(is_active)
    const editActive = {is_active: false}
    axios
      .patch(`/superadminlist/${item.id}/`, editActive)
      .then((Response) => {
        // const tableData = _.cloneDeep(data)
        const tableData = [...data]
        const itemIndex = tableData?.findIndex((it) => it?.id == item?.id)
        tableData[itemIndex] = Response.data
        setData(tableData)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Handle AprroveDeactive
  const handleApproveActive = (item) => {
    // console.log(is_active)
    const editActive = {is_active: true}
    axios
      .patch(`/superadminlist/${item.id}/`, editActive)
      .then((Response) => {
        // const tableData = _.cloneDeep(data)
        const tableData = [...data]
        const itemIndex = tableData?.findIndex((it) => it?.id == item?.id)
        tableData[itemIndex] = Response.data
        setData(tableData)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //Delete particluar user

  const admin = currentUser?.phone
  const DeleteUser = (item) => {
    const text = 'Are you sure want to delete?'

    if (admin == item.phone) {
      swal("You can't delete yourself", '', 'warning')
    } else {
      swal(text, '', 'warning', {
        buttons: {
          cancel: 'No!',
          yes: true,
        },
      }).then((value) => {
        switch (value) {
          case 'yes':
            axios.delete(`/superadminlist/${item.id}/`).then(() => {
              const tableData = _.cloneDeep(data)
              const filteredData = tableData?.filter((it) => it?.id != item?.id)
              setData(filteredData)
            })
            break
        }
      })
      //   swal(text, {
      //     buttons: ['no!', true],
      //   }) == true &&
      //     axios.delete(`/superadminlist/${item.id}/`).then(() => {
      //       const tableData = _.cloneDeep(data)
      //       const filteredData = tableData?.filter((it) => it?.id != item?.id)
      //       setData(filteredData)
      //     })
    }
  }

  return (
    <>
      <div className='page-heading d-flex align-items-center text-dark fw-bold fs-3 my-0 justify-content-between py-3 py-lg-6 w-75 mx-auto'>
        {/* {toggle ? <h3>Edit User</h3> : <h3>Requests</h3>} */}
        {/* {toggle && <h3>Edit User</h3>} */}
        <h3>Super Admin</h3>
        {/* {addAdmin && <h3>Add Super Admin</h3>} */}

        {!toggle && !addAdmin && (
          <div
            onClick={() => setToggle('')}
            className='btn btn-sm fw-bold btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_create_app'
          >
            <span
              onClick={() => {
                setAddAdmin(!addAdmin)
              }}
            >
              Add Super Admin
            </span>
          </div>
        )}
      </div>
      {!toggle && !addAdmin && (
        <div className='shadow bg-body rounded mx-auto w-75 text-center'>
          {/* <h2>super admin dummytext</h2> */}
          <div className={`card ${className}`}>
            {/* <div className={`card ${className}`}> */}
            {/* begin::Body */}
            <div className='card-body'>
              {/* begin::Table container */}
              <div className='table-responsive'>
                {/* begin::Table */}
                <table className='table table-striped table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                  {/* begin::Table head */}
                  <thead className='text-gray-900 bg-gray-300  '>
                    <tr className='fw-bold fs-6'>
                      <th className='w-20 p-5'>First Name</th>
                      <th className='w-20 p-5'>Last Name</th>
                      <th className='w-20 p-5'>Email</th>
                      <th className='w-20 p-5'>Phone Number</th>
                      <th className='w-20 p-5'>Status</th>
                      <th className='w-20 p-5'>Edit/ Delete</th>
                      {/* <th className='min-w-120px'>Status</th> */}
                      {/* <th className='min-w-100px text-end'>Actions</th> */}
                    </tr>
                  </thead>
                  {/* end::Table head */}
                  {/* begin::Table body */}
                  <tbody className=''>
                    {data.map((item) => (
                      <tr key={item.id} className=''>
                        <td className=''>
                          <div className='text-dark fw-bold fs-6'>{item.first_name}</div>
                        </td>

                        <td>
                          <div className='text-dark fw-bold fs-6'>{item.last_name}</div>
                        </td>
                        <td>
                          <div className='text-dark fw-bold fs-6'>{item.email}</div>
                        </td>

                        <td>
                          <div className='text-dark fw-bold fs-6'>{item.phone}</div>
                        </td>

                        {/* Status start*/}
                        <td key={item.id}>
                          <div className=''>
                            {item.is_active && item?.phone != admin && (
                              <div>
                                <span
                                  data-tip
                                  data-for='Deactivate'
                                  className='badge badge-light-success cursor-pointer '
                                  onClick={() => {
                                    handleApproveDeactive(item)
                                  }}
                                >
                                  Admin is active
                                </span>
                                <ReactTooltip
                                  id='Deactivate'
                                  place='top'
                                  effect='float'
                                  type='info'
                                >
                                  Click to deactivate
                                </ReactTooltip>
                              </div>
                            )}
                            {!item.is_active && item?.phone != admin && (
                              <div>
                                <span
                                  data-tip
                                  data-for='Activate'
                                  className='badge badge-light-danger cursor-pointer'
                                  onClick={() => {
                                    handleApproveActive(item)
                                  }}
                                >
                                  Admin deactivated
                                </span>
                                <ReactTooltip id='Activate' place='top' effect='float' type='info'>
                                  Click to activate
                                </ReactTooltip>
                              </div>
                            )}

                            {/* For admin */}
                            {item.is_active && item?.phone == admin && (
                              <div className='badge badge-light-success  '>Active</div>
                            )}
                            {!item.is_active && item?.phone == admin && (
                              <div className='badge badge-light-danger '>Deactivated</div>
                            )}
                          </div>
                          {/* For admin ends */}
                        </td>

                        {/* Status ends*/}
                        <td className=''>
                          {/* <a
                            href='#'
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen019.svg'
                              className='svg-icon-3'
                            />
                          </a> */}
                          <div
                            onClick={() => {
                              Toggle(item)
                            }}
                            className='btn btn-icon btn-bg-secondary btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG
                              path='/media/icons/duotune/art/art005.svg'
                              className='svg-icon-3'
                            />
                          </div>
                          <div
                            onClick={() => DeleteUser(item)}
                            className='btn btn-icon btn-bg-secondary btn-active-color-primary btn-sm'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen027.svg'
                              className='svg-icon-3'
                            />
                          </div>
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

            {/* Begins Editing section */}
          </div>{' '}
        </div>
      )}

      {toggle && <UpdateAdmin id={toggle} goback={setToggle} />}

      {addAdmin && (
        <div>
          <AddAdmin goback={setAddAdmin} />
        </div>
      )}
    </>
  )
}

export {AdminTable}
