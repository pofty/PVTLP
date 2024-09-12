import {Authenticator, useAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { ExitIcon } from '@radix-ui/react-icons'
import {MenuItem} from "@headlessui/react";
import {Button, Flex} from "@radix-ui/themes";

export let userName = '';

export default function Auth({setUserName}) {
    return (
        <Authenticator>
            {({ user }) => {
                setUserName(user.username);
                return null;
            }}
        </Authenticator>
    );
}

export function SignOut({setUserName}) {
    const { signOut } = useAuthenticator();
    return (

        <MenuItem>
            <>
                <div className="flex justify-center items-center">
                <Button onClick={() => {
                    setUserName();
                    signOut();
                    console.log('username is now: ', userName);
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
            </>
        </MenuItem>
    );
}
