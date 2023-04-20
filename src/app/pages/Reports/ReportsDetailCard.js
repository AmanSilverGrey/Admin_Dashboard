/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'

const ReportsDetailCard = ({option, handleClose}) => {
  const IMAGE_URL = 'http://asc.apptology.in:81'
  return (
    <div className='bg-white rounded mx-auto w-75 shadow '>
      <div className='modal-header m-0 px-10 py-2'>
        <h2>Report Details</h2>
        {/* begin::Close */}
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
        </div>
        {/* end::Close */}
      </div>

      <div className='modal-body py-0 px-lg-10'></div>
      {/* container */}
      <div className='pb-10'>
        {/* line 1 */}
        <div className='d-flex flex-wrap justify-content-between align-items-center fw-bold fs-5 py-4 px-10'>
          <div className='d-flex flex-wrap gap-5 align-items-center w-sm-25'>
            <div className='text-gray-600'>Organization (Employer) : </div>
            <div className=''>{option?.employer}</div>
          </div>
          <div className='d-flex flex-wrap gap-5 align-items-center w-sm-25 '>
            <div className='text-gray-600'>First Name : </div>
            <div className=''>{option?.fname}</div>
          </div>
          <div className='d-flex flex-wrap gap-5 align-items-center w-sm-25 '>
            <div className='text-gray-600'>Last Name : </div>
            <div className=''>{option?.lname}</div>
          </div>
        </div>
        {/* line 2 */}
        <div className='d-flex flex-wrap justify-content-between align-items-center fw-bold fs-5 py-4 bg-light px-10'>
          <div className='d-flex flex-wrap gap-5 align-items-center w-sm-25'>
            <div className='text-gray-600'>Picture Id : </div>
            <div className=''>
              {option?.picture_id_verified == 'yes' ? 'Verified' : 'Not-verified'}
            </div>
          </div>
          <div className='d-flex flex-wrap gap-5 align-items-center w-sm-25 '>
            <div className='text-gray-600'>Test Reason : </div>
            <div className=''>{option?.test_reason}</div>
          </div>
          <div className='d-flex flex-wrap gap-5 align-items-center w-sm-25 '>
            <div className='text-gray-600'>Work Email : </div>
            <div className=''>{option?.email}</div>
          </div>
        </div>
        {/* line 3 */}
        <div className='d-flex flex-wrap justify-content-between align-items-center fw-bold fs-5 py-4 px-10 mb-10'>
          <div className='d-flex flex-wrap gap-5 align-items-center w-sm-25'>
            <div className='text-gray-600'>Driver's License : </div>
            <div className=''>{option?.license_no}</div>
          </div>
          <div className='d-flex flex-wrap gap-5 align-items-center w-sm-25 '>
            <div className='text-gray-600'>Phone Number : </div>
            <div className=''>{option?.phone}</div>
          </div>
          <div className='d-flex flex-wrap gap-5 align-items-center w-sm-25 '></div>
        </div>
        {/* Line 4 */}
        <div className='row gap-5 fw-bold fs-5 py-4 px-10 mb-10'>
          <div className='text-gray-600'>Test Captured :</div>
          {option?.image1 && (
            <div className='d-flex flex-wrap gap-5 align-items-center col-sm'>
              <div className=''>
                <img
                  className='rounded shadow'
                  src={`${IMAGE_URL}${option?.image1}`}
                  alt=' img'
                  style={{width: '150px', height: '150px'}}
                />
              </div>
            </div>
          )}

          {option?.image2 && (
            <div className='d-flex flex-wrap gap-5 align-items-center col-sm '>
              <img
                className='rounded shadow'
                src={`${IMAGE_URL}${option?.image2}`}
                alt=' img'
                style={{width: '150px', height: '150px'}}
              />
            </div>
          )}

          {option?.image3 && (
            <div className='d-flex flex-wrap gap-5 align-items-center col-sm '>
              <img
                className='rounded shadow'
                src={`${IMAGE_URL}${option?.image3}`}
                alt=' img'
                style={{width: '150px', height: '150px'}}
              />
            </div>
          )}

          {option?.image4 && (
            <div className='d-flex flex-wrap gap-5 align-items-center col-sm '>
              <img
                className='rounded shadow'
                src={`${IMAGE_URL}${option?.image4}`}
                alt=' img'
                style={{width: '150px', height: '150px'}}
              />
            </div>
          )}

          {option?.image5 && (
            <div className='d-flex flex-wrap gap-5 align-items-center col-sm '>
              <img
                className='rounded shadow'
                src={`${IMAGE_URL}${option?.image5}`}
                alt=' img'
                style={{width: '150px', height: '150px'}}
              />
            </div>
          )}
        </div>

        {/* Line 5 */}
        <div className='fw-bold fs-5 mb-10 px-10 '>
          <div className='mb-5'>Test Name :</div>
          {option?.test_result?.length > 0 &&
            Object.keys(option?.test_result[0])?.map((key, index) => {
              console.log(option?.test_result[key])
              return option?.test_result[0]?.[key] ? (
                <div className='d-flex align-items-center gap-5 '>
                  <span className='bi bi-circle-fill fs-9 text-gray-600' />
                  <span className='text-gray-600'> {key} </span>-
                  <span>{option?.test_result[0]?.[key]}</span>
                </div>
              ) : (
                <></>
              )
            })}
        </div>
        {/* Line 6 */}
        <div className='mb-10 fw-bold fs-5 px-10'>
          <div className='w-sm-25'>
            <img src={`${IMAGE_URL}${option?.signature}`} alt='' className='w-50' />
            <div className='text-gray-600'>
              Certified by <span className='text-gray-900'>{option?.specimen}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {ReportsDetailCard}
