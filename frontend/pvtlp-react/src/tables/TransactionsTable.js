import React, {useEffect, useState} from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue} from "@nextui-org/react";
import {columns, Customer, Title} from "./data";
import {BackgroundGradient} from "../components/background-gradient";
import {Flex, Box, IconButton, Badge} from "@radix-ui/themes";
import {Pencil1Icon as EditIcon} from "@radix-ui/react-icons";
import { TrashIcon } from '@heroicons/react/24/outline';
import {getCustomers, getTransactions, getTitles} from "../utils/api_call_backend";
import Flag from "react-world-flags";


    export function getCountryCell(value) {
        return (
            <Flag className="rounded border-1 " code={value} height="10" width="35"/>
        );
    }


export function getStatusBadge(value) {
    const status_to_color = {
        "Successful": "green",
        "Failed": "red",
        "Grandfathered": "blue",
        "Exempted": "blue",
        "Pending": "orange",
        "Cancelled": "red"
    };
    return (
        <Badge color={status_to_color[value]}>{value}</Badge>
    );
}

export default function TransactionsTable() {
    const [page, setPage] = React.useState(1);
    const [data, setData] = useState([]);
    const [titles, setTitles] = useState([]);
    const [customers, setCustomers] = useState([Customer, ]);

    useEffect(() => {
        getTransactions()
            .then((data) => {
                setData(data);
                console.log("data: " + data);
            })
            .catch((error) => {
                console.error("Error fetching transactions: ", error);
            });
        getCustomers()
            .then((customers) => {
                setCustomers(customers);
                console.log("customers: " + customers);
            }).catch((error) => {
            console.error("Error fetching customers: ", error);
        });
        getTitles()
            .then((titles) => {
                setTitles(titles);
                console.log("titles: " + titles);
            }).catch((error) => {
            console.error("Error fetching titles: ", error);
        });
    }, []);

    const rowsPerPage = 4;

    const pages = Math.ceil(data.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return data.slice(start, end);
    }, [page, data]);

    function getCustomerCell(value) {
        const customer = customers.find(c => c.customer_id_pk === value);
        return customer ? (
            <Flex gap="3" justify="start">
                <div>
                    <div className="bg-white">
                        {`${customer.first_name} ${customer.last_name}`}
                    </div>
                    <div className="text-gray-500"> Home Region: {customer.home_country_code_fk}</div>
                    <div className="text-gray-500"> ID: {customer.customer_id_pk}</div>
                </div>
            </Flex>
        ) : value;
    }

    function getTitleCell(value) {
        const title = titles.find(title => title.title_id_pk === value);
        console.log("title: GG" + title);
        return title ? (
            <Flex gap="3" justify="start">
                <div>
                    <div className="bg-white">
                        {`${title.name}`}
                    </div>
                    <div className="text-gray-500">
                        ID: {title.title_id_pk}
                    </div>
                </div>
            </Flex>
        ) : value;
    }


    function getTableCell(key, value) {
        if (value === undefined) {
            console.error(`No key found for item with key: ${key}`);
            return <div>Key not found</div>;
        }

        return <>
            {key === "customer_id_fk" ? getCustomerCell(value) : key === "country_code_fk" ? getCountryCell(value) : key === "mfa_status_fk" ? getStatusBadge(value) : key === "transaction_status_fk" ? getStatusBadge(value) : key === "title_id_fk" ? getTitleCell(value) : value}
        </>;
    }

    return (
        <BackgroundGradient className="rounded-[22px] sm:p-1 ">
            <Table
                aria-label="Transactions Table"
                bottomContent={
                    <div className="flex w-full justify-center pointer-events-auto  ">
                        <Pagination
                            classNames={{
                                wrapper: "gap-0 overflow-visible rounded border-divider",
                                item: "w-8 h-8 text-small rounded-none bg-transparent",
                                cursor:
                                    "bg-black from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
                            }}
                            isCompact
                            showControls
                            showShadow
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
                classNames={{
                    wrapper: "min-h-[222px]",
                }}
            >
                <TableHeader>
                    {columns.map((item) => (
                        <TableColumn className="bg-black text-white" key={item.name}>{item.name} </TableColumn>
                    ))}
                </TableHeader>
                <TableBody emptyContent={"Loading... or no data found"} items={items}>
                    {(item) => (
                        <TableRow key={item.transaction_id_pk}>
                            {columns.map((column) => (
                                <TableCell key={column.uid}>
                                    {(column.uid !== "actions") ? getTableCell(column.uid, getKeyValue(item, column.uid)) :
                                        <ActionsCell transactionId={item.transaction_id_pk}/>}
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </BackgroundGradient>
    );
}

function ActionsCell({transactionId}) {
    const handleEditClick = () => {
        console.log(`Edit clicked for transaction ID: ${transactionId}`);
    };

    return (
        <Flex gap="1">
            <IconButton radius="full" color="orange" size="1" onClick={handleEditClick}>
                <EditIcon className="h-6 w-4 text-white hover:scale-125 transition-transform duration-200" />
            </IconButton>
            <IconButton radius="full" color="red" size="1">
                <TrashIcon className="h-6 w-4 text-white hover:scale-125 transition-transform duration-200" />
            </IconButton>
        </Flex>
    );
}