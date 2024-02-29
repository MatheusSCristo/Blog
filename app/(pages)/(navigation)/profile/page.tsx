import React, { Suspense } from 'react'
import LayoutPage from './layoutPage'
import { CircularProgress } from '@mui/material'

const Profile = () => {
  return (
    
    <Suspense fallback={<div className='flex items-center justify-center w-full'><CircularProgress/></div>} >
        <LayoutPage/>
    </Suspense>
  )
}

export default Profile