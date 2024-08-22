const columns = [
    {name: "Transaction Id", uid: "transactionId"},
    {name: "Transaction Status", uid: "transactionStatus"},
    {name: "Timestamp", uid: "timestamp"},
    {name: "Customer", uid: "name"},
    {name: "MFA Status", uid: "mfaStatus"},
    {name: "Amount", uid: "amount"},
    {name: "Country", uid: "Country"},
    {name: "payment Method", uid: "paymentMethod"},
    {name: "Actions", uid: "actions"},
];

const transactions = [
    {
        transactionId: "TXN001",
        transactionStatus: "Completed",
        timestamp: "2023-08-21T10:30:00Z",
        name: "John Doe",
        mfaStatus: "Enabled",
        amount: 250.75,
        currency: "USD",
        paymentMethod: "Credit Card",
        actions: "View"
    },
    {
        transactionId: "TXN002",
        transactionStatus: "Pending",
        timestamp: "2023-08-21T11:15:00Z",
        name: "Jane Smith",
        mfaStatus: "Disabled",
        amount: 120.50,
        currency: "EUR",
        paymentMethod: "PayPal",
        actions: "Retry"
    },
    {
        transactionId: "TXN003",
        transactionStatus: "Failed",
        timestamp: "2023-08-21T12:45:00Z",
        name: "Alice Johnson",
        mfaStatus: "Enabled",
        amount: 75.00,
        currency: "GBP",
        paymentMethod: "Debit Card",
        actions: "Retry"
    },
    {
        transactionId: "TXN004",
        transactionStatus: "Completed",
        timestamp: "2023-08-21T14:20:00Z",
        name: "Bob Brown",
        mfaStatus: "Enabled",
        amount: 300.99,
        currency: "USD",
        paymentMethod: "Credit Card",
        actions: "View"
    },
    {
        transactionId: "TXN005",
        transactionStatus: "Pending",
        timestamp: "2023-08-21T15:35:00Z",
        name: "Carol White",
        mfaStatus: "Disabled",
        amount: 50.00,
        currency: "CAD",
        paymentMethod: "Bank Transfer",
        actions: "Cancel"
    },
    {
        transactionId: "TXN006",
        transactionStatus: "Completed",
        timestamp: "2023-08-21T16:10:00Z",
        name: "David Green",
        mfaStatus: "Enabled",
        amount: 600.00,
        currency: "AUD",
        paymentMethod: "Credit Card",
        actions: "View"
    },
    {
        transactionId: "TXN007",
        transactionStatus: "Failed",
        timestamp: "2023-08-21T17:45:00Z",
        name: "Eve Black",
        mfaStatus: "Disabled",
        amount: 90.25,
        currency: "USD",
        paymentMethod: "PayPal",
        actions: "Retry"
    },
    {
        transactionId: "TXN008",
        transactionStatus: "Completed",
        timestamp: "2023-08-21T18:30:00Z",
        name: "Frank Yellow",
        mfaStatus: "Enabled",
        amount: 150.00,
        currency: "EUR",
        paymentMethod: "Credit Card",
        actions: "View"
    },
    {
        transactionId: "TXN009",
        transactionStatus: "Pending",
        timestamp: "2023-08-21T19:15:00Z",
        name: "Grace Blue",
        mfaStatus: "Disabled",
        amount: 230.10,
        currency: "GBP",
        paymentMethod: "Debit Card",
        actions: "Cancel"
    },
    {
        transactionId: "TXN010",
        transactionStatus: "Completed",
        timestamp: "2023-08-21T20:00:00Z",
        name: "Hank Red",
        mfaStatus: "Enabled",
        amount: 500.00,
        currency: "USD",
        paymentMethod: "Credit Card",
        actions: "View"
    }
];

export {columns, transactions};
