import React, {useState, useEffect} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import AsyncSelect from 'react-select/async';
import {Divider} from "@aws-amplify/ui-react";
import {Flex, Text, DropdownMenu, Button, Select, Slider} from "@radix-ui/themes";
import {getCallToBackend, getCustomers, getTitles, getTransactions} from '../utils/api_call_backend';

import {ISO_4217_CURRENCIES, COUNTRIES} from '../utils/constants';
import {FlipWords} from "../components/FlipWordsDemo";
import {AgreementField} from "../components/AgreementField";
import {TimestampField} from "../components/TimeStampField";
import {NumberField} from "../components/AmoutField";
import {SubmitButton} from "../components/SubmitButton";
import {
    Country,
    Currency,
    Customer,
    MFAStatus,
    PaymentMethod,
    Title,
    Transaction,
    TransactionStatus
} from "../tables/data";
import {API_Endpoint} from "../utils/api_endpoints";
import {getCountryCell} from "../components/CoutryFlag";
import {BackgroundGradient} from "../components/background-gradient";
import {CalloutMessage} from "../components/CalloutMessage";
import {AsyncSelectField} from "../components/AsyncMenu";

const Form = ({agreed, setAgreed}) => {
    const [customerId, setCustomerId] = useState(null);
    const [numberOfAttempts, setNumberOfAttempts] = useState(1);
    const [timestamp, setTimestamp] = useState(new Date());
    const [mfaStatus, setMfaStatus] = useState('');
    const [transactionStatus, setTransactionStatus] = useState('');
    const [titleId, setTitleId] = useState(null);
    const [currencyCode, setCurrencyCode] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [amount, setAmount] = useState(1);
    const [isCalloutVisible, setIsCalloutVisible] = useState(false);
    const [calloutMessage, setCalloutMessage] = useState("");

    const loadCustomerOptions = async () => {
        const customers = await getCallToBackend(API_Endpoint.Customers, Customer);
        return customers.map((customer) => ({
            value: customer.customer_id_pk,
            label: (
                <>
                    <Flex direction="column">
                        <Text size="2" weight="bold">
                            {customer.first_name} {customer.last_name}
                        </Text>
                        <Text color="gray" size="1">
                            Customer Id: {customer.customer_id_pk}    </Text>
                    </Flex>
                </>
            )
        }));
    };
    const loadTitleOptions = async () => {
        const titles = await getCallToBackend("titles", Title);
        return titles.map((title) => ({
            value: title.title_id_pk,
            label: (
                <>
                    <Flex direction="column">
                        <Text size="2" weight="bold">
                            {title.name}
                        </Text>
                        <Text color="gray" size="1">
                            Title Id: {title.title_id_pk}
                        </Text>
                    </Flex>

                </>
            )
        }));
    };
    const loadPaymentMethodOptions = async () => {
        try {
            const paymentMethods = await getCallToBackend(API_Endpoint.Payment_Methods, PaymentMethod);
            console.log("Payment Methods: ", paymentMethods);  // Debugging line
            return paymentMethods.map((paymentMethod) => ({
                value: paymentMethod.payment_method_pk,
                label: paymentMethod.payment_method_pk
            }));
        } catch (error) {
            console.error("Error fetching payment methods: ", error);
            return [];
        }
    }
    const loadCountriesMethodOptions = async () => {
        try {
            const countries = await getCallToBackend(API_Endpoint.Countries, Country);
            console.log("Countries: ", countries);  // Debugging line
            return countries.map((country) => ({
                value: country.country_iso_alpha_code_pk,
                label:
                    <Flex direction="row>" gap="3" align="center">
                        {getCountryCell(country.country_iso_alpha_code_pk)}
                        <Text size="2">
                            {country.country_iso_alpha_code_pk}
                        </Text>
                    </Flex>
            }));
        } catch (error) {
            console.error("Error fetching countries: ", error);
            return [];
        }
    }
    const loadCurrencyOptions = async () => {
        try {
            const currencies = await getCallToBackend(API_Endpoint.Currencies, Currency);
            console.log("Currencies: ", currencies);  // Debugging line
            return currencies.map((currency) => ({
                value: currency.currency_iso_4217_code_pk,
                label: currency.currency_iso_4217_code_pk
            }));
        } catch (error) {
            console.error("Error fetching currencies: ", error);
            return [];
        }
    }
    const loadMfaStatusOptions = async () => {
        try {
            const mfaStatuses = await getCallToBackend(API_Endpoint.MFA_Statues, MFAStatus);
            console.log("MFA Statuses: ", mfaStatuses);  // Debugging line

            return mfaStatuses
        } catch (error) {
            console.error("Error fetching MFA statuses: ", error);
            return [];
        }
    };
    const loadTransactionStatusOptions = async () => {
        try {
            const transactionStatuses = await getCallToBackend(API_Endpoint.Transaction_Statuses, TransactionStatus);
            console.log("Transaction Statuses: ", transactionStatuses);  // Debugging line
            return transactionStatuses;
        } catch (error) {
            console.error("Error fetching transaction statuses: ", error);
            return [];
        }
    }

    return (

        <form action="#" method="POST" className="shadow-lg mx-auto mt-8 max-w-xl ">
            <BackgroundGradient>
                <div className="rounded-md grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 p-5 bg-white">
                    <CalloutMessage message={calloutMessage} visible={isCalloutVisible} setVisibility={setIsCalloutVisible}/>

                    <AsyncSelectField label="Customer" loadOptions={loadCustomerOptions} value={customerId}
                                      onChange={setCustomerId} id="customer-idv" fullRow={true}/>
                    <AsyncSelectField label="Title" loadOptions={loadTitleOptions} value={titleId} onChange={setTitleId}
                                      id="title-id" fullRow={true}/>
                    <AsyncSelectField label="Country Of transaction" loadOptions={loadCountriesMethodOptions}
                                      value={countryCode} onChange={setCountryCode}
                                      id="country-of-transaction"/>

                    <AsyncSelectField label="Currency" loadOptions={loadCurrencyOptions} value={currencyCode}
                                      onChange={setCurrencyCode}
                                      id="currency"/>
                    <AsyncSelectField label="Payment Method" loadOptions={loadPaymentMethodOptions}
                                      value={paymentMethod} onChange={setPaymentMethod}
                                      id="payment-method"/>
                    <NumberField fieldName={"Amount"} number={amount} setNumber={setAmount} min={1} max={200} setCalloutVisibility={setIsCalloutVisible} setCalloutMessage={setCalloutMessage}/>

                    <DropDownSelectMenu label="MFA Status" loadOptions={loadMfaStatusOptions} value={mfaStatus}
                                        onChange={setMfaStatus}
                                        id="mfa-status"/>
                    <DropDownSelectMenu label="Transaction Status" loadOptions={loadTransactionStatusOptions}
                                        value={transactionStatus}
                                        onChange={setTransactionStatus} id="transaction-status"/>

                    <TimestampField timestamp={timestamp} setTimestamp={setTimestamp}/>
                    {/*<NumberField fieldName={"Number of Attempts"} number={numberOfAttempts}*/}
                    {/*             setNumber={setNumberOfAttempts} min={1} max={10} calloutVisiblity={isCalloutVisible} setCalloutMessage={setIsCalloutVisible}/>*/}
                    <AgreementField agreed={agreed} setAgreed={setAgreed}/>
                    <SubmitButton/>
                </div>

            </BackgroundGradient>

        </form>
    );
};

const CreateTransaction = () => {
    const [agreed, setAgreed] = useState(false);

    return (
        <div className="isolate bg-white">
            <div className="flex justify-start items-center px-8">
                <div className="font-bold text-5xl mx-auto text-blue-500">
                    Prime Video
                    <FlipWords words={["Movies", "TV Shows", "Live Sport", "Entertainment"]}/>
                    <br/>
                </div>
            </div>
            <Header/>
            <Form agreed={agreed} setAgreed={setAgreed}/>
        </div>
    );
};

const Header = () => (
    <div className="mx-auto max-w-2xl text-center">
        <p className="mt-2 text-lg leading-8 text-gray-600">
            Create a transaction record in Prime Video Transaction Ledger Portal
        </p>
        <Divider orientation="horizontal"/>
        <br/>
    </div>
);

function GetDropDownItemColour(value) {
    const status_to_color = {
        "Successful": "green",
        "Failed": "red",
        "Grandfathered": "gold",
        "Exempted": "jade",
        "Pending": "orange",
        "Cancelled": "red"
    };
    return status_to_color[value] || 'white';
}

function DropDownSelectMenu({label, loadOptions, value, onChange, id}) {
    const [menuColor, setMenuColor] = useState('gray');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const loadedOptions = await loadOptions();
                setOptions(loadedOptions);
                console.log("Loaded Options: ", loadedOptions);
            } catch (error) {
                console.error(error);
            }
        };

        fetchOptions();
    }, [loadOptions]);

    const handleSelect = (selectedValue) => {
        onChange(selectedValue);
        setMenuColor(GetDropDownItemColour(selectedValue));
    };

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-semibold text-gray-900 mb-2">
                {label}
            </label>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button className="mt-2 w-full shadow-sm" color={menuColor} variant="solid" size="2">
                        {options.find(option => option.status_name_pk === value)?.status_name_pk || "Select an option"}
                        <DropdownMenu.TriggerIcon/>
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    {options.map(option => (
                        <DropdownMenu.Item
                            key={option.status_name_pk}
                            onSelect={() => handleSelect(option.status_name_pk)}
                        >
                            {option.status_name_pk}
                        </DropdownMenu.Item>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    );
}


function SelectMenu({label, options, value, onChange, id}) {
    return (
        <div className="w-full">
            <label htmlFor={id} className="block text-sm font-semibold text-gray-900 mb-2">
                {label}
            </label>
            <Select.Root value={value} onValueChange={onChange}>
                <Select.Trigger className="mt-2 w-full" placeholder="Select an option">
                    {options.find(option => option.value === value)?.label || "Select an option"}
                </Select.Trigger>
                <Select.Content>
                    <Select.Group>
                        {options.map(option => (
                            <Select.Item key={option.value} value={option.value}>
                                {option.label}
                            </Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
        </div>
    );
}


export default CreateTransaction;