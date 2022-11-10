import React, {  useState} from 'react'
import { firebase } from '../firebase';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
//New from previus login template
import clsx from 'clsx'
import {useFormik} from 'formik'
import {getUserByToken, login} from '../core/_requests'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useAuth} from '../core/Auth'

//for demo purpose
const initialValues = {
  phno: '8319659467',
  
}


const Login = () => {
  const [phoneNo, setPhoneNo] = useState('')
  const [uniqueCode, setUniqueCode] = useState('')
// from previous template
const [loading, setLoading] = useState(false)
const {saveAuth, setCurrentUser} = useAuth()
 

  const configureCaptcha = (e) => {
    alert("form submit")
    e.preventDefault()
    const auth = getAuth();
    console.log(auth);
    console.log("Aut runs");
    window.recaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit()
          console.log("Recapctha Verified");
        },
      },
      auth
    )
  }

  const onSignInSubmit = () => {
    console.log("hello onsignruns ");
    const phoneNumber = '91' + phoneNo
    console.log(phoneNumber);
    // const phoneNumber = getPhoneNumberFromUserInput()
    const appVerifier = window.recaptchaVerifier
    
    const auth = getAuth()
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      })
  }

  const onSubmitOTP = (e) => {
    e.preventDefault()
    const code = uniqueCode;
    // const code = getCodeFromUserInput()
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      })
  }

  return (
    <>
      <form onSubmit={configureCaptcha} className='form w-100'>
        <div id='sign-in-button' className='text-center mb-11'>
          <h2 className='text-dark fw-bolder mb-3'>Sign in</h2>
          <div className='text-gray-500 fw-semibold fs-6'>Your ASC account</div>
        </div>

        <div className='fv-row mb-8'>
          <input
            className='form-control bg-transparent'
            type='tel'
            name='number'
            placeholder='Phone Number'
            value={phoneNo}
            required
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </div>
        <div className='d-grid mb-10 w-50 mx-auto'>
          <button className='btn btn-primary' type='submit'>
            Submit
          </button>
        </div>
      </form>

      <form onSubmit={onSubmitOTP} className='form w-100'>
        <div className='text-center mb-11'>
          <h2 className='text-dark fw-bolder mb-3'>Enter OTP</h2>

          <input
            className='form-control bg-transparent'
            type='tel'
            name='OTP'
            placeholder='OTP'
            required
            value={uniqueCode}
            onChange={(e) => setUniqueCode(e.target.value)}
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
