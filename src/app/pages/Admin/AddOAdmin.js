import {useState} from 'react'
import {CountryCode} from '../../Country/CountryCode'
import axios from '../../FetchApi/Api'

const AddOAdmin = ({Goback}) => {
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState(CountryCode)

  //Hnadling the form submit and posting it to the (database)
  const handleSubmit = (e) => {
    e.preventDefault()

    const SubmitOA = {first_name, last_name, email, phone, type: 'OA'}
    axios.post('/user/', SubmitOA).then((Response) => {
      const result = Response.data.status
      if (result) {
        alert('Admin Added!')
        Goback(false)
      } else {
        alert(Response.data.message)
      }
    })
  }

  return (
    <div className='w-50 mx-auto p-10 shadow  mb-5 bg-body rounded'>
      {/* <h2>Add Org admin dummy</h2> */}
      <form onSubmit={handleSubmit}>
        <br />
        <h2 className='text-primary'>Add organization admin</h2>
        <p className='text-muted'>
          Feilds marked with <span className='text-danger'>*</span> are required.
        </p>
        <br />
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
            First Name <span className='text-danger'>*</span>
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
            required
          />
          <label htmlFor='floatingInput1'>
            Email <span className='text-danger'>*</span>
          </label>
        </div>
        <div className='form-floating mb-7'>
          <input
            type='text'
            required
            className='form-control form-control-solid bg-light'
            id='floatingInput1'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor='floatingInput1'>
            Phone no. <span className='text-danger'>*</span>
          </label>
        </div>

        {/* Owner DropDown starts*/}

        {/* Owner DropDown ends */}

        <div className='col-md-12 text-center d-flex gap-10'>
          <button className='btn btn-sl fw-bold btn-success w-20 mt-8' onSubmit={handleSubmit}>
            Add
          </button>
          <div className='btn btn-sl fw-bold btn-dark w-20 mt-8' onClick={() => Goback(false)}>
            Cancel
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddOAdmin
