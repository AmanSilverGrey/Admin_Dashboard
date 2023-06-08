/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from '../../../../app/FetchApi/Api'
import React, {useEffect, useState} from 'react'
import {KTSVG} from '../../../helpers'
import EditProduct from '../../../../app/pages/Products/EditProduct'
import {useAuth} from '../../../../app/modules/auth'
import swal from 'sweetalert'
import AddProduct from '../../../../app/pages/Products/AddProduct'

//type Props = {
//className: string,
//id: number
//}

//const ProductsTable: React.FC<Props> = ({className}) => {
const ProductsTable = ({className}) => {
  const [data, setData] = useState([])
  const [pgNo, setPgNo] = useState(1)
  const [totalPage, setTotalpage] = useState(null)
  const [edit, setEdit] = useState(null)
  const [addNew, setAddNew] = useState(false)
  const {currentUser} = useAuth()

  const api = async () => {
    await axios.get(`/product/?page=${pgNo}`).then((response) => {
      setData(response.data.results)
      setTotalpage(Math.ceil(response.data.count / 50))
    })
  }

  useEffect(() => {
    api()
  }, [pgNo, edit, addNew])

  const handleCloseEdit = () => {
    setEdit(!edit.value)
  }

  const handleDelete = (id) => {
    const text = 'Are you sure want to delete?'
    swal(text, '', 'warning', {
      buttons: {
        cancel: 'No!',
        yes: true,
      },
    }).then((value) => {
      switch (value) {
        case 'yes':
          axios
            .delete(`/products/${id}/`)
            .then(() => {
              api()
            })
            .catch((err) => console.log(err))
          break
      }
    })
  }

  const handleAddNew = () => {
    setAddNew(!addNew)
  }

  return (
    <>
      <div className='w-75 d-flex justify-content-between align-items-center mx-auto mb-5'>
        {!edit && !addNew && <h3 className='m-0'>Products</h3>}
        {!addNew && !edit ? (
          <div className='btn bg-primary py-2 text-white fs-5' onClick={handleAddNew}>
            Add new
          </div>
        ) : null}
      </div>
      {!edit && !addNew && (
        <div
          className={`card ${className} p-0 m-0 shadow bg-body rounded w-75 mx-auto text-center`}
        >
          {/* begin::Body */}
          <div className='card-body m-0 p-0 rounded'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table table-striped table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                {/* begin::Table head */}
                <thead className='text-gray-900 bg-gray-300'>
                  <tr className='fw-bold fs-6'>
                    <th className='w-auto p-5'>Product Name</th>
                    <th className='w-auto p-5'>Product Image</th>
                    <th className='w-auto p-5'>Product Description</th>
                    <th className='w-auto p-5'>SKU</th>
                    {
                      <th className='w-auto p-5'>
                        {currentUser?.type == 'SA' ? 'Edit/ Delete' : 'View'}
                      </th>
                    }

                    {/* <th className='w-auto'>Status</th> */}
                    {/* <th className='min-w-100px text-end'>Actions</th> */}
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* <h3>Data not available</h3> */}

                {/* begin::Table body */}
                <tbody className=''>
                  {data.map((item) => (
                    <tr key={item.id} className=''>
                      <td>
                        <div className='text-dark fw-bold fs-6'>{item.Brand_Name}</div>
                      </td>
                      <td>
                        <div className='text-dark fw-bold fs-6'>
                          {item?.Image_URL ? (
                            <img
                              src={item?.Image_URL}
                              alt='img'
                              className='rounded-circle'
                              style={{height: '50px', width: '50px'}}
                            />
                          ) : (
                            <span className='bi bi-image-alt fs-1 text-gray-500'></span>
                          )}
                        </div>
                      </td>
                      <td className=''>
                        <div
                          className='text-dark fw-bold fs-6 text-hover-gray-600 mx-auto'
                          data-toggle='tooltip'
                          data-placement='left'
                          title={item?.Product_Description}
                          style={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            width: '180px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item?.Product_Description ?? 'null'}
                        </div>
                      </td>

                      <td>
                        <div className='text-dark fw-bold fs-6'>{item.SKU}</div>
                      </td>

                      <td className=''>
                        <a
                          href='#'
                          onClick={() =>
                            setEdit({
                              value: true,
                              id: item?.id,
                            })
                          }
                          className='btn btn-icon btn-bg-secondary btn-active-color-primary btn-sm me-1'
                        >
                          {currentUser?.type == 'SA' ? (
                            <KTSVG
                              path='/media/icons/duotune/art/art005.svg'
                              className='svg-icon-3'
                            />
                          ) : (
                            <div className='bi bi-eye-fill fs-2 text-dark cursor-pointer text-hover-primary btn-sm '></div>
                          )}
                        </a>
                        {currentUser?.type == 'SA' && (
                          <a
                            onClick={() => handleDelete(item?.id)}
                            href='#'
                            className='btn btn-icon btn-bg-secondary btn-active-color-primary btn-sm'
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen027.svg'
                              className='svg-icon-3'
                            />
                          </a>
                        )}
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
          <div className=' mx-10 d-flex fw-bold text-muted justify-content-between'>
            <div>
              <p className='text-primary'>{`Showing page ${pgNo} from ${totalPage} pages`}</p>
            </div>
            <div className='d-flex gap-5 '>
              {pgNo > 1 && (
                <p
                  className='cursor-pointer btn btn-outline-primary'
                  onClick={() => setPgNo(pgNo - 1)}
                >
                  Previous
                </p>
              )}
              <p className='text-primary btn btn-outline'>{pgNo}</p>
              {totalPage > pgNo ? (
                <p
                  className='btn btn-outline-primary cursor-pointer '
                  onClick={() => {
                    setPgNo(pgNo + 1)
                  }}
                >
                  next
                </p>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {edit ? <EditProduct close={handleCloseEdit} id={edit.id} /> : null}
      {addNew ? <AddProduct close={handleAddNew} /> : null}
    </>
  )
}

export {ProductsTable}
