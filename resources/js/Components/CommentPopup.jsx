import React from 'react'

export default function CommentPopup({ postId }) {
    return (
        <>
            <div className='fixed z-40 bg-black/40 w-screen h-screen backdrop-blur-sm'></div>
            <div className='fixed z-50 translate-x-1/2 translate-y-1/2 top-0 left-0 text-red-600 bg-black/60 h-1/2 w-1/2'>
                Popup component 
            </div>
        </>
    )
}
