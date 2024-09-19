import React, { useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';
import pvLogo02 from '../assets/pv-logo2.png';
import { SignOut } from '../lib/Auth';
import { useUser } from '../UserContext';
import {useNavigate} from "react-router-dom";

const navigationItems = [
    { name: 'Transactions', href: '/TransactionsPage' },
    { name: 'Customers', href: '#' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
    const { userName, setUserName } = useUser();
    const [currentPage, setCurrentPage] = useState('Dashboard');
    const navigate = useNavigate();

    function WelcomeUserWithUsername() {
        console.log("usernmae is " + userName)
    if (userName) {
        return (
            <a className=" block text-center py-1 text-gray-700">
                <p> Hello {userName} 👋</p>
            </a>
        );
    } else {
        return (
            <a href="/auth" className="block text-center px-4 py-2 text-sm text-gray-700">
                <p> login to proceed 😊 </p>
            </a>
        );
    }
}

function SignOutUser() {
    if (userName) {
        return <SignOut setUserName={setUserName} />
    }
    return null;
}

    return (
        <>
        <Disclosure as="nav" className="bg-black">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton
                            className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5"/>
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden"/>
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block"/>
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="relative flex rounded-full left-2 top-1">
                            <img
                                alt="Your Company"
                                src={pvLogo02}
                                className="h-9 w-auto"
                                onClick={() => navigate("/")}
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {userName && navigationItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        aria-current={currentPage === item.name ? 'page' : undefined}
                                        className={classNames(
                                            currentPage === item.name ? 'bg-white text-black font-bold' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium',
                                        )}
                                        onClick={() => setCurrentPage(item.name)}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Profile dropdown */}
                        <Menu as="div" className=" relative ml-3 z-[9999]">
                            <div>
                                <MenuButton
                                    className="right-3 relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5"/>
                                    <span className="sr-only">Open user menu</span>
                                    <UserIcon aria-hidden="true" className="h-6 w-6 text-white "/>
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <MenuItem>
                                    <WelcomeUserWithUsername/>
                                </MenuItem>
                                <SignOutUser/>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigationItems.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={currentPage === item.name ? 'page' : undefined}
                            className={classNames(
                                currentPage === item.name ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium')}
                            onClick={() => setCurrentPage(item.name)}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    <br/>
        </>
    );
}