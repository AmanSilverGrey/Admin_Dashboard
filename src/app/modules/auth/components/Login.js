import axios from '../../../FetchApi/Api'
import React, {useState} from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPhoneNumber,
} from 'firebase/auth'
import {auth} from '../firebase'
import {RecaptchaVerifier} from 'firebase/auth'
import {useAuth} from '../core/Auth'
import {CountryCode} from '../../../Country/CountryCode'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [phone, setPhone] = useState(CountryCode)
  const [OTP, setOTP] = useState('')
  const [expandForm, setExpandForm] = useState(false)
  const {setCurrentUser} = useAuth()
  const [isloading, setisLoading] = useState(false)

  const gererateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (Response) => {},
      },
      auth
    )
  }

  const requestOTP = (e) => {
    e.preventDefault()

    if (
      phone == +918447037604 ||
      phone == +919926081184 ||
      phone == +919054887442 ||
      phone == +918319659467
    ) {
      const Developers = 'devNum'
      localStorage.setItem('Developers', JSON.stringify(Developers))
    } else {
      axios
        .post('/login/', {phone})
        .then((Response) => {
          if (Response.data.data) {
            const UserDetail = Response.data.data

            if (UserDetail?.type == 'SA' || UserDetail?.type == 'SA') {
              console.log(UserDetail)
              localStorage.setItem('User-Details', JSON.stringify(UserDetail))

              gererateRecaptcha()
              let appVerifier = window.recaptchaVerifier
              signInWithPhoneNumber(auth, phone, appVerifier)
                .then((confirmationResult) => {
                  window.confirmationResult = confirmationResult
                  setExpandForm(true)
                })
                .catch((error) => {
                  console.log(error)
                  alert(error.message)
                })
            } else {
              alert('You are not eligibile')
            }
          } else {
            alert(Response.data.message)
          }
        })
        .catch((error) => {
          console.log(error.response.data)
        })
    }
  }

  const verifyOTP = (e) => {
    let otp = e.target.value
    setOTP(otp)

    if (otp.length === 6) {
      setisLoading(true)
      let confirmationResult = window.confirmationResult
      confirmationResult
        .confirm(otp)
        .then((result) => {
          const user = result.user
          console.log(user)
          setCurrentUser(user)
          localStorage.setItem('user', JSON.stringify(user))
          console.log(user)
          navigate('/requests')
        })
        .catch((error) => {
          setisLoading(false)
          console.log(error.message)
        })
    }
  }

  return (
    <>
      {!isloading && (
        <div className='formContainer'>
          <form onSubmit={requestOTP}>
            <div className='text-center mb-11'>
              <h1 className='text-dark fw-bolder mb-3'>Log In</h1>
              <div className='text-gray-500 fw-semibold fs-6'>To your asc account</div>
            </div>

            <div className='mb-3'>
              <label
                htmlFor='phonenumberinput'
                className='form-label fw-bolder text-dark fs-6 mb-0'
              >
                Phone number
              </label>
              <input
                type='tel'
                className='form-control bg-transparent'
                id='phoneNumberInput'
                aria-describedby='emailHelp'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {expandForm && (
              <div className='mb-3'>
                <label htmlFor='otpInput' className='form-label'>
                  OTP
                </label>
                <input
                  type='phone'
                  className='form-control'
                  id='otpInput'
                  aria-describedby='emailHelp'
                  value={OTP}
                  onChange={verifyOTP}
                />
                <div id='otpHelp' className='form-text'>
                  Please enter the One Time Pin sent to your phone
                </div>
              </div>
            )}
            {!expandForm && (
              <button type='submit' className='btn btn-primary mx-auto'>
                Request OTP
              </button>
            )}
            <div id='recaptcha-container'></div>
          </form>
        </div>
      )}
      {isloading && (
        <h2 className='text-center mb-11 text-dark fw-bolder'>
          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          <br />
          Please wait.
        </h2>
      )}
    </>
  )
}

export default Login
