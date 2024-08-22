import {Button, Flex, Table, Theme} from "@radix-ui/themes";
import * as React from "react";
import {columns, transactions} from "./data.js";
import {BackgroundGradient} from "../components/background-gradient";

export default function TransactionsTable() {
    function GetHeaderCell({headerName}) {
        return <Table.ColumnHeaderCell className="text-white" align="center">{headerName}</Table.ColumnHeaderCell>;
    }

    function GetRow({transaction}) {
        return (
            <Table.Row align="center">
                <GetCell cellValue={transaction.transactionId}/>
                <GetCell cellValue={transaction.transactionStatus}/>
                <GetCell cellValue={transaction.timestamp}/>
                <GetCell cellValue={transaction.name}/>
                <GetCell cellValue={transaction.mfaStatus}/>
                <GetCell cellValue={transaction.amount}/>
                <GetCell cellValue={transaction.currency}/>
                <GetCell cellValue={transaction.paymentMethod}/>
                <GetCell cellValue={transaction.actions}/>
            </Table.Row>
        );
    }

    function GetCell({cellValue}) {
        return <Table.Cell align="center" className="text-white">{cellValue}</Table.Cell>;
    }

    return (
        <Flex direction="column">
            <BackgroundGradient className="rounded-[22px] sm:p-4 bg-white dark:bg-black">
                <Table.Root variant="ghost" size="1" align="center" className='text-white'>
                    <Table.Header>
                        <Table.Row align="center" layout="auto" className="rounded-[22px]">
                            {columns.map((item) => (
                                <GetHeaderCell key={item.name} headerName={item.name}/>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {transactions.map((transaction) => (
                            <GetRow key={transaction.transactionId} transaction={transaction}/>
                        ))}
                    </Table.Body>
                </Table.Root>
            </BackgroundGradient>
        </Flex>
    );
}