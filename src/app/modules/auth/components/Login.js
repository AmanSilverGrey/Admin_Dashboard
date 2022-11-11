import React, {useEffect, useState} from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPhoneNumber,
} from 'firebase/auth'
import {auth} from '../firebase'
import {RecaptchaVerifier} from 'firebase/auth'

const Login = () => {
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')

  const configureCaptcha = (e) => {
    e.preventDefault()
    console.log(number)
    signInWithPhoneNumber(auth, '+918445188705', window.reCaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult
        console.log('rk OTP Sent', confirmationResult)
      })
      .catch((error) => {
        console.log('rk FB ', error)
        window.location.reload()
      })
  }

  const LogOut = () => {
    console.log('Logout working')
    signOut(auth)
    console.log(auth)
  }

  const onSubmitOTP = (e) => {
    e.preventDefault()
    const code = password
    console.log(code)
    // const code = getCodeFromUserInput()
    window.confirmationResult
      .confirm(code)
      .then((confirmationResult) => {
        // User signed in successfully.
        console.log(confirmationResult)
        const user = confirmationResult.user
        console.log(user)
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log(error.message)
      })
  }

  useEffect(() => {
    window.reCaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: function (response) {
          console.log('It works!')
          signInWithPhoneNumber(auth, '+918445188705', window.reCaptchaVerifier)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult
              console.log('rk OTP Sent', confirmationResult)
            })
            .catch((error) => {
              console.log('rk FB ', error.message)
            })
        },
      },
      auth
    )
    window.reCaptchaVerifier.render()
  }, [])

  return (
    <>
      {/* <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre> */}
      <form onSubmit={configureCaptcha} className='form w-100'>
        <div className='text-center mb-11'>
          <h2 className='text-dark fw-bolder mb-3'>Sign in</h2>
          <div className='text-gray-500 fw-semibold fs-6'>Your ASC account</div>
        </div>

        <div className='fv-row mb-8'>
          <input
            className='form-control bg-transparent'
            type='tel'
            name='number'
            placeholder='Phone Number'
            value={number}
            required
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className='d-grid mb-10 w-50 mx-auto'>
          <button className='btn btn-primary' id='sign-in-button' type='submit'>
            Submit
          </button>
        </div>
      </form>

      <button className='btn btn-primary' onClick={LogOut}>
        Log out
      </button>

      <form onSubmit={onSubmitOTP} className='form w-100'>
        <div className='text-center mb-11'>
          <h2 className='text-dark fw-bolder mb-3'>Enter OTP</h2>

          <input
            className='form-control bg-transparent'
            type='text'
            name='OTP'
            placeholder='OTP'
            // required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='d-grid mb-10 w-50 mx-auto'>
          <button className='btn btn-primary' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </>
  )
}
export default Login
