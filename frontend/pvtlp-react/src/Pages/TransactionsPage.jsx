import React from 'react';
import TransactionsTable from "../tables/TransactionsTable";
import {Button, Flex} from "@radix-ui/themes";

function TransactionsPage() {

    return (
        <>
            <Flex justify="center" direction="column" gap="4">
                <TransactionsTable/>
            </Flex>

        </>

    );
}

export default TransactionsPage;