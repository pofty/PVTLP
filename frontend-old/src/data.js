import React from "react";
const columns = [
    {name: "Transaction Id", uid: "transactionId"},
    {name: "Transaction Status", uid: "transactionStatus"},
    {name: "Timestamp", uid: "timestamp"},
    {name: "Customer", uid: "name"},
    {name: "MFA Status", uid: "mfaStatus"},
    {name: "Amount", uid: "amount"},
    {name: "Currency", uid: "currency"},
    {name: "payment Method", uid: "paymentMethod"},
    {name: "ACTIONS", uid: "actions"},
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "T",
    age: "29",
    avatar: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Senior Developer",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "Community Manager",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  }
];

export {columns, users};
