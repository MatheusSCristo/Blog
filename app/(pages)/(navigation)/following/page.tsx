import React, { Suspense } from 'react'
import GetFollowingComp from './components/getFollowing'
import LoadingComponents from '../components/loadingComponents'
const Following = () => {
    return (
        <section className='min-h-[100vh] bg-white w-full mx-16 rounded-lg flex items-center p-12 flex-col'>
            <h1 className='text-3xl font-bold'>Quem você segue:</h1>
            <Suspense fallback={<LoadingComponents/>}>
                <GetFollowingComp />
            </Suspense>
        </section>
    )
}

export default Following