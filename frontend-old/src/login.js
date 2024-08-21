import {useState} from 'react';
import { Amplify } from 'aws-amplify';
import {Authenticator, useAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './src/aws-exports';
import {MenuItem} from "@headlessui/react";

Amplify.configure(awsExports);

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
        <MenuItem
            className="flex justify-center items-center rounded-full"
        >
            <a
                onClick={() => {
                    setUserName();
                    signOut();
                    console.log('username is now: ', userName);
                    window.location.reload();
                }}
                type="Sign Out"
                className="btn btn-danger"
            >
                Sign out
            </a>
        </MenuItem>
    );
}
