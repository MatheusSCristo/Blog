'use client'
import { AuthorType, postCardParamsT } from '@/types/types';
import React, { useEffect, useState } from 'react'
import { CiChat1, CiBookmarkPlus, CiBookmarkCheck } from "react-icons/ci"

import { IoHeartCircle } from "react-icons/io5";

const PostsCard = ({ post, userId }: postCardParamsT) => {
    const [likes, setLikes] = useState(0)
    const [author, setAuthor] = useState<AuthorType | null>()
    const [liked, setLiked] = useState(false)


    useEffect(() => {
        getAuthor(post?.authorId)
        getLikes()
    }, [])

    const getPostedTime = (time: string | undefined) => {
        if (time) {
            const date = Date.now()
            const res = ((date - Date.parse(time)) / 60000)
            if (res.toFixed(0) === '0') {
                return 'agora mesmo.'
            }
            else if (res.toFixed(0) === '1') {
                return '1 minuto atrás'
            }
            else if (res >= 1 && res < 60) {
                return `${res.toFixed(0)} minutos atrás.`
            }
            else if (res > 60 && res < 1440) {
                return `${(res / 60).toFixed(0)} horas atrás.`
            }
            else if (res > 1440 && res < 2880) {
                return '1 dia atrás.'
            }
            else {
                return `${(res / 1440).toFixed(0)} dias atrás.`
            }
        }

    }
    const handleOnClickLikeButton = async (postId: string | undefined) => {
        setLiked((prevState) => !prevState)
        await fetch('/api/likePost', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId, userId })
        })

        getLikes()
    }

    const getAuthor = async (authorId: string | undefined) => {
        const data = await fetch('api/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: authorId })
        })
        const user = await data.json()
        setAuthor(user.data)
    }


    const getLikes = async () => {
        const data = await fetch('api/likePost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId: post?.id, userId })
        })
        const likes = await data.json()
        setLikes(likes.data.likes.length)
        if (likes.data.likedByUser) {
            setLiked(true)
        }

    }

    return (
        <div className='bg-white mt-8 min-h-[200px] rounded-lg' >
            <div className='flex p-5 gap-5 items-center mx-5'>
                <h1 className='text-xl font-bold'>{author?.displayName}</h1>
                <h2 className='text-lg text-lightGray'>@{author?.username}</h2>
                <span>- Postado {getPostedTime(post?.createAt)} </span>
            </div>
            <div className='flex flex-col p-5 mx-5 gap-2'>
                <h1 className='text-2xl font-bold'>{post?.title}</h1>
                <p className='ml-4'> {post?.content}</p>
            </div>
            <div className='flex gap-10 mx-5 p-5 text-lightGray items-center'>
                <div className='flex gap-2 items-center text-lightGray' onClick={() => handleOnClickLikeButton(post?.id)}>
                    <IoHeartCircle size={30} className={`hover:scale-[1.15] hover:text-red ${liked ? 'text-red' : 'text-lightGray'}`} />
                    <span>{likes}</span>
                </div>
                {/* <div className='flex gap-2 items-center text-lightGray'>
                    <CiChat1 size={30} className='hover:scale-[1.15]' />
                    <span >{post?.comments.length}</span>
                </div> */}
                {/* <div className='flex gap-2 items-center text-lightGray'>
                    <CiBookmarkPlus size={30} className='hover:scale-[1.15]' />
                    <span>{post?.saved}</span>
                </div> */}
            </div>
        </div>
    )
}

export default PostsCard