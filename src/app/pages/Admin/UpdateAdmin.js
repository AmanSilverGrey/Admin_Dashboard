import axios from '../../FetchApi/Api'
import {useEffect, useState} from 'react'
import { showToast } from '../../customs/CustomModel'


const UpdateAdmin = ({id, goback}) => {
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const api = async () => {
    await axios
      .get(`/superadminlist/${id}/`)
      .then((Response) => {
        setFirst_name(Response.data.first_name)
        setLast_name(Response.data.last_name)
        setPhone(Response.data.phone)
        setEmail(Response.data.email)
        console.log(Response.data)
      })
      .catch((Error) => {
        console.log(Error)
      })
  }

  useEffect(() => {
    api()
  }, [])

  //Handling the form submit
  const handleSubmit = (e) => {
    e.preventDefault()

    const UpdatedAdmin = {
      first_name,
      last_name,
      phone,
      email
    }
    axios
      .patch(`/superadminlist/${id}/`, UpdatedAdmin)
      .then((Response) => {
        console.log(Response.data)
        goback()
        showToast.success('Super Admin Updated!')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='w-50 mx-auto p-10 shadow  mb-5 bg-body rounded'>
      {/* <!--begin::Input group--> */}
      <br />
      <h2 className='text-primary'>Edit superAdmin</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <div className='form-floating mb-7'>
          <input
            type='text'
            className='form-control form-control-solid bg-light'
            id='floatingInput1'
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
            required
          />
          <label htmlFor='floatingInput1'>
            Name <span className='text-danger'>*</span>
          </label>
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

        <div className='form-floating mb-7'>
          <input
            type='tel'
            className='form-control form-control-solid bg-light'
            id='floatingInput1'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label htmlFor='floatingInput1'>
            Phone no. <span className='text-danger'>*</span>
          </label>
        </div>

        <div className='col-md-12 text-center d-flex gap-10'>
          <button className='btn btn-sl fw-bold btn-primary w-20 mt-8' onSubmit={handleSubmit}>
            Update
          </button>
          <div className='btn btn-sl fw-bold btn-dark w-20 mt-8' onClick={() => goback()}>
            Cancel
          </div>
        </div>
        {/* <!--end::Input group--> */}
      </form>
    </div>
  )
}

export default UpdateAdmin
