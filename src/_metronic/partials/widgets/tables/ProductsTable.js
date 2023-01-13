/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from '../../../../app/FetchApi/Api'
import React, {useEffect, useState} from 'react'
import {KTSVG} from '../../../helpers'

//type Props = {
//className: string,
//id: number
//}

//const ProductsTable: React.FC<Props> = ({className}) => {
const ProductsTable = ({className}) => {
  const [data, setData] = useState([])
  const [pgNo, setPgNo] = useState(1)
  const [totalPage, setTotalpage] = useState(null)

  const api = async () => {
    await axios.get(`/product/?page=${pgNo}`).then((response) => {
      setData(response.data.results)
      setTotalpage(Math.ceil(response.data.count / 50))
    })
  }

  useEffect(() => {
    api()
    console.log(data)
  }, [pgNo])

  return (
    <>
      <div className='w-75 mx-auto'>
        <h3>Products</h3>
      </div>
      <div className={`card ${className} shadow bg-body rounded w-75 mx-auto text-center my-10`}>
        {/* begin::Body */}
        <div className='card-body'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-striped table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
              {/* begin::Table head */}
              <thead className='text-gray-900 bg-gray-300'>
                <tr className='fw-bold fs-6'>
                  <th className='w-auto p-5'>Product Name</th>
                  <th className='w-auto p-5'>Product Image</th>
                  <th className='w-auto p-5'>Organization</th>
                  <th className='w-auto p-5'>Test for</th>
                  <th className='w-auto p-5'>SKU</th>
                  <th className='w-auto p-5'>Edit/ Delete</th>
                  {/* <th className='w-auto'>Status</th> */}
                  {/* <th className='min-w-100px text-end'>Actions</th> */}
                </tr>
              </thead>
              {/* end::Table head */}
              {/* <h3>Data not available</h3> */}

              {/* begin::Table body */}
              <tbody className='text-center'>
                {data.map((item) => (
                  <tr key={item.id} className='text-justify'>
                    <td>
                      <div className='text-dark fw-bold fs-6'>{item.Brand_Name}</div>
                    </td>
                    <td>
                      <div className='text-dark fw-bold fs-6'>
                        {item.Image_URL ? item.Image_URL : 'null'}
                      </div>
                    </td>
                    <td>
                      <div className='text-dark fw-bold fs-6'>
                        {item.organization.length > 0 ? item.organization : 'null'}
                      </div>
                    </td>
                    <td>
                      <div className='text-dark fw-bold fs-6'>
                        {item.test_for ? item.test_for : 'null'}
                      </div>
                    </td>
                    <td>
                      <div className='text-dark fw-bold fs-6'>{item.SKU}</div>
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
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-secondary btn-active-color-primary btn-sm me-1'
                      >
                        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-secondary btn-active-color-primary btn-sm'
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
        <div className=' mx-10 text-center d-flex fw-bold text-muted justify-content-between'>
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
            <p
              className='btn btn-outline-primary cursor-pointer '
              onClick={() => {
                setPgNo(pgNo + 1)
              }}
            >
              next
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export {ProductsTable}
