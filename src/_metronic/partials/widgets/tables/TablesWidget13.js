/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from '../../../../app/FetchApi/Api'
import React, {useEffect, useState} from 'react'
import {KTSVG} from '../../../helpers'
import UpdateOrg from '../../../../app/pages/dashboard/UpdateOrg'
import AddOrg from '../../../../app/pages/dashboard/AddOrg'
import _ from 'lodash'
import swal from 'sweetalert'

//type Props = {
//className: string,
//id: number
//}

//const TablesWidget13: React.FC<Props> = ({className}) => {
const TablesWidget13 = ({className}) => {
  const [data, setData] = useState([])
  const [status, setStatus] = useState(0)
  const [toggle, setToggle] = useState('')
  const [addOrg, setAddOrg] = useState(false)

  const api = async () => {
    await axios
      .get('/organization/')
      .then((response) => {
        setData(response.data.data)
        setStatus(response.data.status)
      })
      .catch((Error) => {
        console.log(Error)
      })
  }

  useEffect(() => {
    api()
    // console.log(data)
  }, [toggle, addOrg])

  //Delete particluar user
  const DeleteUser = (item) => {
    const text = 'Are sure want to delete.'
    {
      // window.confirm(text) == true &&
      //   axios
      //     .delete(`/organization/${item.id}/`)
      //     .then(() => {
      //       const tableData = _.cloneDeep(data)
      //       const filteredData = tableData?.filter((it) => it?.id != item?.id)
      //       setData(filteredData)
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
            axios.delete(`/organization/${item.id}/`).then(() => {
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

  const Toggle = (id) => {
    setToggle(id)
    console.log(id)
  }

  return (
    <>
      <div className='page-heading d-flex align-items-center text-dark fw-bold fs-3 my-0 justify-content-between py-3 py-lg-6 mx-auto w-75'>
        {/* {toggle ? <h3>Edit User</h3> : <h3>Requests</h3>} */}
        {/* {toggle && <h3>Edit Org</h3>} */}
        <h3>Organization</h3>
        {/* {addOrg && <h3>Add Org</h3>} */}

        {!toggle && !addOrg && (
          <div
            onClick={() => setToggle('')}
            className='btn btn-sm fw-bold btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_create_app'
          >
            <span
              onClick={() => {
                setAddOrg(!addOrg)
              }}
            >
              Add Org
            </span>
          </div>
        )}
      </div>
      {!toggle && !addOrg && (
        <div className={`card ${className} shadow rounded mx-auto w-75 text-center`}>
          {status === 0 && (
            <div>
              <h2>Data not available</h2>
            </div>
          )}
          {status === 1 && (
            <div>
              {/* <div className={`card ${className}`}> */}
              {/* begin::Body */}
              <div className='card-body'>
                {/* begin::Table container */}
                <div className='table-responsive '>
                  {/* begin::Table */}
                  <table className='table table-striped table-row-bordered table-row-gray-100 align-middle gs-0 gy-3 '>
                    {/* begin::Table head */}
                    <thead className='text-gray-900 bg-gray-300'>
                      <tr className='fw-bold fs-6'>
                        <th className='w-auto p-5'>Name</th>
                        <th className='w-auto p-5'>Address</th>
                        <th className='w-auto p-5'>Account Owner</th>
                        <th className='w-auto p-5'>Phone Number</th>
                        <th className='w-auto p-5'>Edit/ Delete</th>
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
                            <div className='text-dark fw-bold fs-6'>{item.name}</div>
                          </td>
                          <td>
                            <div className='text-dark fw-bold fs-6'>{item.address}</div>
                          </td>
                          <td>
                            <div className='text-dark fw-bold fs-6'>
                              {item.owner_fname} {item.owner_lname}
                            </div>
                          </td>
                          <td>
                            <div className='text-dark fw-bold fs-6'>{item.phone}</div>
                          </td>

                          {/* <td className='text-dark fw-bold text-hover-primary fs-6'>$3560</td> */}
                          {/* <td>
                  <span className='badge badge-light-success'>Approved</span>
                </td> */}
                          <td className=''>
                            <div
                              onClick={() => {
                                Toggle(item.id)
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
            </div>
          )}
        </div>
      )}

      {toggle && <UpdateOrg id={toggle} goback={setToggle} />}

      {addOrg && (
        <div>
          <AddOrg goback={setAddOrg} />
        </div>
      )}
    </>
  )
}

export {TablesWidget13}
