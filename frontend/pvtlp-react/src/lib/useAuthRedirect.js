import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const useAuthRedirect = (userName) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!userName) {
            console.log("checking username, username is " + userName);
            navigate("/auth");
        }
    }, [userName, navigate]);
    return userName;
};

export default useAuthRedirect;