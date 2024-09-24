import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { ExitIcon } from '@radix-ui/react-icons';
import { MenuItem } from '@headlessui/react';
import { Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

/*
    * Auth component is used to authenticate the user and set the username in the UserContext.
    * SignOut component is used to sign out the user and set the username to undefined in the UserContext.
    * Both components use the Authenticator and useAuthenticator hooks from the AWS Amplify library.
 */
export default function Auth() {
    const { setUserName } = useUser();
    const navigate = useNavigate();


    return (
        <Authenticator>
            {({ user }) => {
                setUserName(user.username);
                navigate('/');
                return null;
            }}
        </Authenticator>
    );
}

export function SignOut({ setUserName }) {
    const { signOut } = useAuthenticator();
    const navigate = useNavigate();

    return (
        <MenuItem>
            <div className="flex justify-center items-center">
                <Button
                    onClick={() => {
                        setUserName(undefined);
                        signOut();
                        navigate('/');
                    }}
                    type="Sign Out"
                    variant="solid"
                    highContrast
                    color="gray"
                    className="hover:bg-red-800"
                >
                    Sign out <ExitIcon />
                </Button>
            </div>
        </MenuItem>
    );
}