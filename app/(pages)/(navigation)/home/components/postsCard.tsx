'use client'
import revalidateAllData from '@/utils/revalidateData';
import React, {  useEffect, useState } from 'react'
import { CiChat1 } from "react-icons/ci"
import { IoHeartCircle, IoTrashBinOutline } from "react-icons/io5";
import CommentModal from './commentModal';
import { Post } from '@/types/types';

const PostsCard = ({ post, userId,isAuthor }: { post: Post, userId: string,isAuthor:boolean }) => {
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(post.likes.length)
    const [commentIsOpen, setCommentIsOpen] = useState(false)
    useEffect(() => {
        post.likes.map((e: { userId: string, postId: string }) => {
            if (e.userId === userId) {
                setLiked(true)
            }
        })
    }, [post.likes, userId])



    const getPostedTime = (time: Date | undefined | string) => {
        if (time) {
            const date = Date.now()
            let res = 0
            if (time instanceof Date) {
                res = ((date - time.getTime()) / 60000)
            }
            else {
                res = (date - Date.parse(time)) / 60000
            }
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
        if (liked) {
            setLikes((prevState: number) => prevState - 1)
        }
        else {
            setLikes((prevState: number) => prevState + 1)
        }
        setLiked((prevState) => !prevState)
        await fetch('/api/likePost', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId, userId })
        }).
            then(() => {
                revalidateAllData()
            })
    }

    const handleDeletePost = async () => {
        if (isAuthor) {
            await fetch('/api/deletePost', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ postId: post.id })
            })
            revalidateAllData()
        }

    }


    return (
        <div className='bg-white mt-8 min-h-[200px] rounded-lg border border-black m-10' >
            <div className='flex p-5 items-center mx-5 justify-between'>
                <div className='flex gap-5 items-center'>
                    <h1 className='text-xl font-bold'>{post.author?.displayName}</h1>
                    <h2 className='text-lg text-lightGray'>@{post.author?.username}</h2>
                    <span>- Postado {getPostedTime(post?.createAt)} </span>
                </div>
               {isAuthor && <IoTrashBinOutline size={30} className='cursor-pointer hover:scale-105' onClick={handleDeletePost}/>}
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
                <div className='flex gap-2 items-center text-lightGray' >
                    <CiChat1 size={30} className='hover:scale-[1.15]' onClick={() => setCommentIsOpen((prevState) => !prevState)} />
                    <span >{post?.comments.length}</span>
                </div>
            </div>
            {
                commentIsOpen &&
                <CommentModal comments={post?.comments} postId={post.id} />
            }
        </div>
    )
}

export default PostsCard