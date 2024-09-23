import React from 'react';
import TransactionsTable from "../tables/TransactionsTable";
import {Button, Flex} from "@radix-ui/themes";
import {CountryRecordsChart} from "../components/CountryChart";

function TransactionsPage() {

    return (
        <>
            <Flex justify="center" direction="column" gap="4">

                    <CountryRecordsChart/>

                <TransactionsTable/>
            </Flex>

        </>

    );
}

export default TransactionsPage;