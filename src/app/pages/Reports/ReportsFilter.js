import moment from 'moment'
import React from 'react'
import {Modal} from 'react-bootstrap'
import {KTSVG} from '../../../_metronic/helpers'

const ReportsFilter = ({
  setFromDate,
  setToDate,
  userType,
  searchOrgTerm,
  handleOrgSearch,
  searchOrgList,
  handleSearchbyOrg,
  searchUserTerm,
  handleUserSearch,
  searchUserList,
  handleSearchbyUser,
  searchProductTerm,
  handleProductSearch,
  searchProductList,
  handleSearchbyProduct,
  show,
  handleClose,
  closeModal,
}) => {
  return (
    <Modal
      className='modal fade'
      id='kt_modal_select_location'
      data-backdrop='static'
      tabIndex={-1}
      role='dialog'
      show={show}
      dialogClassName='modal-xl w-25'
      aria-hidden='true'
      onHide={handleClose}
    >
      <div className='modal-content'>
        <div className='modal-header m-0 px-10 py-5'>
          <h5 className='modal-title'>
            {' '}
            <span className='bi bi-funnel' /> Filter
          </h5>

          <div className='btn btn-icon btn-sm btn-active-light-primary ms-2' onClick={handleClose}>
            <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-2x' />
          </div>
        </div>
        <div className='modal-body'>
          <div className=' my-5 fw-bold'>
            <div className='d-flex align-items-center mb-5'>
              <span className='w-25'>From</span>
              <input
                className='p-3 border border-secondary rounded-1 cursor-pointer w-75'
                type='date'
                onChange={(e) => setFromDate(moment(e.target.value).format('DD-MM-YYYY'))}
              />
            </div>
            <div className='d-flex align-items-center mb-5 '>
              <span className='w-25'>To</span>
              <input
                className='p-3 border border-secondary rounded-1 w-75'
                type='date'
                onChange={(e) => setToDate(moment(e.target.value).format('DD-MM-YYYY'))}
              />
            </div>

            {/* Select by organisation */}
            {userType == 'SA' && (
              <div className='w-auto mb-5'>
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
            <div className='w-auto mb-5'>
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
        </div>
        <div className='modal-footer'>
          <button type='button' className='btn btn-light-primary' onClick={closeModal}>
            Cancel
          </button>
          <button id='submit' type='button' className='btn btn-primary' onClick={handleClose}>
            Apply
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ReportsFilter
