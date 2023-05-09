import axios from '../../FetchApi/Api'
import {useEffect, useState} from 'react'
import {showToast} from '../../customs/CustomModel'

const UpdateOAadmin = ({id, goback}) => {
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [is_active, setIs_active] = useState(null)
  const [org_name, setOrg_name] = useState([])

  const api = async () => {
    await axios
      .get(`/orgadminlist/${id}/`)
      .then((Response) => {
        setFirst_name(Response?.data?.first_name)
        setLast_name(Response?.data?.last_name)
        setPhone(Response?.data?.phone)
        setEmail(Response?.data?.email)
        setIs_active(Response?.data?.is_active)
        setOrg_name(Response?.data?.org_name)

        console.log('orgAdmin', Response?.data)
      })
      .catch((Error) => {
        console.log(Error)
      })
  }

  useEffect(() => {
    api()
  }, [])

  // update org_name
  const updateorg_name = (i) => {
    const updatedorg_name = org_name?.filter((item, index) => index !== i)
    setOrg_name(updatedorg_name)
  }

  //Handling the form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const UpdatedAdmin = {
      first_name,
      last_name,
      phone,
      email,
      is_active,
      org_name,
    }

    console.log('Updated array', UpdatedAdmin)

    axios
      .patch(`/orgadminlist/${id}/`, UpdatedAdmin)
      .then((Response) => {
        showToast.success('Organization Admin Updated!')
        goback()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='w-50 mx-auto p-10 shadow  mb-5 bg-body rounded'>
      {/* <!--begin::Input group--> */}
      {/* <h2>Update superAdmin</h2> */}
      <form onSubmit={handleSubmit}>
        <br />
        <div className='d-flex flex-wrap justify-content-between align-items-center'>
          <h2 className='text-primary'>Edit organization admin</h2>

          <div
            className={`${
              !is_active ? 'btn bg-danger  text-danger' : 'btn bg-success  text-success'
            }   bg-opacity-10 fw-bold fs-5 py-2`}
            onClick={() => setIs_active(!is_active)}
            data-toggle='tooltip'
            data-placement='left'
            title={is_active ? 'Click to deactivate ' : 'Click to activate'}
          >
            {is_active ? 'Activate' : 'Deactivate'}
          </div>
        </div>
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
            pattern='\S(.*\S)?'
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
            pattern='[+]{1}[0-9]{1}[0-9]{10}'
            title='eg. +1XXXXXXXXXX'
          />
        </div>

        <div>
          <div className='mb-7 fw-bold text-gray-800 fs-5'>Organizations assigned</div>
          {org_name?.length ? (
            <div className='d-flex align-items-center gap-5 flex-wrap justify-content-center'>
              {org_name?.map((i, index) => (
                <div
                  key={index}
                  className={`d-flex gap-3 align-items-center fw-bold px-5 py-2 rounded text-gray-900 bg-hover-dark text-hover-danger bg-${
                    index % 2 == 0 ? 'primary' : 'success'
                  }`}
                >
                  <div>{i}</div>
                  <div
                    data-toggle='tooltip'
                    data-placement='left'
                    title='Remove Organization'
                    className='bi bi-x-lg text-white text-hover-danger'
                    onClick={() => updateorg_name(index)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className='text-gray-700 fw-bold text-center'> No organization assigned</div>
          )}
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

export default UpdateOAadmin
