import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

const FileList = ({ files, onRemove }) => {
    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold">Selected Images:</h3>
            <ul>
                {files.map((file, index) => (
                    <li key={index} className="mt-2">
                        <span
                            onClick={() => onRemove(index)}
                            className="cursor-pointer hover:text-red-500 transition-all"
                        >
                            {file.name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default function create({ auth }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        attachments: [],
        category: 'sports',
    });


    const submit = (e) => {
        e.preventDefault();

        post(route('post.store'));
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
                        <form onSubmit={submit} className='max-w-[600px] mx-auto py-10'>
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

                                <TextInput
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    autoComplete="description"
                                    placeholder="Description"
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                />

                                <InputError message={errors.description} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="attachments" value="Images" />

                                <input
                                    id="attachments"
                                    name="attachments"
                                    type='file'
                                    accept='image/*'
                                    multiple
                                    className="mt-1 block w-full"
                                    onChange={(e) => handleFileChange(e)}
                                />
                                <InputError message={errors.title} className="mt-2" />
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
                                    <PrimaryButton disabled={processing}>
                                        Submit
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
