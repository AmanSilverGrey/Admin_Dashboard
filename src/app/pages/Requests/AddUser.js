import axios from '../../FetchApi/Api'
import {useEffect, useState} from 'react'

const AddUser = () => {
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [org, setOrg] = useState('')
  const [orgName, setOrgName] = useState([])

  //Fecthing Org admin names
  const API = async () => {
    await axios
      .get('/organization/')
      .then((Response) => {
        setOrgName(Response.data.data)
      })
      .catch((Error) => {
        console.log(Error)
      })
  }

  useEffect(() => {
    API()
  }, [])

  //Hnadling the form submit and posting it to the jason(database)
  const handleSubmit = (e) => {
    e.preventDefault()

    const AddUser = {first_name, last_name, email, phone, org}

    axios
      .post('/user/', AddUser)
      .then((Response) => {
        console.log(Response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <div className='form-floating mb-7'>
        <input
          type='text'
          className='form-control form-control-solid bg-white'
          id='floatingInput1'
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
          required
        />
        <label htmlFor='floatingInput1'>First Name</label>
      </div>

      <div className='form-floating mb-7'>
        <input
          type='text'
          className='form-control form-control-solid bg-white'
          id='floatingInput1'
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
        />
        <label htmlFor='floatingInput1'>Last Name</label>
      </div>

      <div className='form-floating mb-7'>
        <input
          type='email'
          className='form-control form-control-solid bg-white'
          id='floatingInput1'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor='floatingInput1'>Email</label>
      </div>

      <div className='form-floating mb-7'>
        <input
          type='text'
          className='form-control form-control-solid bg-white'
          id='floatingInput1'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <label htmlFor='floatingInput1'>Phone no.</label>
      </div>

      {/* Drop Down */}
      <div className='form-floating mb-7'>
        <select
          className='form-select form-select-solid bg-white cursor-pointer'
          id='floatingSelect1'
          aria-label='Floating label select example'
          onChange={(e) => setOrg(e.target.value)}
          required
        >
          <option defaultValue>{}</option>
          {orgName.map((item) => (
            <option key={item.id} value={org}>
              {item.name}
            </option>
          ))}
        </select>
        <label htmlFor='floatingSelect1'>Organization name</label>
      </div>

      <div className='col-md-12 text-center'>
        <span className='btn btn-sm fw-bold btn-primary' onClick={handleSubmit}>
          Add
        </span>
      </div>
    </div>
  )
}

export default AddUser
