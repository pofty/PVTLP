import {Button, Flex} from "@radix-ui/themes";
import DatePicker from "react-datepicker";
import React from "react";

export const TimestampField = ({timestamp, setTimestamp}) => (
    <div>
        <label htmlFor="timestamp" className="block text-sm font-semibold leading-6 text-gray-900">
            Timestamp
        </label>
        <Flex className=" mt-2.5" gap="3" align="center">
            <DatePicker
                showIcon
                selected={timestamp}
onChange={(date) => {
    setTimestamp(date);
    console.log(date);
}}
                showTimeSelect
                dateFormat="Pp"
                minDate={new Date('2010-01-01')}
                maxDate={new Date()}
                className="block w-full h-10 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
            <Button type="button" color="gray" variant="outline" highContrast onClick={() => setTimestamp(new Date())} className=" text-black ">
                Now
            </Button>
        </Flex>
    </div>
);