import React from 'react'
import GenderCheckbox from './GenderCheckbox'

function SignUp() {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg
      bg-opacity-0'>
        <h1 className='text-3xl font-bold text-center text-gray-300'>Sign Up
          <span classname='text-blue-500'> chatapp</span>

        </h1>
        <form>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-200'>Full Name</span>
            </label>
            <input type='text' placeholder='HIMANSHI' className='w-full input input-bordered h-10 ' />

          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-200'>Username</span>
            </label>
            <input type='text' placeholder='HIMANSHI' className='w-full input input-bordered h-10 ' />

          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-200'>Password</span>
            </label>
            <input type='password' placeholder=' Enter password ' className='w-full input input-bordered h-10 ' />

          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-200'>Confirm Password</span>
            </label>
            <input type='password' placeholder=' Confirm Password' className='w-full input input-bordered h-10 ' />

          </div>
          {/* gender checkbox here*/}
          <GenderCheckbox />
          <a href='#' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
         Already have an account?
         </a>
         <div>
            <button className='btn btn-block btn-sm mt-2'>Sign Up</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default SignUp
