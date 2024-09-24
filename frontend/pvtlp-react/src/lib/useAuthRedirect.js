import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/*
    * useAuthRedirect is a custom hook that checks if the username is set in the UserContext.
    * If the username is not set, the user is redirected to the auth page, serving as a front-end authentication check.
 */
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