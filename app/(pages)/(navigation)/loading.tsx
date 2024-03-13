import { CircularProgress } from '@mui/material'
import React from 'react'

const loading = () => {
  return (
    <div className='flex justify-center items-center h-full w-full'>
        <CircularProgress/>
    </div>
  )
}

export default loading