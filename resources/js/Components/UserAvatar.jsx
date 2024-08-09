const UserAvatar = ({ user, profile }) => {
    const sizeClass = profile ? "w-40 h-40" : "w-8 h-8";
    const fontSize = profile ? "text-9xl" : "text-xl";

    return(
        <>
            {user.avatar && (
                <div>
                    <div className={`rounded-full overflow-hidden flex justify-center ${sizeClass}`}>
                        <img src={`../storage/${user.avatar}`} alt="user_avatar" />
                    </div>
                </div>
            )}
            {!user.avatar && (
                <div>
                    <div
                        className={`w-8 h-8 bg-gray-200 text-gray-800 rounded-full overflow-hidden flex justify-center ${sizeClass}`}
                    >
                        <span className={fontSize}>
                            {user.username.substring(0,2)}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserAvatar;
