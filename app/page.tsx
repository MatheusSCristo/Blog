import React from 'react'
import { redirect } from 'next/navigation'

const index = () => {
  redirect('/feed')
}

export default index