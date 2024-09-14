import React from 'react'

export default function Edit() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        attachments: [],
        category: 'sports',
    });

    const submit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
    
        data.attachments.forEach((file, index) => {
            formData.append(`attachments[${index}]`, file);
        });
    
        post(route('post.store'), formData);
    };

    const handleFileChange = (e) => {
        setData(prevData => ({
            ...prevData,
            attachments: [...prevData.attachments, ...Array.from(e.target.files)]
        }));
    };

    const handleCategoryChange = (e) => {
        setData('category', e.target.value);
    };

    const handleRemoveFile = (index) => {
        setData(prevData => ({
            ...prevData,
            attachments: prevData.attachments.filter((_, i) => i !== index)
        }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create new post</h2>}
        >
            <Head title="New post" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className='max-w-[600px] mx-auto py-10' encType="multipart/form-data">
                            <div>
                                <InputLabel htmlFor="title" value="Title" />

                                <TextInput
                                    id="title"
                                    name="title"
                                    value={data.title}
                                    className="mt-1 block w-full"
                                    autoComplete="title"
                                    isFocused={true}
                                    placeholder="Title"
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />

                                <InputError message={errors.title} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="description" value="Description" />

                                <textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    autoComplete="description"
                                    placeholder="Description"
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                />

                                <InputError message={errors.description} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="attachments" value="Import Images or Videos" className='bg-blue-500 w-fit text-white text-xl px-4 py-2 rounded-lg' />

                                <input
                                    id="attachments"
                                    name="attachments"
                                    type='file'
                                    accept='image/*,video/*'
                                    multiple
                                    className="mt-1 w-full hidden"
                                    onChange={(e) => handleFileChange(e)}
                                />
                                <InputError message={errors.attachments} className="mt-2" />
                                <FileList files={data.attachments} onRemove={handleRemoveFile}/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="category" value="Category" />

                                <select onChange={handleCategoryChange} id="category" name="category" value={data.category} className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full'>
                                    <option value="sports">Sports</option>
                                    <option value="politics">Politics</option>
                                    <option value="technology">Technology</option>
                                    <option value="science">Science</option>
                                    <option value="health">Health</option>
                                    <option value="business">Business</option>
                                    <option value="education">Education</option>
                                    <option value="entertainment">Entertainment</option>
                                    <option value="world">World</option>
                                    <option value="travel">Travel</option>
                                </select>

                                <InputError message={errors.category} className="mt-2" />

                                <div className="flex items-center justify-start mt-4">
                                    <SecondaryButton type='submit' disabled={processing}>
                                        Submit
                                    </SecondaryButton>
                                </div>
                                <div>
                                    
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
