import Postcomponent from '@/Components/Postcomponent';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Home({ auth, posts, users }) {
    const getUser = (id) => {
        return users.find(user => user.id === id);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
        >
            <Head title="Home" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {posts.length !== 0 ? posts.map(post => {
                            return (
                                    <Postcomponent key={post.id} post={post} user={getUser(post.user_id)}/>
                                )
                        })
                        :
                        <div className="py-12">
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-6 text-gray-900 text-center text-2xl">Nothig for now</div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
