import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {Divider} from "@aws-amplify/ui-react";
import {Flex, Text, DropdownMenu, Button, Select, Spinner, Badge} from "@radix-ui/themes";
import {getCallToBackend, postCallToBackend, updateTransactionCallToBackend} from '../utils/api_call_backend';
import {FlipWords} from "../components/FlipWordsDemo";
import {AgreementField} from "../components/AgreementField";
import {TimestampField} from "../components/TimeStampField";
import {NumberField} from "../components/AmoutField";
import {SubmitButton} from "../components/SubmitButton";
import {Country, Currency, Customer, MFAStatus, PaymentMethod, Title, TransactionStatus} from "../tables/data";
import {API_Endpoint} from "../utils/api_endpoints";
import {getCountryCell} from "../components/CoutryFlag";
import {BackgroundGradient} from "../components/background-gradient";
import {CalloutMessage} from "../components/CalloutMessage";
import {AsyncSelectField} from "../components/AsyncMenu";
import {EditFormContext, defaultTransactionFormProps} from "../EditFormContext";
import {ArrowLeftIcon} from "@radix-ui/react-icons";
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserContext";
import useAuthRedirect from "../lib/useAuthRedirect";

const Form = () => {
    const {transactionProps} = useContext(EditFormContext);
    const [customerId, setCustomerId] = useState(transactionProps.passedCustomerId);
    const [numberOfAttempts, setNumberOfAttempts] = useState(transactionProps.passedNumberOfAttempts);
    const [timestamp, setTimestamp] = useState(transactionProps.passedTimestamp);
    const [mfaStatus, setMfaStatus] = useState(transactionProps.passedMfaStatus);
    const [transactionStatus, setTransactionStatus] = useState(transactionProps.passedTransactionStatus);
    const [titleId, setTitleId] = useState(transactionProps.passedTitleId);
    const [currencyCode, setCurrencyCode] = useState(transactionProps.passedCurrencyCode);
    const [countryCode, setCountryCode] = useState(transactionProps.passedCountryCode);
    const [paymentMethod, setPaymentMethod] = useState(transactionProps.passedPaymentMethod);
    const [amount, setAmount] = useState(transactionProps.passedAmount);
    const [isCalloutVisible, setIsCalloutVisible] = useState(transactionProps.passedIsCalloutVisible);
    const [calloutMessage, setCalloutMessage] = useState(transactionProps.passedCalloutMessage);
    const [calloutColor, setCalloutColor] = useState("purple");
    const [agreed, setAgreed] = useState(false);
    const [isSubmitButtonEnabled, setIsSubmitButton] = useState(false);
    const navigate = useNavigate();


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
    useEffect(() => {
        validateForm();
    }, [customerId, titleId, countryCode, currencyCode, paymentMethod, mfaStatus, transactionStatus, amount, timestamp, agreed]);

    function validateForm() {
        if (customerId && titleId && countryCode && currencyCode && paymentMethod && mfaStatus && transactionStatus && amount && timestamp && agreed) {
            setIsSubmitButton(true);
            console.log("all set")
        } else {
            setIsSubmitButton(false);
        }
    }

    function postTransaction() {
        const transaction = {
            customer_id_fk: customerId,
            title_id_fk: titleId,
            country_code_fk: countryCode,
            currency_code_fk: currencyCode,
            payment_method_fk: paymentMethod,
            transaction_status_fk: transactionStatus,
            amount: amount,
            timestamp: timestamp,
            number_of_attempts: numberOfAttempts,
            mfa_status_fk: mfaStatus
        };

        console.log("Posting transaction: ", transaction);
        postCallToBackend(API_Endpoint.Create_Transaction, transaction).then(r => {
            console.log("Transaction posted: ", r);
            setIsCalloutVisible(true);
            setCalloutColor("green");
            setCalloutMessage("Transaction posted successfully, Transaction ID: " + r);
        }).catch(error => {
            console.error("Error posting transaction: ", error);
            setIsCalloutVisible(true);
            setCalloutMessage("Error posting transaction");
        });
    }

    function patchTransaction() {
        const transaction = {
            customer_id_fk: customerId,
            title_id_fk: titleId,
            country_code_fk: countryCode,
            currency_code_fk: currencyCode,
            payment_method_fk: paymentMethod,
            transaction_status_fk: transactionStatus,
            amount: amount,
            timestamp: timestamp,
            number_of_attempts: numberOfAttempts,
            mfa_status_fk: mfaStatus
        };

        console.log("patching transaction: ", transaction);
        updateTransactionCallToBackend(transactionProps.passedTransactionId, transaction).then(r => {
            console.log("Transaction patching: ", transactionProps.passedTransactionId );
            setIsCalloutVisible(true);
            setCalloutColor("green");
            setCalloutMessage("Transaction patching successfully, ID: " + transactionProps.passedTransactionId);
        }).catch(error => {
            console.error("Error patching transaction: ", error);
            setIsCalloutVisible(true);
            setCalloutMessage("Error patching transaction");
        });
    }

    function SubmitFormButton() {
        const submitButtonText = transactionProps.passedTransactionId ? "Update" : "Submit";
        return (
            <div className="sm:col-span-2">
                <Button variant="solid" className={`mt-2 w-full shadow-sm`} disabled={!isSubmitButtonEnabled}
                        type="submit">
                    {isSubmitButtonEnabled ? submitButtonText : <Spinner/>}
                    {isSubmitButtonEnabled ? "" : "fill in all fields"}
                </Button>
            </div>
        );
    }
    function GoBackToTransactionTable() {
        return (
            <div className='size-16'>
                <Button color="gray" variant="outline" highContrast
                        onClick={() => navigate("/TransactionsPage")}
                    >
                    <ArrowLeftIcon/> Go Back to Transaction Table
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            transactionProps.passedTransactionId ? patchTransaction() : postTransaction();
        }} method="POST" className="shadow-lg mx-auto mt-8 max-w-xl ">
            <BackgroundGradient>
                <div className="rounded-md grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 p-5 bg-white">
                    {transactionProps.passedTransactionId ? <GoBackToTransactionTable/> : null}
                    <CalloutMessage message={calloutMessage} visible={isCalloutVisible}
                                    setVisibility={setIsCalloutVisible} calloutColor={calloutColor} duration={2000}/>

                    {transactionProps.passedTransactionId ? (
                        <CalloutMessage
                            message={"Editing Transaction id: " + transactionProps.passedTransactionId}
                            visible={true}
                            setVisibility={setIsCalloutVisible}
                            calloutColor={calloutColor}
                            duration={0}
                        />
                    ) : null}

                    <AsyncSelectField fieldName="Customer" loadOptions={loadCustomerOptions} value={customerId}
                                      onChange={setCustomerId} id="customer-idv" fullRow={true}/>
                    <AsyncSelectField fieldName="Title" loadOptions={loadTitleOptions} value={titleId} onChange={setTitleId}
                                      id="title-id" fullRow={true}/>
                    <AsyncSelectField fieldName="Country Of transaction" loadOptions={loadCountriesMethodOptions}
                                      value={countryCode} onChange={setCountryCode}
                                      id="country-of-transaction"/>
                    <AsyncSelectField fieldName="Currency" loadOptions={loadCurrencyOptions} value={currencyCode}
                                      onChange={setCurrencyCode}
                                      id="currency"/>
                    <AsyncSelectField fieldName="Payment Method" loadOptions={loadPaymentMethodOptions}
                                      value={paymentMethod} onChange={setPaymentMethod}
                                      id="payment-method"/>
                    <NumberField fieldName={"Amount"} number={amount} setNumber={setAmount} min={1} max={200}
                                 setCalloutVisibility={setIsCalloutVisible} setCalloutMessage={setCalloutMessage}
                                 setCalloutColor={setCalloutColor}/>
                    <DropDownSelectMenu fieldName="MFA Status" loadOptions={loadMfaStatusOptions} value={mfaStatus}
                                        onChange={setMfaStatus}
                                        id="mfa-status"/>
                    <DropDownSelectMenu fieldName="Transaction Status" loadOptions={loadTransactionStatusOptions}
                                        value={transactionStatus}
                                        onChange={setTransactionStatus} id="transaction-status"/>
                    <NumberField fieldName={"Number of Attempts"} number={numberOfAttempts}
                                 setNumber={setNumberOfAttempts} min={1} max={10} setCalloutVisibility={setIsCalloutVisible}
                                 setCalloutMessage={setCalloutMessage} setCalloutColor={setCalloutColor}/>
                    <TimestampField timestamp={timestamp} setTimestamp={setTimestamp}/>
                    <AgreementField agreed={agreed} setAgreed={setAgreed}/>
                    <SubmitFormButton/>
                </div>

            </BackgroundGradient>

        </form>
    );
};

function DefaultFormStructure(userName) {
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
            {userName ? <Form/> : null}
        </div>
    );
}

export const TransactionForm = () => {
    const { userName } = useUser();
    useAuthRedirect(userName);

    const {setTransactionProps} = useContext(EditFormContext);
    setTransactionProps(defaultTransactionFormProps);

    return DefaultFormStructure(userName);
};


export const EditTransactionForm = () => {
    const { userName } = useUser();
    useAuthRedirect(userName);

    return DefaultFormStructure(userName);
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

function DropDownSelectMenu({fieldName, loadOptions, value, onChange, id}) {
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

    useEffect(() => {
        if (value) {
            setMenuColor(GetDropDownItemColour(value));
        }
    } , [value]);

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-semibold text-gray-900 mb-2">
                {fieldName}
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

export default TransactionForm;