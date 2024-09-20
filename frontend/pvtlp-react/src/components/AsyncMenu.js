import React, {useEffect, useState} from "react";
import AsyncSelect from "react-select/async";

export const AsyncSelectField = ({fieldName, loadOptions, value, onChange, id, fullRow}) => {
    const [options, setOptions] = useState([]);

    const handleFocus = async () => {
        const loadedOptions = await loadOptions();
        setOptions(loadedOptions);
    };

    const handleChange = (option) => {
        onChange(option.value);
    };

    useEffect(() => {
        if (value !== undefined) {
            handleFocus();
        }
    }, [value]);

    return (
        <div className={fullRow ? "sm:col-span-2": ""}>
            <label htmlFor={id} className="block text-sm font-semibold leading-6 text-gray-900">
                {fieldName}
            </label>
            <div className="mt-2.5">
                <AsyncSelect
                    closeMenuOnSelect={true}
                    closeMenuOnScroll={true}
                    isSearchable={false}
                    id={id}
                    name={id}
                    loadOptions={loadOptions}
                    value={options.find(option => option.value === value)}
                    onChange={handleChange}
                    className="block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onFocus={handleFocus}
                    defaultOptions={options}
                />
            </div>
        </div>
    );
};