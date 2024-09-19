import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { ExitIcon } from '@radix-ui/react-icons';
import { MenuItem } from '@headlessui/react';
import { Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

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
    return (
        <MenuItem>
            <div className="flex justify-center items-center">
                <Button
                    onClick={() => {
                        setUserName(undefined);
                        signOut();
                        window.location.reload();
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