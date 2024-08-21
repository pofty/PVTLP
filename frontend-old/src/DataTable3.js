import {Button, Flex, Table, Theme} from "@radix-ui/themes";
import * as React from "react";
import {columns} from "./data.js";
export default function DataTable3() {
    function GetHeaderCell({headerName}) {
        return <Table.ColumnHeaderCell>{headerName}</Table.ColumnHeaderCell>;
    }

    return (
        <Theme accentColor="Gray-12" radius="large">
            <Flex direction="row" gap="2">

                <Table.Root variant="surface" layout="auto">
                    <Table.Header>
                        <Table.Row align="center" className="bg-black text-white">
                            {columns.map((item) => (
                                <GetHeaderCell key={item.name} headerName={item.name} />
                            ))}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        <Table.Row>
                            <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
                            <Table.Cell>jasper@example.com</Table.Cell>
                            <Table.Cell> <Button className="bg-black text-white">Let's go</Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>


            </Flex>
        </Theme>
    )
}