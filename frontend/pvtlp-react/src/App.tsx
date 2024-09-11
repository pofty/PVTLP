import React from 'react';
import logo from './logo.svg';
import {Button, Theme, Text, Flex} from '@radix-ui/themes';
// import Auth from "./lib/Auth";
import NavBar from "./components/NavBar";
import Example from "src/forms/CreateTransaction";
import TransactionsTable from "./tables/TransactionsTable";
import CreateTransaction from "src/forms/CreateTransaction";
import {FlipWords} from "./components/FlipWordsDemo";

function App() {
    const [userName, setUserName] = React.useState<string | undefined>(undefined);

    return (
        <>
            <Theme accentColor="blue">
                <NavBar userName={userName} setUserName={setUserName}/>
                <br/>
                <br/>

                {/*<TransactionsTable/>*/}
                <CreateTransaction/>
                <br/>


                {/*<Example/>*/}
                {/*<Auth setUserName={setUserName}/>*/}
                <h1>App</h1>
                {/*<TransactionsTable/>*/}
                <br/>
            </Theme>

        </>
    );
}
export default App;
