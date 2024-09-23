import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { chartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "./ui/chart";
import { Heading } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { getCallToBackend } from "../utils/api_call_backend";
import { API_Endpoint } from "../utils/api_endpoints";
import { Transaction } from "../tables/data";

export const CountryRecordsChart = () => {
    const headingText = "Number of Transactions by Country";
  const [chartData, setChartData] = useState([
    { country: "UK", numberOfAllTransactions: 186, numberOfSuccessfulTransactions: 80 },
    { country: "DUB", numberOfAllTransactions: 186, numberOfSuccessfulTransactions: 80 },
    { country: "RUZ", numberOfAllTransactions: 186, numberOfSuccessfulTransactions: 80 },
  ]);

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
        console.log("formattedData: ", formattedData);
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching transactions: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-2 rounded-lg shadow-2xl shadow-black">
      <Heading className="p-4 text-center">{headingText}</Heading>
        <br/>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={"country"}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickCount={5}
            tickFormatter={(value) => `${value}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="numberOfAllTransactions" fill={chartConfig.numberOfAllTransactions.color} radius={4} />
          <Bar dataKey="numberOfSuccessfulTransactions" fill={chartConfig.numberOfSuccessfulTransactions.color} radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
