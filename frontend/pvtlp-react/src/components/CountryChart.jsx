import {Bar, BarChart, CartesianGrid, ReferenceLine, XAxis, YAxis} from "recharts";
import { chartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "./ui/chart";
import {Flex, Heading, Select} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { getCallToBackend } from "../utils/api_call_backend";
import { API_Endpoint } from "../utils/api_endpoints";
import { Transaction } from "../tables/data";
import Flag from "react-world-flags";

export const CountryRecordsChart = () => {
    const headingText = "Number of Transactions by Country";
    const [chartData, setChartData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const transactions = await getCallToBackend(API_Endpoint.Transactions, Transaction);

                const groupedData = transactions.reduce((acc, transaction) => {
                    const { country_code_fk, transaction_status_fk } = transaction;
                    if (!acc[country_code_fk]) {
                        acc[country_code_fk] = { country: country_code_fk, transactions: 0, successful: 0 };
                    }
                    acc[country_code_fk].transactions += 1;
                    if (transaction_status_fk === "Successful") {
                        acc[country_code_fk].successful += 1;
                    }
                    return acc;
                }, {});

                const formattedData = Object.values(groupedData).map(data => ({
                    country: data.country,
                    numberOfAllTransactions: data.transactions,
                    numberOfSuccessfulTransactions: data.successful
                }));

                setChartData(formattedData);
                setFilteredData(formattedData);
                setCountries(Object.keys(groupedData));
            } catch (error) {
                console.error("Error fetching transactions: ", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log("Selected Country: ", selectedCountry);
        if (selectedCountry === "" || selectedCountry === undefined) {
            setFilteredData(chartData);
        } else {
            setFilteredData(chartData.filter(data => data.country === selectedCountry));
        }
    }, [selectedCountry, chartData]);
const averageAllTransactions = chartData.reduce((sum, data) => sum + data.numberOfAllTransactions, 0) / chartData.length;
const averageSuccessfulTransactions = chartData.reduce((sum, data) => sum + data.numberOfSuccessfulTransactions, 0) / chartData.length;

    return (
        <div className="p-5">
            <Flex className=" rounded-lg shadow-2xl shadow-black" direction={"column"} gap={"2"}>
                <Heading className="p-4 text-center">{headingText}</Heading>
                <Flex className="p-4 text-center" justify={"start"} direction={"row"} align={"center"}>
                    <label className="p-2">Select Country:</label>
                    <div>
                        <Select.Root onValueChange={setSelectedCountry} >
                            <Select.Trigger className="border border-black" radius="large"/>
                            <Select.Content color="gray" variant="solid" highContrast position="popper">
                                <Select.Item  key="all" >All Countries</Select.Item>
                                {countries.map(country => (
                                    <Select.Item key={country} value={country} >
                                        <Flex justify={"center"} direction={"row"} gap="3" align={"center"}>
                                            <Flag  code={country} className="rounded border-1" height="10" width="35"/> {country}
                                        </Flex>
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Root>

                    </div>

            </Flex><ChartContainer config={chartConfig} className="min-h-[200px] w-full p-5 h-[60vh]">
            <BarChart accessibilityLayer data={filteredData}>
                <CartesianGrid vertical={false}/>
                <XAxis
                    dataKey={"country"}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}/>
                <YAxis
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickCount={5}
                    tickFormatter={(value) => `${value}`}/>
                <ChartTooltip content={<ChartTooltipContent/>}/>
                <ChartLegend content={<ChartLegendContent/>}/>
                <Bar dataKey="numberOfAllTransactions" fill={chartConfig.numberOfAllTransactions.color} radius={4}/>
                <Bar dataKey="numberOfSuccessfulTransactions" fill={chartConfig.numberOfSuccessfulTransactions.color}
                     radius={4}/>
<ReferenceLine
    y={averageAllTransactions}
    label={{
        value: `Avg All Transactions: ${averageAllTransactions.toFixed(2)}`,
        fill: 'black',
        background: { fill: 'white', stroke: 'white', strokeWidth: 1, radius: 3 }
    }}
    stroke="white"
    strokeDasharray="3 3"
/>
<ReferenceLine
    y={averageSuccessfulTransactions}
    label={{
        value: `Avg Successful Transactions: ${averageSuccessfulTransactions.toFixed(2)}`,
        fill: 'white',
        background: 'black',
    }}
    stroke="white"
    strokeDasharray="3 3"
/>
            </BarChart>
        </ChartContainer>
        </Flex>
        </div>
    );
};