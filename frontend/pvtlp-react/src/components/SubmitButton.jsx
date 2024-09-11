import {Button, Spinner} from "@radix-ui/themes";
import React from "react";

export function SubmitButton({enable}) {
    enable = false;
    return (
        <div className="sm:col-span-2">
            <Button variant="solid" className={`mt-2 w-full shadow-sm`} disabled={!enable}>
                {enable ? "Submit" :  <Spinner/>}
                {enable ? "" : "fill in all fields"}
            </Button>
        </div>
    );
}