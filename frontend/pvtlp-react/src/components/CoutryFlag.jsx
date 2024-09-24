import React from "react";
import Flag from "react-world-flags";

export function getCountryCell(value) {
    return (
        <Flag className="rounded border-1 " code={value} height="10" width="35"/>
    );
}