import React from 'react';
import logo from './logo.svg';
import {Button, Theme, Text, Flex} from '@radix-ui/themes';
// import Auth from "./lib/Auth";
import NavBar from "./components/NavBar";
import Example from "src/forms/TransactionTable";
import TransactionsTable from "./tables/TransactionsTable";
import TransactionTable from "src/forms/TransactionTable";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {FlipWords} from "./components/FlipWordsDemo";
import Home from "./Pages/Home";
import AuthPage from "./Pages/AuthPage"
import { UserProvider } from './UserContext';
import TransactionsPage from "./Pages/TransactionsPage";

function App() {
    const [userName, setUserName] = React.useState<string | undefined>(undefined);
    const createTransactionProps = {
        passedCustomerId: undefined,
        passedAmount: 20,
        passedCalloutMessage: "Create a transaction form is loaded",
        passedCountryCode: undefined,
        passedCurrencyCode: undefined,
        passedIsCalloutVisible: true,
        passedMfaStatus: undefined,
        passedNumberOfAttempts: 1,
        passedPaymentMethod: undefined,
        passedTimestamp: new Date(),
        passedTransactionStatus: undefined,
        passedTitleId: undefined
    };

    return (
        <Theme accentColor="blue">
            <UserProvider>
                <Router>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/CreateTransaction" element={<TransactionTable {...createTransactionProps} />} />
                        <Route path="/TransactionsPage" element={<TransactionsPage />} />
                        <Route path="/Auth" element={<AuthPage />} />
                    </Routes>
                </Router>
            </UserProvider>
        </Theme>
    );
}
export default App;
