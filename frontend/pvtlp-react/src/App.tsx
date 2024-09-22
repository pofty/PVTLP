import React, {createContext, useEffect} from 'react';
import { Theme } from '@radix-ui/themes';
import NavBar from "./components/NavBar";
import TransactionsTable from "./tables/TransactionsTable";
import { TransactionForm, EditTransactionForm } from "src/forms/TransactionForm";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FlipWords } from "./components/FlipWordsDemo";
import Home from "./Pages/Home";
import AuthPage from "./Pages/AuthPage";
import { UserProvider } from './UserContext';
import TransactionsPage from "./Pages/TransactionsPage";
import { TransactionFormProps } from './tables/data';
import {EditFormContext, defaultTransactionFormProps} from './EditFormContext';

function App() {
    const [userName, setUserName] = React.useState<string | undefined>(undefined);
    const [transactionProps, setTransactionProps] = React.useState<TransactionFormProps>(defaultTransactionFormProps);


    return (
        <Theme accentColor="blue">
            <UserProvider>
                <Router>
                    <NavBar/>
                    {/* Wrap the Routes component with the EditTransactionContext.Provider */}
                    <EditFormContext.Provider value={{transactionProps, setTransactionProps}}>
                        <Routes>
                            <Route path="/" element={<Home/>} />
                            <Route path="/CreateTransaction" element={<TransactionForm />} />
                            <Route path="/TransactionsPage" element={<TransactionsPage />} />
                            <Route path="/EditTransaction" element={<EditTransactionForm />} />
                            <Route path="/Auth" element={<AuthPage />} />
                        </Routes>
                    </EditFormContext.Provider>
                </Router>
            </UserProvider>
        </Theme>
    );
}

export default App;