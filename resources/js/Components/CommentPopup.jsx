import React, { forwardRef } from 'react';
import TextInput from '@/Components/TextInput';
import { IoSend } from "react-icons/io5";
import { useForm } from '@inertiajs/react';

const CommentPopup = forwardRef(({ Post, onClose }, ref) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        content: "",
        post_id: Post.id,
        parent_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('post.createComment'), {
            onSuccess: () => {
                onClose(); 
                reset(); // Reset the form fields after successful submission
            },
            onError: (errors) => {
                console.log(errors); // Handle errors here
            }
        });
    };

    return (
        <div className='fixed z-50 top-0 left-0 text-red-600 bg-black/20 h-screen backdrop-blur-lg w-screen flex items-center justify-center'>
            <div ref={ref} className='bg-gray-100 rounded-xl w-1/2 h-1/2 overflow-hidden'>
                <div className='h-4/5'>
                    {/* Additional content can go here */}
                </div>
                <form onSubmit={handleSubmit} className='h-1/5 w-full bg-gray-200 flex items-center px-5 gap-6 text-black'>
                    <TextInput 
                        className="flex-1" 
                        placeholder="Enter your comment"
                        value={data.content} 
                        onChange={(e) => setData('content', e.target.value)}
                    />
                    <button type="submit" disabled={processing} className="flex items-center justify-center">
                        {processing ? (
                            <span>Loading...</span> // Show a loading text or spinner
                        ) : (
                            <IoSend className='text-3xl text-blue-400' />
                        )}
                    </button>
                </form>
                {errors.content && <p className='text-red-500 px-5'>{errors.content}</p>}
            </div>
        </div>
    );
});

export default CommentPopup;
