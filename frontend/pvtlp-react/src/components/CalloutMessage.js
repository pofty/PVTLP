import React, { useState, useEffect } from 'react';
import { Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import PropTypes from 'prop-types';

export function CalloutMessage({ message, visible, setVisibility, calloutColor, duration }) {

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setVisibility(false);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [visible, setVisibility]);

    if (!visible) return null;

    return (
        <>
            <Callout.Root color={calloutColor} className="sm:col-span-2 p-3">
                <Callout.Icon>
                    <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                    {message}
                </Callout.Text>
            </Callout.Root>
        </>
    );
}

CalloutMessage.propTypes = {
    message: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    setVisibility: PropTypes.func.isRequired,
};