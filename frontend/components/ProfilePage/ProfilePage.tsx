import { useAuth } from '../../contexts/AuthContext';

const ProfilePage = () => {
    const { user } = useAuth();
    return (
        <div>
            <h1>{user}</h1>
        </div>
    );
}

export default ProfilePage;
