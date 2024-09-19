from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.get_table_from_db import get_table
from backend.post_record_to_db import post_transaction
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to the specific domains for better security
    allow_credentials=True,
    allow_methods=["*"],  # Adjust methods as necessary
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/transactions")
async def get_transactions():
    return get_table("transaction")


@app.get("/customers")
async def get_customers():
    return get_table("customer")


@app.get("/titles")
async def get_titles():
    return get_table("title")


@app.get("/countries")
async def get_countries():
    return get_table("country")


@app.get("/currencies")
async def get_currencies():
    return get_table("currency")


@app.get("/payment_methods")
async def get_payment_methods():
    return get_table("payment_method")


@app.get("/transaction_statuses")
async def get_transaction_statuses():
    return get_table("transaction_status")


@app.get("/mfa_statuses")
async def get_mfa_statuses():
    return get_table("mfa_status")


class Transaction(BaseModel):
    customer_id_fk: str
    title_id_fk: str
    country_code_fk: str
    currency_code_fk: str
    payment_method_fk: str
    transaction_status_fk: str
    amount: float
    timestamp: str
    number_of_attempts: int
    mfa_status_fk: str


# Post APIs
@app.post("/createtransaction")
async def post_transactions(transaction: Transaction):
    return post_transaction(transaction.customer_id_fk, transaction.title_id_fk, transaction.transaction_status_fk,
                            transaction.payment_method_fk, transaction.country_code_fk, transaction.currency_code_fk,
                            transaction.timestamp, transaction.number_of_attempts, transaction.mfa_status_fk,
                            transaction.amount)


@app.post("/test")
async def test():
    return "test"
