import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue} from "@nextui-org/react";
import {columns, Customer, Title, Transaction, TransactionFormProps} from "./data";
import {BackgroundGradient} from "../components/background-gradient";
import {Flex, IconButton, Button, Badge, AlertDialog, Text } from "@radix-ui/themes";
import {Pencil1Icon as EditIcon, PlusIcon, PersonIcon, DimensionsIcon, ReloadIcon} from "@radix-ui/react-icons";
import { TrashIcon } from '@heroicons/react/24/outline';
import {getCallToBackend, deleteCallToBackend, getJwtToken, isAdminGetCallToBackend} from "../utils/api_call_backend";
import Flag from "react-world-flags";
import {API_Endpoint} from "../utils/api_endpoints";
import {useNavigate} from "react-router-dom";
import {EditFormContext} from "../EditFormContext";
import {useUser} from "../UserContext";
import useAuthRedirect from "../lib/useAuthRedirect";
import {CalloutMessage} from "../components/CalloutMessage";

export function getCountryCell(value) {
    return (
        <Flex justify={"center"}>
            <Flag className="rounded border-1 " code={value} height="10" width="35"/>
        </Flex>
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
    const {userName} = useUser();
    useAuthRedirect(userName);

    const {setTransactionProps} = useContext(EditFormContext);
    const [page, setPage] = React.useState(1);
    const [transactions, setTransactions] = useState([]);
    const [titles, setTitles] = useState([]);
    const [customers, setCustomers] = useState([Customer,]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isCalloutVisible, setIsCalloutVisible] = useState();
    const [calloutMessage, setCalloutMessage] = useState();
    const [calloutColor, setCalloutColor] = useState("green");
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                const [isAdmin, transactions, customers, titles] = await Promise.all([
                    isAdminGetCallToBackend(),
                    getCallToBackend(API_Endpoint.Transactions, Transaction),
                    getCallToBackend(API_Endpoint.Customers, Customer),
                    getCallToBackend(API_Endpoint.Titles, Title)
                ]);

                setIsAdmin(isAdmin);
                console.log("isAdmin: " + isAdmin);

                setTransactions(transactions);
                console.log("transactions: " + transactions);

                setCustomers(customers);
                console.log("customers: " + customers);

                setTitles(titles);
                console.log("titles: " + titles);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData().then(() => console.log("Data fetched successfully"));
    }, []);

    const rowsPerPage = 4;

    const pages = Math.ceil(transactions.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return transactions.slice(start, end);
    }, [page, transactions]);

    function getCustomerCell(value) {
        const customer = customers.find(c => c.customer_id_pk === value);
        return customer ? (
            <Flex direction={"column"} align={"center"}>
                <Flex direction={'row'} justify={'center'}>
                    <PersonIcon/>
                    <span>{`${customer.first_name}\u00A0${customer.last_name}`}</span> </Flex>
                <div className="text-gray-500"> Home Region: {customer.home_country_code_fk}</div>
                <div className="text-gray-500"> ID: {customer.customer_id_pk}</div>
            </Flex>

        ) : value;
    }

    function getTitleCell(value) {
        const title = titles.find(title => title.title_id_pk === value);
        console.log("title: GG" + title);
        return title ? (
            <Flex direction={"column"}>
                <div className="bg-white">
                    {`${title.name}`}
                </div>
                <div className="text-gray-500">
                    ID: {title.title_id_pk}
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

    function TopContent() {
        return (
            <>
                <Flex  direction={"column"}>
                    <CalloutMessage visible={isCalloutVisible} message={calloutMessage} setVisibility={setIsCalloutVisible}
                                    calloutColor={calloutColor} duration={5000}/>
                    <Flex className=' min-w-8' gap="3" direction={"row"}>
                        <Button color="gray" variant="outline" highContrast
                                onClick={() => navigate("/CreateTransaction")}>
                            <PlusIcon/> Create Transaction
                        </Button>
                        <Button color="gray" variant="outline" highContrast
                                onClick={() => navigate("/Metrics")}>
                            <DimensionsIcon/> Go to Metrics Dashboards
                        </Button>
                        <Button color="gray" variant="outline" highContrast
                                onClick={() => window.location.reload()}>
                            <ReloadIcon/> Refresh Page
                        </Button>
                    </Flex>
                </Flex>
            </>
        );
    }

    if (userName) {
        return (

            <BackgroundGradient className="rounded-[22px] sm:p-1 ">
                <Table
                    topContent={<TopContent/>}
                    aria-label="Transactions Table"
                    layout="auto"
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
                        wrapper: "min-h-[222px]"
                    }}

                >
                    <TableHeader>
                        {columns.map((item) => (
                            <TableColumn className="bg-black text-white text-center"
                                         key={item.name}>{item.name} </TableColumn>
                        ))}
                    </TableHeader>
                    <TableBody emptyContent={"Loading... or no transactions found"} items={items} className="">
                        {(item) => (
                            <TableRow key={item.transaction_id_pk} classNames=''>
                                {columns.map((column) => (
                                    <TableCell key={column.uid} className="text-center">
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

        function ActionsCell({transactionId}) {
            const handleEditClick = () => {
                console.log(`Edit clicked for transaction ID: ${transactionId}`);
                const transaction = transactions.find(transaction => transaction.transaction_id_pk === transactionId);
                setTransactionProps(new TransactionFormProps(transaction));
                console.log("transaction details sent to EditFormContext");
                navigate("/EditTransaction");
            };

            const handleDeleteClick = () => {
                console.log(`Delete clicked for transaction ID: ${transactionId}`);
                // api call to deleteCallToBackend() with transactionId
                deleteCallToBackend(API_Endpoint.Delete_Transaction, transactionId)
                    .then((response) => {
                        console.log("Transaction deleted call was sent successfully: ", response);
                        // rerender the table
                        const tempTransactions = transactions.filter(transaction => transaction.transaction_id_pk !== transactionId);
                        setTransactions(tempTransactions);
                        setCalloutMessage("transaction ID: " + transactionId + " is successfully deleted");
                        setCalloutColor("green");
                        setIsCalloutVisible(true);
                    })
                    .catch((error) => {
                        console.error("Error deleting transaction: ", error);
                        setCalloutMessage("Error deleting transaction ID: " + transactionId);
                        setCalloutColor("red");
                    });

            }

            function DeleteButtonWithConfirmation() {
                return (
                    <AlertDialog.Root>
                        <AlertDialog.Trigger>
                            <IconButton radius="full" color="red" size="1" >
                                <TrashIcon className="h-6 w-4 text-white hover:scale-125 transition-transform duration-200"/>
                            </IconButton>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content maxWidth="450px">
                            <AlertDialog.Title>Delete Confirmation Required</AlertDialog.Title>
                            <AlertDialog.Description size="2">
                                Are you sure? This Transaction Record will be permanently deleted.
                            </AlertDialog.Description>
                            <Flex gap="3" mt="4" justify="end">
                                <AlertDialog.Cancel>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action>
                                    <Button variant="solid" color="red" onClick={handleDeleteClick}>
                                        Confirm Delete
                                    </Button>
                                </AlertDialog.Action>
                            </Flex>
                        </AlertDialog.Content>
                    </AlertDialog.Root>
                );
            }

            return (
                <Flex gap="1" direction={"row"} justify={'center'}>
                    <IconButton radius="full" color="orange" size="1" onClick={handleEditClick}>
                        <EditIcon className="h-6 w-4 text-white hover:scale-125 transition-transform duration-200"/>
                    </IconButton>
                    {isAdmin && <DeleteButtonWithConfirmation/>}
                </Flex>
            );
        }
    }
}

