const columns = [
{name: "TransactionId", uid: "transaction_id_pk"},
{name: "TransactionStatus", uid: "transaction_status_fk"},
{name: "Timestamp", uid: "timestamp"},
{name: "Customer", uid: "customer_id_fk"},
{name: "NumberOfAttempts", uid: "number_of_attempts"},
{name: "MFAStatus", uid: "mfa_status_fk"},
{name: "Title", uid: "title_id_fk"},
{name: "Amount", uid: "amount"},
{name: "Country", uid: "country_code_fk"},
{name: "Currency", uid: "currency_code_fk"},
{name: "PaymentMethod", uid: "payment_method_fk"},
{name: "Actions", uid: "actions"},
];

export class Transaction {
    constructor(transaction_id_pk, number_of_attempts, timestamp, mfa_status_fk, transaction_status_fk, customer_id_fk, title_id_fk, currency_code_fk, country_code_fk, payment_method_fk, amount) {
        this.transaction_id_pk = transaction_id_pk;
        this.number_of_attempts = number_of_attempts;
        this.timestamp = timestamp;
        this.mfa_status_fk = mfa_status_fk;
        this.transaction_status_fk = transaction_status_fk;
        this.customer_id_fk = customer_id_fk;
        this.title_id_fk = title_id_fk;
        this.currency_code_fk = currency_code_fk;
        this.country_code_fk = country_code_fk;
        this.payment_method_fk = payment_method_fk;
        this.amount = amount;
    }
}

export class Customer {
    constructor(customer_id_pk, first_name, last_name, note, home_country_code_fk) {
        this.customer_id_pk = customer_id_pk;
        this.first_name = first_name;
        this.last_name = last_name;
        this.note = note;
        this.home_country_code_fk = home_country_code_fk;
    }
}

export class Title {
    constructor(title_id_pk, name) {
        this.title_id_pk = title_id_pk;
        this.name = name;
    }
}

export class Country {
    constructor(country_iso_alpha_code_pk) {
        this.country_iso_alpha_code_pk = country_iso_alpha_code_pk;}
}

export class Currency {
    constructor(currency_iso_4217_code_pk) {
        this.currency_iso_4217_code_pk = currency_iso_4217_code_pk;}
}

export class PaymentMethod {
    constructor(payment_method_pk, name) {
        this.payment_method_pk = payment_method_pk;
    }
}

export class TransactionStatus {
    constructor(transaction_status_name_pk) {
        this.transaction_status_name_pk = transaction_status_name_pk;
    }
}

export class MFAStatus {
    constructor(mfa_status_id_pk) {
        this.status_name_pk = mfa_status_id_pk;
    }
}

export class TransactionFormProps {

    // constructor that takes Transaction object as argument
    constructor(transaction) {
        this.passedTransactionId = transaction.transaction_id_pk;
        this.passedCustomerId = transaction.customer_id_fk;
        this.passedAmount = transaction.amount;
        this.passedCalloutMessage = "Transaction Form has loaded successfully!";
        this.passedCountryCode = transaction.country_code_fk;
        this.passedCurrencyCode = transaction.currency_code_fk;
        this.passedIsCalloutVisible = true;
        this.passedMfaStatus = transaction.mfa_status_fk;
        this.passedNumberOfAttempts = transaction.number_of_attempts;
        this.passedPaymentMethod = transaction.payment_method_fk;
        this.passedTimestamp = transaction.timestamp;
        this.passedTransactionStatus = transaction.transaction_status_fk;
        this.passedTitleId = transaction.title_id_fk;
    }
}

export {columns};
