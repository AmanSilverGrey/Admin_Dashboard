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
import {showToast} from '../../../customs/CustomModel'

const Login = () => {
  const navigate = useNavigate()
  const [phone, setPhone] = useState(CountryCode)
  const [OTP, setOTP] = useState('')
  const [expandForm, setExpandForm] = useState(false)
  const {setCurrentUser} = useAuth()
  const [isloading, setisLoading] = useState(false)
  const [sendOTP, setSendOTP] = useState(false)

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

    // if (
    //   phone == +918319659467
    // ) {
    //   // navigate('/requests')
    //   gererateRecaptcha()
    //   let appVerifier = window.recaptchaVerifier
    //   signInWithPhoneNumber(auth, phone, appVerifier)
    //     .then((confirmationResult) => {
    //       window.confirmationResult = confirmationResult
    //       setExpandForm(true)
    //       const Developers = 'devNum'
    //       localStorage.setItem('Developers', JSON.stringify(Developers))
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //
    //     })
    // }
    // else {
    axios
      .post('/login/', {phone})
      .then((Response) => {
        if (Response.data.data) {
          const UserDetail = Response.data.data

          //There are few changes in this file after deployment

          if (UserDetail?.type == 'SA' || UserDetail?.type == 'OA') {
            console.log(UserDetail)
            localStorage.setItem('User-Details', JSON.stringify(UserDetail))
            setSendOTP(true)
            gererateRecaptcha()
            let appVerifier = window.recaptchaVerifier
            signInWithPhoneNumber(auth, phone, appVerifier)
              .then((confirmationResult) => {
                window.confirmationResult = confirmationResult
                setExpandForm(true)
              })
              .catch((error) => {
                console.log(error)
                showToast.error(error.message)
              })
          } else {
            showToast.error('You are not eligibile')
          }
        } else {
          showToast.error(Response.data.message?.[0])
        }
      })
      .catch((error) => {
        console.log(error.response.data)
      })
    // }
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
          // const user = result.user
          const userDetails = localStorage.getItem('User-Details')
          const user = {
            ...result.user,
            ...JSON.parse(userDetails),
          }
          console.log(user)
          setCurrentUser(user)
          localStorage.setItem('user', JSON.stringify(user))
          // console.log(user)
          navigate('/requests')
        })
        .catch((error) => {
          setisLoading(false)
          console.log(error.message)
          showToast.error(error.message)
        })
    }
  }

  return (
    <>
      {!isloading && (
        <div className='formContainer p-20 shadow-lg p-3 mb-5 bg-body rounded'>
          <form onSubmit={requestOTP}>
            <div className='text-center mb-11'>
              <h1 className='text-dark fw-bolder mb-3'>Log In</h1>
              <div className='text-gray-500 fw-semibold fs-6'>To your asc account</div>
            </div>

            <p className='text-gray-500 fw-semibold fs-7'>Please login with your phone number</p>
            <div className='form-outline mb-4'>
              {/* <label htmlFor='phonenumberinput' className='form-label fw-bolder text-dark fs-6'>
                Phone number
              </label> */}

              <input
                type='tel'
                className='form-control bg-light'
                id='phoneNumberInput'
                value={phone}
                maxLength={15}
                minLength={10}
                onChange={(e) => setPhone(e.target.value)}
                pattern='[+]{1}[0-9]{2}[0-9]{10}'
              />
            </div>
            {expandForm && (
              <div className='form-outline mb-4'>
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
            {!expandForm && !sendOTP && (
              <div className='text-center pt- mb-5 pb-1'>
                <button type='submit' className='btn btn-primary mb-3'>
                  Request OTP
                </button>
              </div>
              // btn btn-primary mx-auto fs-small
            )}

            {!expandForm && sendOTP && (
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
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
