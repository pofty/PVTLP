const columns = [
    {name: "Transaction Id", uid: "transaction_id_pk"},
    {name: "Transaction Status", uid: "transaction_status_fk"},
    {name: "Timestamp", uid: "timestamp"},
    {name: "Customer", uid: "customer_id_fk"},
    {name: "Number of Attempts", uid: "number_of_attempts"},
    {name: "MFA Status", uid: "mfa_status_fk"},
    {name: "Title", uid: "title_id_fk"},
    {name: "Amount", uid: "amount"},
    {name: "Country", uid: "country_code_fk"},
    {name: "Currency", uid: "currency_code_fk"},
    {name: "Payment Method", uid: "payment_method_fk"},
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
export const transactions01 = [
    new Transaction("355bf501-ffea-4f5a-a9e2-16074de6fcf2", 3, "2023-08-21T10:30:00Z", "Grandfathered", "Completed", "355bf501-ffea-4f5a-a9e2-16074de6fcf2", "Harry Potter and the Philosopher's Stone", "USD", "USA", "Credit Card", 250.75),
    ];

export {columns};
