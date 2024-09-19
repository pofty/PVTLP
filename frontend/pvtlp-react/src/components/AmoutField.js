import React, { useEffect } from "react";

export const NumberField = ({ fieldName, number, setNumber, min, max, setCalloutVisibility, setCalloutMessage, setCalloutColor}) => {
    useEffect(() => {
        if (number < min) {
            setNumber(min);
            setCalloutVisibility(false);
            setCalloutColor("red");
            setCalloutMessage(fieldName + " value is too small, please enter a number between " + min + " and " + max);
            setCalloutVisibility(true);
        } else if (number > max) {
            setNumber(max);
            setCalloutVisibility(false);
            setCalloutColor("red");
            setCalloutMessage(fieldName + " value is too large, please enter a number between " + min + " and " + max);
            setCalloutVisibility(true);
        }
    }, [number, setNumber]);

    return (
        <div>
            <label htmlFor={fieldName} className="block text-sm font-semibold leading-6 text-gray-900">
                {fieldName}
            </label>
            <div className="mt-2.5">
                <input
                    id="number"
                    name="number"
                    type="number"
                    min={min}
                    max={max}
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    );
};