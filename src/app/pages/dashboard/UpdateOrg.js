import axios from '../../FetchApi/Api'
import {useEffect, useState} from 'react'
import {showToast} from '../../customs/CustomModel'

const UpdateOrg = ({id, goback}) => {
  const [name, setName] = useState('')
  const [primary_name, setPrimary_name] = useState('')
  const [primary_title, setPrimay_title] = useState('')
  // const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [owner, setOwner] = useState('')
  const [note, setNote] = useState('')
  const [oAname, setOAname] = useState([])
  const [status, setStatus] = useState('')

  const api = async () => {
    await axios
      .get(`/organization/${id}/`)
      .then((Response) => {
        setName(Response.data.name)
        setPrimary_name(Response.data.primary_name)
        setPrimay_title(Response.data.primary_title)
        // setPhone(Response.data.phone)
        setEmail(Response.data.email)
        setAddress(Response.data.address)
        setCity(Response.data.city)
        setState(Response.data.state)
        setZip(Response.data.zip)
        setOwner(Response.data.owner)
        setNote(Response.data.note)
        setStatus(Response.data.status)

        console.log(Response.data)
      })
      .catch((Error) => {
        console.log(Error)
      })
    await axios
      .get('/orgadminlist/')
      .then((Response) => {
        setOAname(Response.data.data)
        // const name = oAname.find((item) => item.id == owner)

        // console.log(ownerName)
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

    const UpdatedOrg = {
      name,
      primary_name,
      primary_title,
      // phone,
      email,
      address,
      city,
      state,
      zip,
      owner,
      note,
      status,
    }

    axios
      .patch(`/organization/${id}/`, UpdatedOrg)
      .then((Response) => {
        showToast.success('Organization Updated!')
        goback()
      })
      .catch((error) => {
        showToast.error(error.message)
      })
  }

  return (
    <div className='w-50 mx-auto p-10 shadow  mb-5 bg-body rounded'>
      {/* <!--begin::Input group--> */}
      <br />
      <div className='d-flex justify-content-between'>
        <h2 className='text-primary'>Update Organization</h2>
        <div
          className={`${
            !status ? 'btn bg-danger  text-danger' : 'btn bg-success  text-success'
          }   bg-opacity-10 fw-bold fs-5 py-2`}
          onClick={() => setStatus(!status)}
          data-toggle='tooltip'
          data-placement='left'
          title={status ? 'Click to deactivate ' : 'Click to activate'}
        >
          {status ?  'Active': 'Deactive'}
        </div>
      </div>
      <div className='form-floating mb-7'>
        <p className='text-muted'>
          Fields marked with <span className='text-danger'>*</span> are required.
        </p>
      </div>

      <div className='form-floating mb-7'>
        <input
          type='text'
          className='form-control form-control-solid bg-light'
          id='floatingInput1'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          pattern='\S(.*\S)?'
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
          value={primary_name}
          onChange={(e) => setPrimary_name(e.target.value)}
          required
          pattern='\S(.*\S)?'
        />
        <label htmlFor='floatingInput1'>
          Primary name <span className='text-danger'>*</span>
        </label>
      </div>
      <div className='form-floating mb-7'>
        <input
          type='text'
          className='form-control form-control-solid bg-light'
          id='floatingInput1'
          value={primary_title}
          onChange={(e) => setPrimay_title(e.target.value)}
          required
          pattern='\S(.*\S)?'
        />
        <label htmlFor='floatingInput1'>
          Primary title <span className='text-danger'>*</span>
        </label>
      </div>
      {/* Phone Number */}
      {/* <div className='form-floating mb-7'>
        <input
          type='number'
          className='form-control form-control-solid bg-light'
          id='floatingInput1'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor='floatingInput1'>Phone no.</label>
      </div> */}

      <div className='form-floating mb-7'>
        <input
          type='email'
          className='form-control form-control-solid bg-light'
          id='floatingInput1'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          pattern='\S(.*\S)?'
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
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          pattern='\S(.*\S)?'
        />
        <label htmlFor='floatingInput1'>
          Address <span className='text-danger'>*</span>
        </label>
      </div>
      <div className='form-floating mb-7'>
        <input
          type='text'
          className='form-control form-control-solid bg-light'
          id='floatingInput1'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          pattern='\S(.*\S)?'
        />
        <label htmlFor='floatingInput1'>
          City<span className='text-danger'>*</span>
        </label>
      </div>
      <div className='form-floating mb-7'>
        <input
          type='text'
          className='form-control form-control-solid bg-light'
          id='floatingInput1'
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          pattern='\S(.*\S)?'
        />
        <label htmlFor='floatingInput1'>
          State<span className='text-danger'>*</span>
        </label>
      </div>
      <div className='form-floating mb-7'>
        <input
          type='number'
          className='form-control form-control-solid bg-light'
          id='floatingInput1'
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          required
          pattern='\S(.*\S)?'
        />
        <label htmlFor='floatingInput1'>
          Zip<span className='text-danger'>*</span>
        </label>
      </div>
      {/* DropDown */}
      <div className='form-floating mb-7'>
        <select
          className='form-select form-select-solid bg-light'
          id='floatingSelect1'
          aria-label='Floating label select example'
          onChange={(e) => setOwner(e.target.value)}
          value={owner}
          required
          pattern='\S(.*\S)?'
        >
          <option value={''} dselected disabled hidden>
            Select Owner
          </option>
          {oAname.map((item) => (
            <option key={item.id} value={item.id}>
              {item.first_name} {item.last_name}
            </option>
          ))}
        </select>
        <label htmlFor='floatingSelect1'>
          Owner<span className='text-danger'>*</span>
        </label>
      </div>
      {/* <!--end::Input group--> */}

      {/* <!--begin::Input group--> */}
      <div className='form-floating'>
        <textarea
          rows={10}
          className='form-control form-control-solid bg-light'
          placeholder='Leave a comment here'
          id='floatingTextarea1'
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <label htmlFor='floatingTextarea1'>Note</label>
      </div>
      <div className='col-md-12 text-center d-flex gap-10'>
        <span className='btn btn-sl fw-bold btn-success w-20 mt-8' onClick={handleSubmit}>
          Update
        </span>
        <div className='btn btn-sl fw-bold btn-dark w-20 mt-8' onClick={() => goback()}>
          Cancel
        </div>
      </div>
      {/* <!--end::Input group--> */}
    </div>
  )
}

export default UpdateOrg
