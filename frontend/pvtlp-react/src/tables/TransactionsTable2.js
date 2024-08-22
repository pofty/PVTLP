import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue} from "@nextui-org/react";
import {transactions, columns} from "./data";
import {BackgroundGradient} from "../components/background-gradient";
import {Flex, IconButton} from "@radix-ui/themes";
import {Pencil1Icon as EditIcon} from "@radix-ui/react-icons";
import { TrashIcon } from '@heroicons/react/24/outline';

export default function App() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(transactions.length / rowsPerPage);
  console.log('pages', pages);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return transactions.slice(start, end);
  }, [page, transactions]);

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
                <TableRow key={item.transactionId}>
                    {Object.keys(item).map((columnKey) => (
                        <TableCell key={columnKey}>{getKeyValue(item, columnKey)}</TableCell>
                    ))}
                    <TableCell>
                        <ActionsCell />
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    </Table>
            </BackgroundGradient>
  );
}

function ActionsCell() {
    return (
        <Flex gap="1">
    <IconButton radius="full" color="orange" size="1">
        <EditIcon className=" h-6 w-4 text-white hover:scale-125 transition-transform duration-200" />
         </IconButton>

    <IconButton radius="full" color="red" size="1">
        <TrashIcon className="h-6 w-4 text-white hover:scale-125 transition-transform duration-200" />
         </IconButton>
        </Flex>

    );
}