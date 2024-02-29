'use client'
import React, { Suspense } from 'react'
import LoadingComponents from '../../components/loadingComponents'
import LayoutPage from './layoutPage'

const Profile = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<LoadingComponents/>}>
        <LayoutPage params={params}/>
    </Suspense>
  )
}

export default Profile