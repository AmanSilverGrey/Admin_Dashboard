/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from '../../../../app/FetchApi/Api'
import React, {useEffect, useState} from 'react'
import {KTSVG} from '../../../helpers'
import AddUser from '../../../../app/pages/Requests/AddUser'
import _ from 'lodash'
import ReactTooltip from 'react-tooltip'
import {userdata} from '../../../../app/LocalStorage/UserDetails'
import NoData from '../../../../app/pages/NoData/NoData'
import {useAuth} from '../../../../app/modules/auth'
import swal from 'sweetalert'
import {showToast} from '../../../../app/customs/CustomModel'
import EditRequest from './EditRequest'

//type Props = {
//className: string,
//id: number
//}

const RequestsTable = ({className}) => {
  const [data, setData] = useState([])
  // const [nodata, setNOData] = useState('')
  const [toggle, setToggle] = useState(0)
  const [addUser, setAddUser] = useState(false)
  const currentUser = useAuth()

  // const [approve, setApprove] = useState(-1);

  // States for updating
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [org, setOrg] = useState('')
  const [org_name, setOrg_name] = useState('')
  const [selectOrg, setSelectOrg] = useState('')
  const [active, setActive] = useState()
  // Show Table
  const [showTable, setShowTable] = useState(true)
  const [editData, setEditData] = useState([])

  //For Update dropdown
  const [orgName, setOrgName] = useState([])

  //Api call to list users.
  const api = async () => {
    const UserDetails = localStorage.getItem('User-Details')
    const UserData = JSON.parse(JSON.parse(JSON.stringify(UserDetails)))
    console.log('userdata', UserData.type)
    if (UserData?.type == 'SA') {
      await axios
        .get('/requestusers/?type=NU')
        .then((response) => {
          console.log('rk', response)
          if (response?.data?.data?.length == 0) {
            setShowTable(false)
          } else {
            setData(response?.data?.data)
            console.log('Aman', response?.data?.data)
          }
          console.log('Aman', response?.data?.data)
        })
        .catch((error) => {
          console.log(error)
        })

      //Fecthing Org names
      await axios
        .get('/organization/')
        .then((Response) => {
          setOrgName(Response.data.data)
        })
        .catch((Error) => {
          console.log(Error)
        })
    } else {
      const userorg = UserData?.org
      await axios
        .get(`/requestusers/?type=NU&org=${userorg}`)
        .then((response) => {
          if (response?.data?.data?.length == 0) {
            console.log('No data')
            setShowTable(false)
          } else {
            setData(response?.data?.data)
          }
        })
        .catch((error) => {
          console.log(error)
        })

      //Fecthing Org names
      await axios
        .get('/organization/')
        .then((Response) => {
          setOrgName(Response.data.data)
        })
        .catch((Error) => {
          console.log(Error)
        })
    }
  }

  useEffect(() => {
    api()
    console.log(data)
  }, [toggle, addUser])

  // Handle Aprrove
  const handleApprove = (item) => {
    // console.log(is_active)

    const editActive = {is_active: active}

    axios
      .patch(`/user/${item.id}/`, editActive)
      .then((Response) => {
        // const tableData = _.cloneDeep(data)
        const tableData = [...data]
        const itemIndex = tableData?.findIndex((it) => it?.id == item?.id)
        tableData[itemIndex] = Response.data
        setData(tableData)
        // console.log(Response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //Api call for particluar user to edit.
  // const Toggle = async (id) => {
  //   setToggle(id)
  //   await axios
  //     .get(`/user/${id}/`)
  //     .then((Response) => {
  //       setEditData(Response.data.data)
  //       console.log('User', Response.data.data)
  //       setFirst_name(Response.data.data.first_name)
  //       setLast_name(Response.data.data.last_name)
  //       setEmail(Response.data.data.email)
  //       setOrg(Response.data.data.org)
  //       setSelectOrg(Response.data.data.org_name)
  //       setActive(Response.data.data.is_active)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }
  //Delete particluar user
  const DeleteUser = (item) => {
    const text = 'Are sure want to delete.'
    {
      // window.confirm(text) == true &&
      //   axios
      //     .delete(`/user/${item.id}/`)
      //     .then(() => {
      //       const tableData = _.cloneDeep(data)
      //       const filteredData = tableData?.filter((it) => it?.id != item?.id)
      //       setData(filteredData)
      //       if (filteredData.length == 0) {
      //         setShowTable(false)
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error)
      //     })

      swal(text, '', 'warning', {
        buttons: {
          cancel: 'No!',
          yes: true,
        },
      }).then((value) => {
        switch (value) {
          case 'yes':
            axios.delete(`/user/${item.id}/`).then(() => {
              const tableData = _.cloneDeep(data)
              const filteredData = tableData?.filter((it) => it?.id != item?.id)
              setData(filteredData)
              if (filteredData.length == 0) {
                setShowTable(false)
              }
            })
            break

          default:
            break
        }
      })
    }
  }

  //Handle Form Submit
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const orgId = orgName.find((item) => item?.name == selectOrg)
  //   const EditedUser = {
  //     first_name,
  //     last_name,
  //     email,
  //     org: orgId?.id,
  //     org_name: orgId?.name,
  //     is_active: active,
  //   }

  //   axios
  //     .patch(`/user/${toggle}/`, EditedUser)
  //     .then((Response) => {
  //       setToggle(false)
  //       showToast.success('User Edited!')
  //     })
  //     .catch((error) => {
  //       showToast.error(error)
  //     })
  // }

  return (
    <>
      <div className='d-flex align-items-center text-dark fw-bold fs-3 my-0 justify-content-between pb-5 w-sm-75 mx-auto'>
        {/* {toggle ? <h3>Edit User</h3> : <h3>Requests</h3>} */}
        {/* {toggle && <h3>Edit User</h3>} */}
        {!toggle && !addUser && <h3>Requests</h3>}
        {/* {addUser && <h3>Add User</h3>} */}

        {!toggle && !addUser && (
          <div
            onClick={() => setToggle('')}
            className='btn btn-sm fw-bold btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_create_app'
          >
            {' '}
            <span
              onClick={() => {
                setAddUser((current) => !current)
              }}
            >
              Add User
            </span>
          </div>
        )}
      </div>
      {!toggle && !addUser && showTable && (
        <div className='shadow bg-body rounded text-center w-sm-75 mx-auto'>
          <div className={`card ${className}`}>
            {/* <div className={`card ${className}`}> */}
            {/* begin::Body */}
            <div className='card-body m-0 p-0 rounded'>
              {/* begin::Table container */}
              <div className='table-responsive'>
                {/* begin::Table */}
                <table className='table table-striped table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                  {/* begin::Table head */}
                  <thead className='text-gray-900 bg-gray-300'>
                    <tr className='fw-bold fs-6'>
                      <th className='w-15 p-5'>First Name</th>
                      <th className='w-15 p-5'>Email</th>
                      <th className='w-15 p-5'>Phone Number</th>
                      <th className='w-15 p-5'>Organization</th>
                      <th className='w-15 p-5'>Status</th>
                      <th className='p-5'>Edit</th>
                      {/* <th className='min-w-120px'>Status</th> */}
                      {/* <th className='min-w-100px text-end'>Actions</th> */}
                    </tr>
                  </thead>
                  {/* end::Table head */}
                  {/* begin::Table body */}
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <p className='text-dark fw-bold fs-6'>
                            {item.first_name} {item.last_name}
                          </p>
                        </td>

                        <td>
                          <p className='text-dark fw-bold fs-6'>{item.email}</p>
                        </td>
                        <td>
                          <p className='text-dark fw-bold fs-6'>{item.phone}</p>
                        </td>
                        <td>
                          <p className='text-dark fw-bold fs-6'>{item.org_names}</p>
                        </td>
                        <td key={item.id}>
                          <div>
                            {item.is_active && (
                              <div>
                                <span
                                  data-tip
                                  data-for='registerTip'
                                  onClick={() => {
                                    setActive(false)
                                    handleApprove(item)
                                  }}
                                  className='badge badge-light-success cursor-pointer'
                                >
                                  User is active
                                </span>
                                <ReactTooltip
                                  id='registerTip'
                                  place='top'
                                  effect='float'
                                  type='info'
                                >
                                  Click to deactivate
                                </ReactTooltip>
                              </div>
                            )}
                            {!item.is_active && (
                              <div>
                                <span
                                  data-tip
                                  data-for='activate User'
                                  onClick={() => {
                                    setActive(true)
                                    handleApprove(item)
                                  }}
                                  className='badge badge-light-danger cursor-pointer'
                                >
                                  User is deactive
                                </span>
                                <ReactTooltip
                                  id='activate User'
                                  place='top'
                                  effect='float'
                                  type='info'
                                >
                                  Click to activate
                                </ReactTooltip>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* <td className='text-dark fw-bold text-hover-primary fs-6'>$3560</td> */}
                        {/* <td>
                  <span className='badge badge-light-success'>Approved</span>
                </td> */}
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
                              setToggle(item?.id)
                            }}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG
                              path='/media/icons/duotune/art/art005.svg'
                              className='svg-icon-3'
                            />
                          </div>
                          {/* <div
                            onClick={() => DeleteUser(item)}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen027.svg'
                              className='svg-icon-3'
                            />
                          </div> */}
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

      {/* Edit User */}
      {toggle ? <EditRequest setToggle={setToggle} toggle={toggle} /> : null}

      {!showTable && !addUser ? (
        <div className='d-flex flex-column flex-root'>
          <div className='d-flex flex-column flex-center flex-column-fluid'>
            <div className='d-flex flex-column flex-center text-center p-10'>
              <div className='card card-flush  w-lg-650px py-5 shadow'>
                <div className='card-body py-15 py-lg-20'>
                  <NoData setAddUser={setAddUser} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {addUser ? (
        <div>
          <AddUser goback={setAddUser} setShowTable={setShowTable} />
        </div>
      ) : null}
    </>
  )
}

export {RequestsTable}
