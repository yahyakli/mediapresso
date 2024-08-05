import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

export default function Dashboard({ auth, users }) {
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
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-2/5">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Id</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Username</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                            {users.map((user) => {
                                return (
                                    <tr className="odd:bg-gray-50 text-center" key={user.id}>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.id}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.username}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.email}</td>
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
