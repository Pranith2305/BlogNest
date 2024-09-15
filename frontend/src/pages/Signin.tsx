import React from 'react'
import Auth from '../components/Auth'
import Quote from '../components/Quote';
const Signin = () => {
  return (
    <div className='h-screen flex'>
      {/* Left side: Signup form */} 
      <div className='w-1/2 flex items-center justify-center bg-gray-100'>
        <Auth type='signin' />
      </div>

      {/* Right side: Quote */}
      <div className='w-1/2 flex items-center justify-center bg-blue-500 text-white'>
        <Quote />
      </div>
    </div>
  );
}


export default Signin