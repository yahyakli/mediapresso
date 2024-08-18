import React, { forwardRef } from 'react';
import TextInput from '@/Components/TextInput';

const CommentPopup = forwardRef(({ post }, ref) => {
    return (
        <div className='fixed z-50 top-0 left-0 text-red-600 bg-black/20 h-screen backdrop-blur-lg w-screen flex items-center justify-center'>
            <div ref={ref} className='bg-gray-100 rounded-xl w-1/2 h-1/2 overflow-hidden'>
                <div className='h-4/5'></div>
                <div className='h-1/5 w-full bg-gray-200 flex items-center'>
                    <TextInput className="flex-1"/>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CommentPopup;
