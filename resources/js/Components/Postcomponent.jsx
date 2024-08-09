import React, { useEffect, useRef } from 'react';
import UserAvatar from './UserAvatar';
import { formatPostDate } from '@/helpers';

export default function PostComponent({ post, user }) {
    const carouselRef = useRef(null);

    useEffect(() => {
        const carousel = carouselRef.current;

        if (!carousel) return;

        const items = carousel.querySelectorAll('[data-carousel-item]');
        const buttons = carousel.querySelectorAll('[data-carousel-slide-to]');
        const prevButton = carousel.querySelector('[data-carousel-prev]');
        const nextButton = carousel.querySelector('[data-carousel-next]');

        if (!prevButton || !nextButton) return;

        let currentIndex = 0;
        let previousIndex = 0;

        const showSlide = (index) => {
            items.forEach((item, i) => {
                if (i === index) {
                    item.classList.remove('hidden');
                    item.style.transform = `translateX(${previousIndex < index ? '100%' : '-100%'})`;
                    setTimeout(() => {
                        item.style.transition = 'transform 0.5s ease-in-out';
                        item.style.transform = 'translateX(0)';
                    }, 10);
                } else if (i === previousIndex) {
                    item.style.transition = 'transform 0.5s ease-in-out';
                    item.style.transform = `translateX(${previousIndex < index ? '-100%' : '100%'})`;
                    setTimeout(() => {
                        item.classList.add('hidden');
                        item.style.transition = '';
                    }, 500);
                } else {
                    item.classList.add('hidden');
                    item.style.transform = 'translateX(0)';
                }
            });
            buttons.forEach((button, i) => {
                button.classList.toggle('bg-blue-600', i === index);
                button.classList.toggle('bg-white', i !== index);
            });
            previousIndex = index;
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % items.length;
            showSlide(currentIndex);
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            showSlide(currentIndex);
        };

        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                showSlide(index);
                currentIndex = index;
            });
        });

        return () => {
            nextButton.removeEventListener('click', nextSlide);
            prevButton.removeEventListener('click', prevSlide);
            buttons.forEach((button, index) => button.removeEventListener('click', () => showSlide(index)));
        };
    }, [post.attachments]);

    return (
        <div className='p-6 my-12 mx-4 bg-gray-100 rounded-xl'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 text-lg py-2'>
                    <UserAvatar user={user} /> {user.username}
                </div>
                <span>{formatPostDate(post.created_at)}</span>
            </div>
            <div className='py-2 text-2xl mt-5'>
                {post.title}
            </div>
            <div className='py-2 text-md mb-6'>
                {post.description}
            </div>
            {post.attachments.length > 0 && (
                <div>
                    <div ref={carouselRef} className="relative w-full" data-carousel="slide">
                        <div className="relative overflow-hidden rounded-lg h-[40rem]">
                            {post.attachments.map((attachment, index) => (
                                <div key={attachment.id} className={`mb-10 absolute inset-0 duration-500 ease-in-out transform transition-all ${index === 0 ? 'block' : 'hidden'}`} data-carousel-item>
                                    {attachment.file_mime.match('image/') ? (
                                        <img src={`storage/${attachment.file_path}`} className="absolute w-full h-full object-cover" alt={post.title} />
                                    ) : (
                                        <video src={`storage/${attachment.file_path}`} className="absolute block w-full h-full object-cover" controls></video>
                                    )}
                                </div>
                            ))}
                        </div>
                        {post.attachments.length > 1 && (
                            <>
                                <div className="absolute z-30 flex -translate-x-1/2 bottom-1 left-1/2 space-x-3 rtl:space-x-reverse">
                                    {post.attachments.map((_, index) => (
                                        <button key={index} type="button" className={`w-4 h-4 rounded-full border-2 border-blue-500 ${index === 0 ? 'bg-blue-600' : 'bg-white'}`} aria-current={index === 0 ? "true" : "false"} aria-label={`Slide ${index + 1}`} data-carousel-slide-to={index}></button>
                                    ))}
                                </div>
                                <button type="button" className="absolute top-1/2 left-0 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none -translate-y-1/2" data-carousel-prev>
                                    <span className="text-white dark:text-gray-400 dark:hover:text-black transition-all inline-flex items-center justify-center sm:w-10 sm:h-10 h-5 w-5 rounded-full bg-white/30 dark:bg-gray-100/50 group-hover:bg-white/50 dark:group-hover:bg-gray-300/80 dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                        <svg className="sm:w-4 sm:h-4 w-2 h-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                        </svg>
                                        <span className="sr-only">Previous</span>
                                    </span>
                                </button>
                                <button type="button" className="absolute top-1/2 right-0 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none -translate-y-1/2" data-carousel-next>
                                    <span className="text-white dark:text-gray-400 dark:hover:text-black transition-all inline-flex items-center justify-center sm:w-10 sm:h-10 h-5 w-5 rounded-full bg-white/30 dark:bg-gray-100/50 group-hover:bg-white/50 dark:group-hover:bg-gray-300/80 dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                        <svg className="sm:w-4 sm:h-4 w-2 h-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                        <span className="sr-only">Next</span>
                                    </span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
