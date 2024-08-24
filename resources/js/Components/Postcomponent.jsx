import React, { useEffect, useRef, useState } from 'react';
import UserAvatar from './UserAvatar';
import { formatPostDate } from '@/helpers';
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { useForm } from '@inertiajs/react';
import CommentPopup from './CommentPopup';
import { RxHamburgerMenu } from "react-icons/rx";
import Dropdown from './Dropdown';


export default function PostComponent({ Post, Post_user, user }) {
    const carouselRef = useRef(null);
    const popupRef = useRef(null);
    const [postLiked, setPostLiked] = useState(Post.liked);
    const [likesCount, setLikesCount] = useState(Post.likes_count);
    const [commentsCount, setCommentsCount] = useState(Post.comments_count);
    const [commentPopUp, setCommentPopUp] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        post_id: Post.id,
    });

    const deleteSubmit = (e) => {
        e.preventDefault();

        post(`/post/delete/${Post.id}`);
    }

    const closePopup = () => setCommentPopUp(false);

    useEffect(() => {
        postLiked ?
        setLikesCount(Post.likes_count --) :
        setLikesCount(Post.likes_count ++);
    }, [postLiked]);


    useEffect(() => {
        setCommentsCount(Post.comments_count ++);
    }, [Post.comments.length]);

    useEffect(() => {
        commentPopUp ?
        document.body.classList.add('screen_block') :
        document.body.classList.remove('screen_block');
    }, [commentPopUp]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setCommentPopUp(false);
            }
        };

        if (commentPopUp) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [commentPopUp]);

    const likeSubmit = (e) => {
        e.preventDefault();
        post(route('post.like'));
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const items = carousel.querySelectorAll('[data-carousel-item]');
        const videos = carousel.querySelectorAll('video');
        const buttons = carousel.querySelectorAll('[data-carousel-slide-to]');
        const prevButton = carousel.querySelector('[data-carousel-prev]');
        const nextButton = carousel.querySelector('[data-carousel-next]');

        if (!prevButton || !nextButton) return;

        let currentIndex = 0;
        let previousIndex = 0;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play();
                } else {
                    entry.target.pause();
                }
            });
        }, {
            threshold: 0.5
        });

        videos.forEach(video => {
            observer.observe(video);
        });

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
            videos.forEach(video => observer.unobserve(video));
        };
    }, [Post.attachments]);

    return (
        <div className='p-6 my-12 mx-4 bg-gray-100 rounded-xl border pb-0'>
            <div className='flex items-center justify-between border-b-gray-300 border-b pb-2'>
                <div className='flex items-center gap-2 text-lg py-2'>
                    <UserAvatar user={Post_user} /> {Post_user.username}
                </div>
                <div className='flex items-center justify-center gap-3'>
                    <span>{formatPostDate(Post.created_at)}</span>
                    {user && Post.user_id === user.id && (
                        <div className='text-xl font-bold'>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md  active:text-gray-400">
                                        <RxHamburgerMenu />
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link>Edit Post</Dropdown.Link>
                                    <form onSubmit={deleteSubmit}>
                                        <Dropdown.Link as='button'>Delete Post</Dropdown.Link>
                                    </form>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    )}
                </div>
            </div>
            <div className='py-2 text-2xl mt-5'>
                {Post.title}
            </div>
            <div className='py-2 text-md mb-6'>
                {Post.description}
            </div>
            {Post.attachments.length > 0 && (
                <div className='relative'>
                    <div ref={carouselRef} className="relative w-full" data-carousel="slide">
                        <div className="relative overflow-hidden rounded-lg h-[40rem]">
                            {Post.attachments.map((attachment, index) => (
                                <div key={attachment.id} className={`flex justify-center items-center mb-10 absolute inset-0 duration-500 ease-in-out transform transition-all ${index === 0 ? 'block' : 'hidden'}`} data-carousel-item>
                                    {attachment.file_mime.match('image/') ? (
                                        <img src={`storage/${attachment.file_path}`} className="absolute h-full object-cover" alt={Post.title} />
                                    ) : (
                                        <video src={`storage/${attachment.file_path}`} className="absolute block w-full h-full object-cover" controls></video>
                                    )}
                                </div>
                            ))}
                        </div>
                        {Post.attachments.length > 1 && (
                            <>
                                <div className="absolute z-30 flex -translate-x-1/2 bottom-1 left-1/2 space-x-3 rtl:space-x-reverse">
                                    {Post.attachments.map((_, index) => (
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
                    <div className='absolute bottom-0 left-0 text-sm'>
                        {likesCount} Like
                    </div>
                    <div className='absolute bottom-0 right-0 text-sm'>
                        {commentsCount} Comment
                    </div>
                </div>
            )}
            <div className='mt-4 flex justify-around py-4 border-t-gray-300 border-t text-xl relative'>
                <form onSubmit={likeSubmit} className='border-r-gray-300 border-r w-1/2 py-2 flex items-center justify-center relative'>
                    {!postLiked ? 
                        <button onClick={() => setPostLiked(true)} className='flex items-center justify-center gap-2'><AiOutlineLike /> Like</button>
                    :
                        <button onClick={() => setPostLiked(false)} className='flex items-center justify-center gap-2'><AiFillLike /> Liked</button>
                    }
                </form>
                <button onClick={() => setCommentPopUp(true)} className='w-1/2 py-2 flex items-center justify-center gap-2'><FaRegCommentAlt /> Comments</button>
            </div>
            {commentPopUp && (
                <div>
                    <CommentPopup Post={Post} onClose={closePopup} Post_user={Post_user} ref={popupRef}/>
                </div>
            )}
        </div>
    );
}
