import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import axios from 'axios';

export default function Dashboard({ auth, waitingUsers: initialUsers, Users }) {

    const [users, setUsers] = useState(initialUsers);

    const handleSubmit = (action, userId) => (e) => {
        e.preventDefault();
        const confirmationMessage = action === 'accept' ? 'Are you sure you want to accept this user?' : 'Are you sure you want to reject this user?';
        
        if (window.confirm(confirmationMessage)) {
            const endpoint = action === 'accept' ? '/dashboard/accept' : '/dashboard/reject';
            
            axios.post(endpoint, { userId })
                .then(response => {
                    console.log(response.data);
                    // Handle success (e.g., update the UI or show a success message)
                    setUsers(users.filter(user => user.id !== userId));
                })
                .catch(error => {
                    console.error(error);
                    // Handle error (e.g., show an error message)
                });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
        <Head title="Dashboard" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <h1 className="p-6 text-2xl font-bold text-center text-gray-900">Dashboard</h1>
                </div>
            </div>
        </div>


        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-between gap-3">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-3/6 max-h-[500px]">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <caption className='py-4 text-xl font-bold'>Waiting List</caption>
                            <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Username</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Phone Number</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                            {initialUsers.map((user) => {
                                return (
                                    <tr className="odd:bg-gray-50 text-center" key={user.id}>
                                        <td className="whitespace-nowrap px-4 border-r-gray-300 border py-2 font-medium text-gray-900">{user.id}</td>
                                        <td className="whitespace-nowrap px-4 border-r-gray-300 border py-2 text-gray-700">{user.username}</td>
                                        <td className="whitespace-nowrap px-4 border-r-gray-300 border py-2 text-gray-700">{user.telephone}</td>
                                        <td className="whitespace-nowrap px-4 border-r-gray-300 border py-2 text-gray-700">{user.email}</td>
                                        <td className="whitespace-nowrap px-4 gap-3 flex items-center justify-around py-2 text-gray-700">
                                            <SecondaryButton onClick={handleSubmit('accept', user.id)}>
                                                Accept
                                            </SecondaryButton>
                                            <DangerButton onClick={handleSubmit('reject', user.id)}>
                                                Reject
                                            </DangerButton>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bg-white overflow-y-scroll shadow-sm sm:rounded-lg w-3/6 max-h-[500px]">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <caption className='py-4 text-xl font-bold'>All Users</caption>
                            <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Username</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                            {Users.map((user) => {
                                return (
                                    <tr className="odd:bg-gray-50 text-center" key={user.id}>
                                        <td className="whitespace-nowrap px-4 border-r-gray-300 border py-2 text-gray-700">{user.username}</td>
                                        <td className="whitespace-nowrap px-4 border-r-gray-300 border py-2 text-gray-700">{user.email}</td>
                                        <td className="whitespace-nowrap px-4 gap-3 flex items-center justify-around py-2 text-gray-700">
                                            <SecondaryButton onClick={handleSubmit('accept', user.id)}>
                                                Accept
                                            </SecondaryButton>
                                            <DangerButton onClick={handleSubmit('reject', user.id)}>
                                                Reject
                                            </DangerButton>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    )
}
