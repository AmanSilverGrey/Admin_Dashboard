import axios from '../../FetchApi/Api'
import React, {useEffect, useRef, useState} from 'react'
import {showToast} from '../../customs/CustomModel'

const AddProduct = ({close}) => {
  const profileFilePickerRef = useRef()
  const [hover, setHover] = useState(false)
  const [product_name, setProduct_name] = useState('')
  const [product_desc, setProduct_desc] = useState('')
  const [gtin, setGtin] = useState('')
  const [gtinValue, setGtinValue] = useState('')
  const [sku, setSku] = useState('')
  const [skuValue, setSkuValue] = useState('')
  const [product_indus, setProduct_indus] = useState('')
  const [productImage, setproductImage] = useState(null)

  const handleHover = () => {
    setHover(!hover)
  }

  const onChangeInputDataImage = (e) => {
    setproductImage(e?.target?.files?.[0])
  }

  // const UpdateProduct = {
  //   Brand_Name: product_name,
  //   Product_Description: product_desc,
  //   GTIN: gtin,
  //   SKU: sku,
  //   Product_Industry: product_indus,
  //   Image_URL: productImage,
  // }

  const handleSubmit = () => {
    let formData = new FormData()
    formData.append('Brand_Name', product_name)
    formData.append('Product_Description', product_desc)
    formData.append('GTIN', gtin)
    formData.append('SKU', sku)
    formData.append('Product_Industry', product_indus)
    if (productImage?.name) formData.append('Image_URL', productImage)

    axios
      .post(`/product/`, formData)
      .then((Response) => {
        close()
        showToast.success('Product Added!')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      {' '}
      <div className='w-50 mx-auto p-10 shadow  my-10 bg-body rounded'>
        {/* <!--begin::Input group--> */}
        {/* <h2>Update superAdmin</h2> */}
        <form onSubmit={handleSubmit}>
          <br />
          <h2 className='text-primary'>Add Product</h2>
          <br />
          <div className='form-floating mb-7'>
            <input
              type='text'
              className='form-control form-control-solid bg-light'
              id='floatingInput1'
              value={product_name}
              onChange={(e) => setProduct_name(e.target.value)}
              required
              pattern='\S(.*\S)?'
            />
            <label htmlFor='floatingInput1'>
              Product Name <span className='text-danger'>*</span>
            </label>
          </div>

          <div className='form-floating mb-7'>
            <input
              type='text'
              className='form-control form-control-solid bg-light'
              id='floatingInput1'
              value={product_desc}
              onChange={(e) => setProduct_desc(e.target.value)}
              required
              pattern='\S(.*\S)?'
            />
            <label htmlFor='floatingInput1'>
              Product description <span className='text-danger'>*</span>
            </label>
          </div>

          <div className='form-floating mb-7'>
            <input
              type='text'
              className='form-control form-control-solid bg-light'
              id='floatingInput1'
              value={gtin}
              onChange={(e) => setGtin(e.target.value)}
              required
              pattern='\S(.*\S)?'
            />
            <label htmlFor='floatingInput1'>
              GTIN <span className='text-danger'>*</span>
            </label>
          </div>
          <div className='form-floating mb-7'>
            <input
              type='text'
              className='form-control form-control-solid bg-light'
              id='floatingInput1'
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              required
              pattern='\S(.*\S)?'
            />
            <label htmlFor='floatingInput1'>
              SKU <span className='text-danger'>*</span>
            </label>
          </div>
          <div className='form-floating mb-7'>
            <input
              type='text'
              className='form-control form-control-solid bg-light'
              id='floatingInput1'
              value={product_indus}
              onChange={(e) => setProduct_indus(e.target.value)}
              pattern='\S(.*\S)?'
            />
            <label htmlFor='floatingInput1'>Product Industry</label>
          </div>

          <div className='form-label text-Gray-600'>Add Image:</div>

          <div className='w-sm-75'>
            <input
              ref={profileFilePickerRef}
              onChange={onChangeInputDataImage}
              style={{display: 'none'}}
              type='file'
              className='form-control py-2 bg-cmbg rounded border border-cmDisabled border-2 mb-3'
            />

            <div className='d-sm-flex align-items-start justify-content-between cursor-pointer'>
              <div
                className='w-100px mx-sm-0 mx-auto d-flex align-items-center justify-content-center h-100px shdaow-sm border-cmDisabled border border-dashed border-3'
                // style={{borderRadius: '10px', backgroundColor: 'red'}}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                onClick={() => profileFilePickerRef?.current?.click()}
                style={{
                  borderRadius: '10px',
                  position: 'absolute',
                  height: '100%',
                  // borderRadius: '100px',
                  overflow: 'hidden',
                  justifyContent: 'center',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  // backgroundColor: 'rgba(0,0,0,0.5)',
                }}
              >
                {hover && (
                  <div
                    style={{
                      borderRadius: '10px',
                      position: 'absolute',
                      height: '100%',
                      // borderRadius: '100px',
                      overflow: 'hidden',
                      justifyContent: 'center',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                  >
                    <div className='bi bi-camera2 fs-1 text-cmDisabled'></div>
                  </div>
                )}
              </div>
              <img
                style={{width: '100px', height: '100px', borderRadius: '10px'}}
                src={productImage?.type ? URL.createObjectURL(productImage) : null}
                alt=''
                className=''
              />
            </div>
          </div>

          <div className='col-md-12 text-center d-flex gap-10'>
            <button type='submit' className='btn btn-sl fw-bold btn-primary mt-8'>
              Add
            </button>
            <div className='btn btn-sl fw-bold btn-dark w-20 mt-8' onClick={close}>
              Cancel
            </div>
          </div>
          {/* <!--end::Input group--> */}
        </form>
      </div>
    </div>
  )
}

export default AddProduct
