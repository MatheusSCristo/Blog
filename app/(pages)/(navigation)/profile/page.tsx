import React, { Suspense } from 'react'
import LoadingComponents from '../components/loadingComponents'
import LayoutPage from './layoutPage'

const Profile = () => {
  return (
    
    <Suspense fallback={<LoadingComponents/>} >
        <LayoutPage/>
    </Suspense>
  )
}

export default Profile