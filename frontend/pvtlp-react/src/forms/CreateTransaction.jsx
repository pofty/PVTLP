import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Field, Label, Switch } from '@headlessui/react';

function Background() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
    >
      <div
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
        className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
      />
    </div>
  );
}

function Header() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create Transaction</h2>
      <p className="mt-2 text-lg leading-8 text-gray-600">
        Create a transaction record in Prime Video Transaction Ledger Portal
      </p>
    </div>
  );
}

function MessageField() {
  return (
    <div className="sm:col-span-2">
      <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
        Message
      </label>
      <div className="mt-2.5">
        <textarea
          id="message"
          name="message"
          rows={4}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={''}
        />
      </div>
    </div>
  );
}

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
      <Label className="text-sm leading-6 text-gray-600">
        By selecting this, you agree to our{' '}
        <a href="#" className="font-semibold text-indigo-600">
          privacy&nbsp;policy
        </a>
        .
      </Label>
    </Field>
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

function Form({ agreed, setAgreed }) {
  return (
    <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <InputField id="transaction-id" label="Transaction Id" />
        <InputField id="transaction-status" label="Transaction Status" />
        <InputField id="timestamp" label="Timestamp" type="datetime-local" />
        <InputField id="name" label="Customer" autoComplete="name" />
        <InputField id="mfa-status" label="MFA Status" />
        <InputField id="amount" label="Amount" type="number" />
        <CurrencyField />
        <PaymentMethodField />
        <MessageField />
        <AgreementField agreed={agreed} setAgreed={setAgreed} />
      </div>
      <SubmitButton />
    </form>
  );
}

export default function Example() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <Background />
      <Header />
      <Form agreed={agreed} setAgreed={setAgreed} />
    </div>
  );
}

function InputField({ id, label, type = "text", autoComplete, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2.5">
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}

function CurrencyField() {
  return (
    <div className="sm:col-span-2">
      <label htmlFor="currency" className="block text-sm font-semibold leading-6 text-gray-900">
        Currency
      </label>
      <div className="relative mt-2.5">
        <select
          id="currency"
          name="currency"
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option>USD</option>
          <option>EUR</option>
          <option>GBP</option>
          <option>CAD</option>
          <option>AUD</option>
        </select>
      </div>
    </div>
  );
}

function PaymentMethodField() {
  return (
    <div className="sm:col-span-2">
      <label htmlFor="payment-method" className="block text-sm font-semibold leading-6 text-gray-900">
        Payment Method
      </label>
      <div className="relative mt-2.5">
        <select
          id="payment-method"
          name="payment-method"
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option>Credit Card</option>
          <option>PayPal</option>
          <option>Debit Card</option>
          <option>Bank Transfer</option>
        </select>
      </div>
    </div>
  );
}