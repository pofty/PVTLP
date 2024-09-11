import {Field, Switch} from "@headlessui/react";
import React from "react";

export const AgreementField = ({agreed, setAgreed}) => (
    <Field className="flex gap-x-4 sm:col-span-2">
        <div className="flex h-6 items-center">
            <Switch
                checked={agreed}
                onChange={setAgreed}
                className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
            >
                <span className="sr-only">Agree to policies</span>
                <span
                    aria-hidden="true"
                    className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                />
            </Switch>
        </div>
        <p className="text-sm leading-6 text-gray-600">
            By selecting this, you agree to our{' '}
            <a href="https://www.primevideo.com/help?nodeId=202095490&view-type=content-only" target="_blank"
               className="font-semibold text-indigo-600">
                Prime Video Terms and Conditions
            </a>
            .
        </p>
    </Field>
);