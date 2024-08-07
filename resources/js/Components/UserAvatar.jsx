const UserAvatar = ({ user }) => {

    return(
        <>
            {user.avatar && (
                <div>
                    <div className="rounded-full w-8 h-8 overflow-hidden flex justify-center">
                        <img src={user.avatar} alt="user_avatar" />
                    </div>
                </div>
            )}
            {!user.avatar && (
                <div>
                    <div
                        className='w-8 h-8 bg-gray-200 text-gray-800 rounded-full overflow-hidden flex justify-center'
                    >
                        <span className="text-xl">
                            {user.username.substring(0,2)}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserAvatar;
