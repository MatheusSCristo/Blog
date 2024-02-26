import React, { Suspense } from 'react'
import LoadingComponents from '../components/loadingComponents'
import LayoutPage from './layoutPage'

const Profile = () => {
  return (
    
    <Suspense fallback={<div className='flex items-center justify-center w-full'><LoadingComponents/></div>} >
        <LayoutPage/>
    </Suspense>
  )
}

export default Profile