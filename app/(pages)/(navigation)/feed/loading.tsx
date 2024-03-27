import { CircularProgress } from '@mui/material'
import React from 'react'

const loading = () => {
  return (
    <div className="flex flex-col mx-16 w-full">
    <h1 className="text-2xl my-5 font-bold">Feed</h1>
    <section className="w-full h-full grid grid-cols-3 gap-5">
      <div className="bg-white col-start-1 col-end-3">
      <div className="bg-white h-[200px] rounded-lg relative flex flex-col"/>
      </div>
      <div className="bg-white border rounded-lg flex-col p-5 flex gap-2"/>
      <div className='flex items-center justify-center my-5'>
        <CircularProgress size={30}/>
      </div>
    </section>
  </div>
  )
}

export default loading