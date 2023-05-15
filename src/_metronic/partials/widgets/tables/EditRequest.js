import axios from '../../../../app/FetchApi/Api'
import React, {useEffect, useState} from 'react'
import {showToast} from '../../../../app/customs/CustomModel'

const EditRequest = ({setToggle, toggle}) => {
  //   const [editData, setEditData] = useState([])
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [org, setOrg] = useState([])
  const [org_name, setOrg_name] = useState('')
  const [is_active, setIs_active] = useState()

  const api = async () => {
    await axios
      .get(`/user/${toggle}/`)
      .then((Response) => {
        // setEditData(Response?.data?.data)
        // console.log('User', Response?.data?.data)
        setIs_active(Response?.data?.data?.is_active)
        setFirst_name(Response.data.data.first_name)
        setLast_name(Response.data.data.last_name)
        setEmail(Response.data.data.email)
        // setOrg(Response.data.data.org)
        setOrg_name(Response.data.data.org_names)
        setIs_active(Response.data.data.is_active)
      })
      .catch((error) => {
        console.log(error)
      })

    //Fecthing Org names
    await axios
      .get('/organization/')
      .then((Response) => {
        setOrg(Response.data.data)
      })
      .catch((Error) => {
        console.log(Error)
      })
  }

  useEffect(() => {
    api()
  }, [])

  //Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const orgId = org.find((item) => item?.name == org_name)
    const EditedUser = {
      first_name,
      last_name,
      email,
      org: orgId?.id,
      org_name: orgId?.name,
      is_active: is_active,
    }

    console.log('body', EditedUser)

    axios
      .patch(`/user/${toggle}/`, EditedUser)
      .then((Response) => {
        setToggle(0)
        showToast.success('User Edited!')
      })
      .catch((error) => {
        showToast.error(error)
      })
  }

  return (
    <div className='w-50 mx-auto p-10 shadow  mb-5 bg-body rounded'>
      <br />
      <div className='d-flex flex-wrap justify-content-between align-items-center'>
        <h2 className='text-primary'>Edit user </h2>
        <div
          className={`${
            !is_active ? 'btn bg-danger  text-danger' : 'btn bg-success  text-success'
          }   bg-opacity-10 fw-bold fs-5 py-2`}
          onClick={() => setIs_active(!is_active)}
          data-toggle='tooltip'
          data-placement='left'
          title={is_active ? 'Click to deactivate ' : 'Click to activate'}
        >
          {is_active ? 'Active' : 'Deactive'}
        </div>
      </div>
      <div className='form-floating mb-7'>
        <p className='text-muted'>
          Fields marked with <span className='text-danger'>*</span> are required.
        </p>
      </div>

      <form  onSubmit={handleSubmit}>
        <div className='form-floating mb-7'>
          <input
            type='text'
            className='form-control form-control-solid bg-light'
            id='floatingInput1'
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
            required
            pattern='\S(.*\S)?'
          />
          <label htmlFor='floatingInput1'>
            First Name<span className='text-danger'>*</span>
          </label>
        </div>
        <div className='form-floating mb-7'>
          <input
            type='text'
            className='form-control form-control-solid bg-light'
            id='floatingInput1'
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
          ></input>
          <label htmlFor='floatingInput1'>Last Name</label>
        </div>
        <div className='form-floating mb-7'>
          <input
            type='email'
            className='form-control form-control-solid bg-light'
            id='floatingInput1'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern='\S(.*\S)?'
          ></input>
          <label htmlFor='floatingInput1'>
            Email<span className='text-danger'>*</span>
          </label>
        </div>

        {/* dropdown */}
        {/* Drop Down */}
        <div className='form-floating mb-7'>
          <select
            className='form-select form-select-solid bg-light cursor-pointer'
            id='floatingSelect1'
            aria-label='Floating label select example'
            onChange={(e) => setOrg_name(e.target.value)}
            value={org_name}
            required
            pattern='\S(.*\S)?'
          >
            <option value={''}>select</option>
            {org.map((item) => (
              <option key={item.id} value={item?.name}>
                {item.name}
              </option>
            ))}
          </select>
          <label htmlFor='floatingSelect1'>
            Organization name<span className='text-danger'>*</span>
          </label>
        </div>

        <div className='col-md-12 text-center d-flex gap-10'>
          <button className='btn btn-sl fw-bold btn-success w-20 mt-8'>
            Update
          </button>
          <div className='btn btn-sl fw-bold btn-dark w-20 mt-8' onClick={() => setToggle(false)}>
            Cancel
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditRequest
