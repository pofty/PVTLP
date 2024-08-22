import {Button, Flex, IconButton, Table, Theme} from "@radix-ui/themes";
import * as React from "react";
import {columns, transactions} from "./data.js";
import {BackgroundGradient} from "../components/background-gradient";
import { Pencil1Icon as EditIcon } from '@radix-ui/react-icons'
import { TrashIcon } from '@heroicons/react/24/outline';

export default function TransactionsTable() {
    function GetHeaderCell({headerName}) {
        return <Table.ColumnHeaderCell className="text-black" align="center">{headerName}</Table.ColumnHeaderCell>;
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
                <ActionsCell />
            </Table.Row>
        );
    }

    function GetCell({cellValue}) {
        return <Table.Cell align="center" className="text-white ">{cellValue}</Table.Cell>;
    }

function ActionsCell() {
    return (
        <Flex align="center" justify="center" gap="1">
    <IconButton radius="full" color="orange" size="1">
        <EditIcon className=" h-6 w-4 text-white hover:scale-125 transition-transform duration-200" />
         </IconButton>

    <IconButton radius="full" color="red" size="1">
        <TrashIcon className="h-6 w-4 text-white hover:scale-125 transition-transform duration-200" />
         </IconButton>
        </Flex>

    );
}

    return (
        <Flex direction="column">
            <BackgroundGradient className="rounded-[22px] sm:p-4 bg-white dark:bg-black">
                <Table.Root variant="ghost" size="1" align="center"  className='rounded-2xl bg-black'
>
                    <Table.Header>
                        <Table.Row align="center" layout="auto" className="rounded-[22px] bg-white p-5 rounded-[22px]">
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
