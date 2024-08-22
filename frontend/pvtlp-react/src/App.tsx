import React from 'react';
import logo from './logo.svg';
import {Button, Theme, Text, Flex} from '@radix-ui/themes';
import Auth from "./lib/Auth";
import NavBar from "./components/NavBar";
import TransactionsTable from "./tables/TransactionsTable";
import Example from "src/forms/CreateTransaction";
import TransactionsTable2 from "./tables/TransactionsTable2";

function App() {
    const [userName, setUserName] = React.useState<string | undefined>(undefined);

    return (
        <>
            <Theme accentColor="violet">
                <NavBar userName={userName} setUserName={setUserName}/>
                <br/>
                <br/>

                <TransactionsTable2/>


                {/*<Example/>*/}
                <Auth setUserName={setUserName}/>
                <h1>App</h1>
                {/*<TransactionsTable/>*/}
                <br/>
                <div className="text-center bg-center bg-black text-white p-4">
                    <h1 className="text-2xl">Tailwind is working!</h1>
                </div>
                <Flex direction="column" gap="2">
                    <Text>Hello from Radix Themes :)</Text>
                    <Button variant="solid"
                            highContrast
                            color="gray"
                            className=" hover:bg-red-800">Let's go</Button>
                </Flex>
            </Theme>

        </>
    );
}

export default App;
