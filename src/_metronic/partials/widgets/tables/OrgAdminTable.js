/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from '../../../../app/FetchApi/Api'
import React, {useEffect, useState} from 'react'
import {KTSVG} from '../../../helpers'
import UpdateOAadmin from '../../../../app/pages/Admin/UpdateOAadmin'
import _, {values} from 'lodash'
import AddOAdmin from '../../../../app/pages/Admin/AddOAdmin'
import ReactTooltip from 'react-tooltip'
import swal from 'sweetalert'

//type Props = {
//className: string,
//id: number
//}

//const OrgAdminTable: React.FC<Props> = ({className}) => {
const OrgAdminTable = ({className}) => {
  const [data, setData] = useState([])
  const [toggle, setToggle] = useState()
  const [addAdmin, setAddAdmin] = useState(false)
  const [active, setActive] = useState()

  const api = async () => {
    await axios.get('/orgadminlist/').then((response) => {
      setData(response.data.data)
    })
  }

  useEffect(() => {
    api()
    // console.log(data)
  }, [toggle, addAdmin])

  //Api call for particluar user to edit.
  const Toggle = (item) => {
    setToggle(item.id)
  }

  // Handle Aprrove Aactive
  const handleApproveActive = (item) => {
    // console.log(is_active)
    const editActive = {is_active: true}
    axios
      .patch(`/orgadminlist/${item.id}/`, editActive)
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

  // Handle Aprrove Deactive
  const handleApproveDeactive = (item) => {
    // console.log(is_active)
    const editActive = {is_active: false}
    axios
      .patch(`/orgadminlist/${item.id}/`, editActive)
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

  // To delete particular user
  const DeleteUser = (item) => {
    const text = 'Are you sure want to delete ?'
    {
      // window.confirm(text) == true &&
      //   axios.delete(`/orgadminlist/${item.id}/`).then(() => {
      //     const tableData = _.cloneDeep(data)
      //     const filteredData = tableData?.filter((it) => it?.id != item?.id)
      //     setData(filteredData)
      //   })
      swal(text, '', 'warning', {
        buttons: {
          cancel: 'No!',
          yes: true,
        },
      }).then((value) => {
        switch (value) {
          case 'yes':
            axios.delete(`/orgadminlist/${item.id}/`).then(() => {
              const tableData = _.cloneDeep(data)
              const filteredData = tableData?.filter((it) => it?.id != item?.id)
              setData(filteredData)
            })
            break

          default:
            break
        }
      })
    }
  }

  return (
    <div className='m-0 p-0'>
      <div className=' d-flex align-items-center text-dark fw-bold fs-3 m-0 justify-content-between py-5 w-75 mx-auto'>
        {/* {toggle ? <h3>Edit User</h3> : <h3>Requests</h3>} */}
        {/* {toggle && <h3>Edit Org admin</h3>} */}
        {!toggle && !addAdmin && <h3 className='m-0'>Organization Admin</h3>}
        {/* {addAdmin && <h3>Add Organization Admin</h3>} */}

        {!toggle && !addAdmin && (
          <div
            onClick={() => setToggle('')}
            className='btn btn-sm fw-bold btn-primary m-0'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_create_app'
          >
            <span
              onClick={() => {
                setAddAdmin((addAdmin) => !addAdmin)
              }}
            >
              Add Organization admin
            </span>
          </div>
        )}
      </div>
      {/* Display Table */}
      {!toggle && !addAdmin && (
        <div className={`card ${className} m-0  mx-auto w-75 text-center`}>
          {/* <div className={`card ${className}`}> */}
          {/* begin::Body */}
          <div className='card-body shadow'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table table-striped table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                {/* begin::Table head */}
                <thead className='text-gray-900 bg-gray-300'>
                  <tr className='fw-bold fs-6'>
                    <th className='min-w-140px p-5'>First Name</th>
                    <th className='min-w-140px p-5'>Last Name</th>
                    <th className='min-w-140px p-5'>Email</th>
                    <th className='min-w-140px p-5'>Phone Number</th>
                    <th className='min-w-140px p-5'>Organization</th>
                    <th className='w-20 p-5'>Status</th>
                    <th className='min-w-140px p-5'>
                      Edit
                      {/* / Delete */}
                    </th>
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
                        <p
                          className='text-dark fw-bold fs-6'
                          data-toggle='tooltip'
                          data-placement='left'
                          title={item?.org_name?.join(', ')}
                          style={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            width: '100px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item?.org_name?.join(', ')}
                        </p>
                      </td>

                      {/* Status start*/}
                      <td key={item.id}>
                        <div className=''>
                          {item.is_active && (
                            <div>
                              <span
                                data-tip
                                data-for='Deactivate'
                                className='badge badge-light-success cursor-pointer '
                                onClick={() => {
                                  // setActive(false)
                                  handleApproveDeactive(item)
                                }}
                              >
                                Admin is active
                              </span>
                              <ReactTooltip id='Deactivate' place='top' effect='float' type='info'>
                                Click to deactivate
                              </ReactTooltip>
                            </div>
                          )}
                          {!item.is_active && (
                            <div>
                              <span
                                data-tip
                                data-for='Activate'
                                className='badge badge-light-danger cursor-pointer'
                                onClick={() => {
                                  // setActive(true)
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
                        </div>
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
        </div>
      )}
      {addAdmin && (
        <div>
          <AddOAdmin goback={setAddAdmin} Goback={setAddAdmin} />
        </div>
      )}
      {toggle && <UpdateOAadmin id={toggle} goback={setToggle} />}
    </div>
  )
}

export {OrgAdminTable}
