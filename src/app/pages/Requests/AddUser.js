import axios from '../../FetchApi/Api'
import {useEffect, useState} from 'react'
import {CountryCode} from '../../Country/CountryCode'
import {showToast} from '../../customs/CustomModel'

const AddUser = ({goback, setShowTable}) => {
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState(CountryCode)
  const [selectedOrg, setSelectedOrg] = useState('')
  const [orgList, setOrgList] = useState([])

  //Fecthing Org admin names
  const API = async () => {
    await axios
      .get('/organization/')
      .then((Response) => {
        setOrgList(Response.data.data)
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
    console.log(selectedOrg)
    const org = orgList.find((item) => item?.id == selectedOrg.replace(/[^\d]/g, ''))
    const AddUser = {first_name, last_name, email, phone, org: org?.id}
    axios
      .post('/user/', AddUser)
      .then((Response) => {
        const result = Response.data.status
        if (result) {
          console.log(Response)
          showToast.success('User Added!')
          setShowTable(true)
          goback(false)
        } else {
          showToast.error(Response.data.message?.[0])
        }
      })
      .catch((error) => {
        console.log(error.Response.data)
      })
  }

  return (
    <div className='w-50 mx-auto p-10 shadow  mb-5 bg-body rounded'>
      <form onSubmit={handleSubmit}>
        <br />
        <h2 className='text-primary'>Add user</h2>
        <p className='text-muted'>
          Fields marked with <span className='text-danger'>*</span> are required.
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
            pattern='\S(.*\S)?'
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
            pattern='\S(.*\S)?'
          />
          <label htmlFor='floatingInput1'>
            Email <span className='text-danger'>*</span>
          </label>
        </div>

        <div className='form-floating mb-7'>
          <input
            type='tel'
            className='form-control form-control-solid bg-light'
            id='floatingInput1'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            maxLength={15}
            minLength={10}
            pattern="[+0-9]{2}[0-9]{10}"
          />
          <label htmlFor='floatingInput1'>
            Phone no. <span className='text-danger'>*</span>
          </label>
        </div>

        {/* Drop Down */}
        <div className='form-floating mb-7'>
          <select
            className='form-select form-select-solid cursor-pointer bg-light'
            id='floatingSelect1'
            aria-label='Floating label select example'
            onChange={(e) => setSelectedOrg(e.target.value)}
            value={selectedOrg}
            required
            pattern='\S(.*\S)?'
          >
            <option value={''} dselected disabled hidden>
              Select Organization
            </option>
            {orgList.map((item) => (
              <option key={item.id} value={item?.id}>
                {`${item.name} (ID: ${item.id})`}
              </option>
            ))}
          </select>
          <label htmlFor='floatingSelect1'>
            Select Organization<span className='text-danger'>*</span>
          </label>
        </div>

        <div className='col-md-12 text-center d-flex gap-10'>
          <button className='btn btn-sl fw-bold btn-success w-20 mt-8' type='sumbit'>
            Add
          </button>
          <div className='btn btn-sl fw-bold btn-dark w-20 mt-8' onClick={() => goback(false)}>
            Cancel
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddUser
