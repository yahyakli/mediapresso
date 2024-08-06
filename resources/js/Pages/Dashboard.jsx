import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import axios from 'axios';
import TextInput from '@/Components/TextInput';

export default function Dashboard({ auth, waitingUsers, Users, Journalists, BlockedUsers }) {

    const [asearchTerm, setaSearchTerm] = useState('');
    const [afilteredUsers, setaFilteredUsers] = useState(Users);
    const [wsearchTerm, setwSearchTerm] = useState('');
    const [wfilteredUsers, setwFilteredUsers] = useState(waitingUsers);
    const [buttonsdisable, setButtonsdisable] = useState(false);

    useEffect(() => {
        const results = Users.filter(user =>
            user.username.toLowerCase().includes(asearchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(asearchTerm.toLowerCase())
        );
        setaFilteredUsers(results);
    }, [Users, asearchTerm]);

    useEffect(() => {
        const results = waitingUsers.filter(user =>
            user.username.toLowerCase().includes(wsearchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(wsearchTerm.toLowerCase())
        );
        setwFilteredUsers(results);
    }, [waitingUsers, wsearchTerm]);

    const handleAllSearch = (event) => {
        setaSearchTerm(event.target.value);
    };

    const handleWSearch = (event) => {
        setwSearchTerm(event.target.value);
    };



    const confirmJournalist = (action, userId) => (e) => {
        e.preventDefault();
        const confirmationMessage = action === 'accept' ? 'Are you sure you want to accept this user?' : 'Are you sure you want to reject this user?';
        
        if (window.confirm(confirmationMessage)) {
            setButtonsdisable(true);
            const endpoint = action === 'accept' ? '/dashboard/accept' : '/dashboard/reject';
            
            axios.post(endpoint, { userId })
                .then(response => {
                    console.log(response.data);
                    setButtonsdisable(false);
                    window.location.reload();
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const blockDeblock = (is_blocked, userId) => (e) => {
        e.preventDefault();
        const confirmationMessage = is_blocked ? "Are you sure you want to unblock this user?" : "Are you sure you want to Block this user?";
        if(window.confirm(confirmationMessage)){
            setButtonsdisable(true);
            const endpoit = is_blocked ? "/dashboard/deblock" : "/dashboard/block";

            axios.post(endpoit, {userId})
                .then(responce => {
                    console.log(responce.data);
                    setButtonsdisable(false);
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

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
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-3/6">
                    <div className="p-4">
                        <TextInput
                            type="text"
                            placeholder="Search users..."
                            value={wsearchTerm}
                            onChange={handleWSearch}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="overflow-auto h-[500px]">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <caption className='py-4 text-xl font-bold'>Waiting List ({wfilteredUsers.length})</caption>
                            <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 border-r-gray-300 border py-2 font-medium text-gray-900">ID</th>
                                <th className="whitespace-nowrap px-4 border-r-gray-300 border py-2 font-medium text-gray-900">Username</th>
                                <th className="whitespace-nowrap px-4 border-r-gray-300 border py-2 font-medium text-gray-900">Phone Number</th>
                                <th className="whitespace-nowrap px-4 border-r-gray-300 border py-2 font-medium text-gray-900">Email</th>
                                <th className="whitespace-nowrap px-4 border py-2 font-medium text-gray-900">Action</th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                            {wfilteredUsers.map((user) => {
                                return (
                                    <tr className="odd:bg-gray-50 text-center" key={user.id}>
                                        <td className="whitespace-nowrap px-4 border-r-gray-300 border py-2 font-medium text-gray-900">{user.id}</td>
                                        <td className="whitespace-nowrap px-4 border-r-gray-300 border py-2 text-gray-700">{user.username}</td>
                                        <td className="whitespace-nowrap px-4 border-r-gray-300 border py-2 text-gray-700">{user.telephone}</td>
                                        <td className="whitespace-nowrap px-4 border-r-gray-300 border py-2 text-gray-700">{user.email}</td>
                                        <td className="whitespace-nowrap px-4 gap-3 flex items-center justify-around py-2 text-gray-700">
                                            <SecondaryButton disabled={buttonsdisable} onClick={confirmJournalist('accept', user.id)}>
                                                Accept
                                            </SecondaryButton>
                                            <DangerButton disabled={buttonsdisable} onClick={confirmJournalist('reject', user.id)}>
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
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-3/6">
                    <div className="p-4">
                        <TextInput
                            type="text"
                            placeholder="Search users..."
                            value={asearchTerm}
                            onChange={handleAllSearch}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="overflow-auto h-[500px]">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <caption className='py-4 text-xl font-bold'>All Users ({afilteredUsers.length})</caption>
                            <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 border-r-gray-300 border py-2 font-medium text-gray-900">Username</th>
                                <th className="whitespace-nowrap px-4 border-r-gray-300 border py-2 font-medium text-gray-900">Email</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                            {afilteredUsers.map((user) => {
                                return (
                                    <tr className="odd:bg-gray-50 text-center" key={user.id}>
                                        <td className="whitespace-nowrap px-4 border-r-gray-300 border py-2 text-gray-700">{user.username}</td>
                                        <td className="whitespace-nowrap px-4 border-r-gray-300 border py-2 text-gray-700">{user.email}</td>
                                        <td className="whitespace-nowrap px-4 gap-3 flex items-center justify-around py-2 text-gray-700">
                                            {user.is_blocked
                                            ?
                                            <SecondaryButton disabled={buttonsdisable} onClick={blockDeblock(user.is_blocked, user.id)}>
                                                Unblock
                                            </SecondaryButton>
                                            :
                                            <DangerButton disabled={buttonsdisable} onClick={blockDeblock(user.is_blocked, user.id)}>
                                                Block
                                            </DangerButton>
                                            }
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


        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-between gap-3">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="overflow-auto h-[500px]">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <caption className='py-4 text-xl font-bold'>The Journalists ({Journalists.length})</caption>
                            <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 border-r-gray-300 border py-2 font-medium text-gray-900">ID</th>
                                <th className="whitespace-nowrap px-4 border-r-gray-300 border py-2 font-medium text-gray-900">Username</th>
                                <th className="whitespace-nowrap px-4 border-r-gray-300 border py-2 font-medium text-gray-900">Phone Number</th>
                                <th className="whitespace-nowrap px-4 border-r-gray-300 border py-2 font-medium text-gray-900">Email</th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                            {Journalists.map((user) => {
                                return (
                                    <tr className="odd:bg-gray-50 text-center" key={user.id}>
                                        <td className="whitespace-nowrap px-4 border-r-gray-300 border py-2 font-medium text-gray-900">{user.id}</td>
                                        <td className="whitespace-nowrap px-4 border-r-gray-300 border py-2 text-gray-700">{user.username}</td>
                                        <td className="whitespace-nowrap px-4 border-r-gray-300 border py-2 text-gray-700">{user.telephone}</td>
                                        <td className="whitespace-nowrap px-4 border-r-gray-300 border py-2 text-gray-700">{user.email}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="overflow-auto h-[500px]">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <caption className='py-4 text-xl font-bold'>Blocked Users ({BlockedUsers.length})</caption>
                            <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 border-r-gray-300 border py-2 font-medium text-gray-900">Username</th>
                                <th className="whitespace-nowrap px-4 border-r-gray-300 border py-2 font-medium text-gray-900">Email</th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                            {BlockedUsers.map((user) => {
                                return (
                                    <tr className="odd:bg-gray-50 text-center" key={user.id}>
                                        <td className="whitespace-nowrap px-4 border-r-gray-300 border py-2 text-gray-700">{user.username}</td>
                                        <td className="whitespace-nowrap px-4 border-r-gray-300 border py-2 text-gray-700">{user.email}</td>
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
