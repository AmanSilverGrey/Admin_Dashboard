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
import { showToast } from '../../../../app/customs/CustomModel'

//type Props = {
//className: string,
//id: number
//}

const RequestsTable = ({className}) => {
  const [data, setData] = useState([])
  // const [nodata, setNOData] = useState('')
  const [toggle, setToggle] = useState('')
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

  //For Update dropdown
  const [orgName, setOrgName] = useState([])

  //Api call to list users.
  const api = async () => {
    const UserDetails = localStorage.getItem('User-Details')
    const UserData = JSON.parse(JSON.parse(JSON.stringify(UserDetails)))
    if (UserData?.type == 'SA') {
      await axios
        .get('/requestusers/?type=NU')
        .then((response) => {
          console.log(response.data.results)

          if (response.data.results.length == 0) {
            setShowTable(false)
          } else {
            setData(response.data.results)
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
    } else {
      const userorg = UserData?.org
      console.log(userorg)
      await axios
        .get(`/requestusers/?type=NU&org=${userorg}`)
        .then((response) => {
          if (response.data.results.length == 0) {
            console.log('No data')
            console.log(response.data.results)
            setShowTable(false)
          } else {
            setData(response.data.results)
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
  const Toggle = async (id) => {
    setToggle(id)
    await axios
      .get(`/user/${id}/`)
      .then((Response) => {
        setFirst_name(Response.data.data.first_name)
        setLast_name(Response.data.data.last_name)
        setEmail(Response.data.data.email)
        setOrg(Response.data.data.org)
        setSelectOrg(Response.data.data.org_name)
      })
      .catch((error) => {
        console.log(error)
      })
  }
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
  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(selectOrg)
    const orgId = orgName.find((item) => item?.name == selectOrg)
    const EditedUser = {first_name, last_name, email, org: orgId?.id, org_name: orgId?.name}

    axios
      .patch(`/user/${toggle}/`, EditedUser)
      .then((Response) => {
        console.log(Response.data)
        setToggle(false)
        showToast.success('User Edited!')
      })
      .catch((error) => {
        showToast.error(error)
      })
  }

  return (
    <>
      <div className='page-heading d-flex align-items-center text-dark fw-bold fs-3 my-0 justify-content-between py-3 py-lg-6'>
        {/* {toggle ? <h3>Edit User</h3> : <h3>Requests</h3>} */}
        {/* {toggle && <h3>Edit User</h3>} */}
        <h3>Requests</h3>
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
        <div className='shadow bg-body rounded text-center'>
          <div className={`card ${className}`}>
            {/* <div className={`card ${className}`}> */}
            {/* begin::Body */}
            <div className='card-body py-3'>
              {/* begin::Table container */}
              <div className='table-responsive'>
                {/* begin::Table */}
                <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                  {/* begin::Table head */}
                  <thead>
                    <tr className='fw-bold text-muted'>
                      <th className='w-15'>First Name</th>
                      <th className='w-15'>Last Name</th>
                      <th className='w-15'>Email</th>
                      <th className='w-15'>Phone Number</th>
                      <th className='w-15'>Organisation</th>
                      <th className='w-15'>Status</th>
                      <th className=''>Edit/ Delete</th>
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
                          <p className='text-dark fw-bold fs-6'>{item.org_name}</p>
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
                                  data-for='activateUser'
                                  onClick={() => {
                                    setActive(true)
                                    handleApprove(item)
                                  }}
                                  className='badge badge-light-danger cursor-pointer'
                                >
                                  User is deactive
                                </span>
                                <ReactTooltip
                                  id='activateUser'
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
                              Toggle(item.id)
                            }}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG
                              path='/media/icons/duotune/art/art005.svg'
                              className='svg-icon-3'
                            />
                          </div>
                          <div
                            onClick={() => DeleteUser(item)}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
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

      {/* Edit User */}
      {toggle && (
        <div className='w-50 mx-auto p-10 shadow  mb-5 bg-body rounded'>
          <br />
          <h2 className='text-primary'>Edit user </h2>
          <br />
          <div className='form-floating mb-7'>
            <input
              type='text'
              className='form-control form-control-solid bg-light'
              id='floatingInput1'
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
            />
            <label htmlFor='floatingInput1'>First Name</label>
          </div>
          <div className='form-floating mb-7'>
            <input
              type='text'
              className='form-control form-control-solid bg-light'
              id='floatingInput1'
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
            />
            <label htmlFor='floatingInput1'>Last Name</label>
          </div>
          <div className='form-floating mb-7'>
            <input
              type='email'
              className='form-control form-control-solid bg-light'
              id='floatingInput1'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='floatingInput1'>Email</label>
          </div>

          {/* <div className='form-floating mb-7'>
            <input
              type='number'
              className='form-control form-control-solid bg-light'
              id='floatingInput1'
              value={org}
              onChange={(e) => setOrg(e.target.value)}
            />
            <label htmlFor='floatingInput1'>Org</label>
          </div> */}

          {/* dropdown */}
          {/* Drop Down */}
          <div className='form-floating mb-7'>
            <select
              className='form-select form-select-solid bg-light cursor-pointer'
              id='floatingSelect1'
              aria-label='Floating label select example'
              onChange={(e) => setSelectOrg(e.target.value)}
              value={selectOrg}
              required
            >
              <option value={''} dselected disabled hidden>{selectOrg}</option>
              {orgName.map((item) => (
                <option key={item.id} value={item?.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <label htmlFor='floatingSelect1'>Organization name</label>
          </div>

          <div className='col-md-12 text-center d-flex gap-10'>
            <span className='btn btn-sl fw-bold btn-success w-20 mt-8' onClick={handleSubmit}>
              Update
            </span>
            <div className='btn btn-sl fw-bold btn-dark w-20 mt-8' onClick={() => setToggle(false)}>
              Cancel
            </div>
          </div>
        </div>
      )}

      {!showTable && !addUser && (
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
      )}

      {addUser && (
        <div>
          <AddUser goback={setAddUser} setShowTable={setShowTable} />
        </div>
      )}
    </>
  )
}

export {RequestsTable}
