import React, { forwardRef } from 'react';
import TextInput from '@/Components/TextInput';
import { IoSend } from "react-icons/io5";
import { useForm } from '@inertiajs/react';
import { formatPostDate } from '@/helpers';

const CommentPopup = forwardRef(({ Post, onClose }, ref) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        content: "",
        post_id: Post.id,
        parent_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('post.createComment'));

        reset();
    };

    return (
        <div className='fixed z-50 top-0 left-0 bg-black/20 h-screen backdrop-blur-lg w-screen flex items-center justify-center'>
            <div ref={ref} className='bg-gray-100 rounded-xl w-1/2 h-2/3 overflow-hidden'>
                <div className='text-2xl h-1/6 border-b-gray-300 border-b flex items-center justify-center mx-5'>
                    All Comments
                </div>
                <div className='h-4/6 overflow-y-scroll'>
                    {Post.comments && Post.comments.map((comment) => {
                        return (
                            <div className='my-4 mx-2 bg-slate-200 px-4 py-2 rounded-2xl'>
                                <div className='border-b-gray-300 border-b py-2 flex items-center justify-between w-full text-lg'>
                                    <p>{comment.user.username}</p>
                                    <p>{formatPostDate(comment.created_at)}</p>
                                </div>
                                <div className='py-4'>
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <form onSubmit={handleSubmit} className='h-1/6 w-full bg-gray-200 flex items-center px-5 gap-6'>
                    <TextInput 
                        className="flex-1" 
                        placeholder="Enter your comment"
                        value={data.content} // Bind the value to the form state
                        onChange={(e) => setData('content', e.target.value)}
                    />
                    <button type="submit" disabled={processing}>
                        <IoSend className='text-3xl text-blue-400' />
                    </button>
                </form>
            </div>
        </div>
    );
});

export default CommentPopup;
