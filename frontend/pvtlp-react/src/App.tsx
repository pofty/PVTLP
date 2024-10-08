import React from 'react';
import { Theme } from '@radix-ui/themes';
import NavBar from "./components/NavBar";
import TransactionsTable from "./tables/TransactionsTable";
import { TransactionForm, EditTransactionForm } from "src/forms/TransactionForm";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home";
import { UserProvider } from './UserContext';
import { TransactionFormProps } from './tables/data';
import {EditFormContext, defaultTransactionFormProps} from './EditFormContext';
import {CountryRecordsChart} from "./components/CountryChart";
import Auth from "./lib/Auth";

function App() {
    const [userName, setUserName] = React.useState<string | undefined>(undefined);
    const [transactionProps, setTransactionProps] = React.useState<TransactionFormProps>(defaultTransactionFormProps);


    return (
        <Theme accentColor="blue">
            <UserProvider>
                <Router>
                    <NavBar/>
                    <EditFormContext.Provider value={{transactionProps, setTransactionProps}}>
                        <Routes>
                            <Route path="/" element={<Home/>} />
                            <Route path="/CreateTransaction" element={<TransactionForm />} />
                            <Route path="/TransactionsPage" element={<TransactionsTable />} />
                            <Route path="/EditTransaction" element={<EditTransactionForm />} />
                            <Route path="/Metrics" element={<CountryRecordsChart/> } />
                            <Route path="/Auth" element={<Auth />} />
                        </Routes>
                    </EditFormContext.Provider>
                </Router>
            </UserProvider>
        </Theme>
    );
}

export default App;