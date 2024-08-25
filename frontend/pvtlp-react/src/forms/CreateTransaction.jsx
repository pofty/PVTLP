import React, { useState, useEffect } from 'react';
import { Field, Label, Switch } from '@headlessui/react';
import { getCustomers, getTransactions } from '../utils/api_call_backend';
import { ISO_4217_CURRENCIES, COUNTRIES } from '../utils/constants';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import {FlipWords} from "../components/FlipWordsDemo";

function AgreementField({ agreed, setAgreed }) {
  return (
    <Field className="flex gap-x-4 sm:col-span-2">
      <div className="flex h-6 items-center">
        <Switch
          checked={agreed}
          onChange={setAgreed}
          className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
        >
          <span className="sr-only">Agree to policies</span>
          <span
            aria-hidden="true"
            className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
          />
        </Switch>
      </div>
      <p className="text-sm leading-6 text-gray-600">
        By selecting this, you agree to our{' '}
        <a href="https://www.primevideo.com/help?nodeId=202095490&view-type=content-only" target="_blank" className="font-semibold text-indigo-600">
          Prime Video Terms and Conditions
        </a>
        .
      </p>
    </Field>
  );
}

function Header() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="mt-2 text-lg leading-8 text-gray-600">
        Create a transaction record in Prime Video Transaction Ledger Portal
      </p>
    </div>
  );
}

function SubmitButton() {
  return (
    <div className="mt-10">
      <button
        type="submit"
        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Let's talk
      </button>
    </div>
  );
}

function Form({ agreed, setAgreed, customers, titles }) {
  const [numberOfAttempts, setNumberOfAttempts] = useState(1);
  const [timestamp, setTimestamp] = useState(new Date());
  const [mfaStatus, setMfaStatus] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const [customerId, setCustomerId] = useState(null);
  const [titleId, setTitleId] = useState(null);
  const [currencyCode, setCurrencyCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState(1);

  const mfaStatusOptions = [
    { value: 'Grandfathered', label: 'Grandfathered' },
    { value: 'Exempted', label: 'Exempted' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Cancelled', label: 'Cancelled' },
  ];

  const transactionStatusOptions = [
    { value: 'Failed', label: 'Failed' },
    { value: 'Grandfathered', label: 'Grandfathered' },
    { value: 'Exempted', label: 'Exempted' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Cancelled', label: 'Cancelled' },
  ];

  const paymentMethodOptions = [
    { value: 'Credit Card', label: 'Credit Card' },
    { value: 'PayPal', label: 'PayPal' },
    { value: 'Debit Card', label: 'Debit Card' },
    { value: 'Bank Transfer', label: 'Bank Transfer' },
  ];

  const loadCustomerOptions = async (inputValue) => {
    const customers = await getCustomers();
    return customers.map((customer) => ({
      value: customer.customer_id_pk,
      label: `${customer.first_name} ${customer.last_name}`,
    }));
  };

  const loadTitleOptions = async (inputValue) => {
    const titles = await getTransactions();
    return titles.map((title) => ({
      value: title.title_id_fk,
      label: title.title_id_fk,
    }));
  };

  return (
    <form action="#" method="POST" className="mx-auto mt-8 max-w-xl">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label htmlFor="number-of-attempts" className="block text-sm font-semibold leading-6 text-gray-900">
            Number of Attempts
          </label>
          <div className="mt-2.5">
            <input
              id="number-of-attempts"
              name="number-of-attempts"
              type="number"
              min="1"
              max="10"
              value={numberOfAttempts}
              onChange={(e) => setNumberOfAttempts(e.target.value)}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="timestamp" className="block text-sm font-semibold leading-6 text-gray-900">
            Timestamp
          </label>
          <div className="mt-2.5">
            <DatePicker
              selected={timestamp}
              onChange={(date) => setTimestamp(date)}
              showTimeSelect
              dateFormat="Pp"
              minDate={new Date('2010-01-01')}
              maxDate={new Date()}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button type="button" onClick={() => setTimestamp(new Date())} className="mt-2 text-indigo-600">
              Now
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="mfa-status" className="block text-sm font-semibold leading-6 text-gray-900">
            MFA Status
          </label>
          <div className="mt-2.5">
            <Select
              id="mfa-status"
              name="mfa-status"
              options={mfaStatusOptions}
              value={mfaStatusOptions.find((option) => option.value === mfaStatus)}
              onChange={(option) => setMfaStatus(option.value)}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="transaction-status" className="block text-sm font-semibold leading-6 text-gray-900">
            Transaction Status
          </label>
          <div className="mt-2.5">
            <Select
              id="transaction-status"
              name="transaction-status"
              options={transactionStatusOptions}
              value={transactionStatusOptions.find((option) => option.value === transactionStatus)}
              onChange={(option) => setTransactionStatus(option.value)}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="customer-id" className="block text-sm font-semibold leading-6 text-gray-900">
            Customer
          </label>
          <div className="mt-2.5">
            <AsyncSelect
              id="customer-id"
              name="customer-id"
              loadOptions={loadCustomerOptions}
              value={customerId}
              onChange={(option) => setCustomerId(option.value)}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="title-id" className="block text-sm font-semibold leading-6 text-gray-900">
            Title
          </label>
          <div className="mt-2.5">
            <AsyncSelect
              id="title-id"
              name="title-id"
              loadOptions={loadTitleOptions}
              value={titleId}
              onChange={(option) => setTitleId(option.value)}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="currency-code" className="block text-sm font-semibold leading-6 text-gray-900">
            Currency
          </label>
          <div className="mt-2.5">
            <Select
              id="currency-code"
              name="currency-code"
              options={ISO_4217_CURRENCIES}
              value={ISO_4217_CURRENCIES.find((option) => option.value === currencyCode)}
              onChange={(option) => setCurrencyCode(option.value)}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="country-code" className="block text-sm font-semibold leading-6 text-gray-900">
            Country
          </label>
          <div className="mt-2.5">
            <Select
              id="country-code"
              name="country-code"
              options={COUNTRIES}
              value={COUNTRIES.find((option) => option.value === countryCode)}
              onChange={(option) => setCountryCode(option.value)}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="payment-method" className="block text-sm font-semibold leading-6 text-gray-900">
            Payment Method
          </label>
          <div className="mt-2.5">
            <Select
              id="payment-method"
              name="payment-method"
              options={paymentMethodOptions}
              value={paymentMethodOptions.find((option) => option.value === paymentMethod)}
              onChange={(option) => setPaymentMethod(option.value)}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-semibold leading-6 text-gray-900">
            Amount
          </label>
          <div className="mt-2.5">
            <input
              id="amount"
              name="amount"
              type="number"
              min="1"
              max="200"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <AgreementField agreed={agreed} setAgreed={setAgreed} />
      </div>
      <SubmitButton />
    </form>
  );
}

export default function CreateTransaction() {
  const [agreed, setAgreed] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    getCustomers().then(setCustomers);
    getTransactions().then(setTitles);
  }, []);

  return (
      <div className="isolate bg-white ">
          <div className=" flex justify-center items-center px-8">
              <div className="text-5xl mx-auto font-normal text-blue-500 font-bold">
                  Prime Video
                  <FlipWords words={["Movies", "Shows", "Live Sport"]}/> <br/>
              </div>


          </div>
          <Header/>
          <Form agreed={agreed} setAgreed={setAgreed} customers={customers} titles={titles}/>
      </div>
  );
}
