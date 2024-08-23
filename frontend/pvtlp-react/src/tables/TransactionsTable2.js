import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue} from "@nextui-org/react";
import {columns, customers, transactions01} from "./data";
import {BackgroundGradient} from "../components/background-gradient";
import {Flex, IconButton} from "@radix-ui/themes";
import {Pencil1Icon as EditIcon} from "@radix-ui/react-icons";
import { TrashIcon } from '@heroicons/react/24/outline';

export default function App() {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(transactions01.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return transactions01.slice(start, end);
    }, [page, transactions01]);
    console.log(items);

    function getTableCell(key, value) {
        console.log("print key and value");
        console.log(key, value);
        return <>
            {key === "customer_id_fk" ? (
                (() => {
                    const customer = customers.find(c => c.Id === value);
                    return customer ? (
                        <div>
                            <div>{`${customer.firstName} ${customer.lastName} ${customer.homeRegion}`}</div>
                            <div className="text-gray-500">{customer.Id}</div>
                        </div>
                    ) : value;
                })()
            ) : value}
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
                    { columns.map((item) => (
                        <TableColumn className="bg-black text-white" key={item.name}>{item.name} </TableColumn>
                    ))}
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        <TableRow key={item.transaction_id_pk}>
                            {columns.map((column) => (
                                <TableCell key={column.uid}>
                                    {(column.uid !== "actions") ? getTableCell(column.uid, getKeyValue(item, column.uid)) : <ActionsCell transactionId={item.transaction_id_pk} />}
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </BackgroundGradient>
    );
}

function ActionsCell({ transactionId }) {
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