import axios from '../../FetchApi/Api'
import React, {useEffect, useState} from 'react'

const AddOrg = () => {
  const [name, setName] = useState('')
  const [primary_name, setPrimary_name] = useState('')
  const [primary_title, setPrimay_title] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [owner, setOwner] = useState('')
  const [note, setNote] = useState('')
  const [oAname, setOAname] = useState([])

  //Fecthing Org admin names
  const API = async () => {
    await axios
      .get('/orgadminlist/')
      .then((Response) => {
        setOAname(Response.data.data)
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

    const addedOrg = {
      name,
      primary_name,
      primary_title,
      phone,
      email,
      address,
      city,
      state,
      zip,
      owner,
      note,
    }

    axios
      .post('/organization/', addedOrg)
      .then((Response) => {
        console.log(Response.data)
        alert('Organization Added!')
      })
      .catch((error) => {
        console.log(error)
        alert(Response.data)
        console.log(error.data);
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <!--begin::Input group--> */}
        <div className='form-floating mb-7'>
          <input
            type='text'
            className='form-control form-control-solid bg-white'
            id='floatingInput1'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor='floatingInput1'>Name</label>
        </div>

        <div className='form-floating mb-7'>
          <input
            type='text'
            className='form-control form-control-solid bg-white'
            id='floatingInput1'
            value={primary_name}
            onChange={(e) => setPrimary_name(e.target.value)}
            required
          />
          <label htmlFor='floatingInput1'>Primary name</label>
        </div>

        <div className='form-floating mb-7'>
          <input
            type='text'
            className='form-control form-control-solid bg-white'
            id='floatingInput1'
            value={primary_title}
            onChange={(e) => setPrimay_title(e.target.value)}
            required
          />
          <label htmlFor='floatingInput1'>Primary title</label>
        </div>

        <div className='form-floating mb-7'>
          <input
            type='number'
            className='form-control form-control-solid bg-white'
            id='floatingInput1'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label htmlFor='floatingInput1'>Phone no.</label>
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <label htmlFor='floatingInput1'>Address</label>
        </div>

        <div className='form-floating mb-7'>
          <input
            type='text'
            className='form-control form-control-solid bg-white'
            id='floatingInput1'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <label htmlFor='floatingInput1'>City</label>
        </div>

        <div className='form-floating mb-7'>
          <input
            type='text'
            className='form-control form-control-solid bg-white'
            id='floatingInput1'
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
          <label htmlFor='floatingInput1'>State</label>
        </div>

        <div className='form-floating mb-7'>
          <input
            type='number'
            className='form-control form-control-solid bg-white'
            id='floatingInput1'
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
          />
          <label htmlFor='floatingInput1'>Zip</label>
        </div>

        {/* Drop Down */}
        <div className='form-floating mb-7'>
          <select
            className='form-select form-select-solid bg-white cursor-pointer'
            id='floatingSelect1'
            aria-label='Floating label select example'
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            // required
          >
            <option defaultValue>{}</option>
            {oAname.map((item) => (
              <option key={item.id} >
                {item.first_name} {item.last_name}
              </option>
            ))}
          </select>
          <label htmlFor='floatingSelect1'>Owner</label>
        </div>

        {/* Note */}
        <div className='form-floating'>
          <textarea
            className='form-control form-control-solid bg-white'
            placeholder='Leave a comment here'
            id='floatingTextarea1'
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
          <label htmlFor='floatingTextarea1'>Note</label>
        </div>

        <div className='col-md-12 text-center'>
          <button className='btn btn-sl fw-bold btn-primary w-20 mt-8' onSubmit={handleSubmit}>
            Add
          </button>
        </div>

      </form>
      {/* <!--end::Input group--> */}
    </div>
  )
}

export default AddOrg
