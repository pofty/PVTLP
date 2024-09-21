import {createContext} from "react";
import {Transaction, TransactionFormProps} from "./tables/data";

const defaultTransactionValues = new Transaction(undefined, 1, new Date(), undefined, undefined, undefined, undefined, undefined, undefined, undefined, 20);
export const defaultTransactionFormProps = new TransactionFormProps(defaultTransactionValues);

export const EditFormContext = createContext();