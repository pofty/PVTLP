import * as React from 'react';
import '@aws-amplify/ui-react/styles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './output.css';
import NavBar from "./NavBar";
import Auth from "./login";
import '@radix-ui/themes/styles.css';
import DataTable from "./DataTable";
import DataTable2 from "./DataTable2";
import {NextUIProvider} from "@nextui-org/react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Flex, Text, Button } from '@radix-ui/themes';
import { Theme, Table } from '@radix-ui/themes';
import DataTable3 from "./DataTable3";

function App() {
    const [userName, setUserName] = React.useState<string | undefined>(undefined);
    return (
        <>
            <NextUIProvider>
                <NavBar userName={userName} setUserName={setUserName} />
                <br/>
                <Auth setUserName={setUserName} />
            </NextUIProvider>
            <DataTable3 />
            <DataTable2 />
        </>
    );
}

export default App;