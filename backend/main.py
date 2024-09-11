from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data.get_table_from_db import get_table
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
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
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