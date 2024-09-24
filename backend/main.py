from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.db_utilities.get_table_from_db import get_table
from backend.db_utilities.patch_transaction import patch_transaction
from backend.db_utilities.post_record_to_db import post_transaction
from backend.db_utilities.delete_record_from_db import delete_record
from pydantic import BaseModel
from backend.utilities.jwt_handling import decode_jwt_token, get_username_from_jwt
from backend.utilities.user_auth import is_admin, is_logged_in

app = FastAPI()

# all origins are allowed to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/transactions")
async def get_transactions(jwt_token: str):
    if not is_logged_in(jwt_token):
        return "User is not logged in"
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

@app.get("/isadmin")
async def is_admin(jwt_token: str):
    decoded_token = decode_jwt_token(jwt_token)
    username = decoded_token["cognito:username"]
    return is_admin(username)

# Post APIs
@app.post("/createtransaction")
async def post_transactions(transaction: Transaction):
    return post_transaction(transaction.customer_id_fk, transaction.title_id_fk, transaction.transaction_status_fk,
                            transaction.payment_method_fk, transaction.country_code_fk, transaction.currency_code_fk,
                            transaction.timestamp, transaction.number_of_attempts, transaction.mfa_status_fk,
                            transaction.amount)


# DELETE APIs

@app.delete("/deletetransaction/{transaction_id}")
async def delete_transaction(transaction_id: str, jwt_token: str):
    decoded_token = decode_jwt_token(jwt_token)
    username = get_username_from_jwt(decoded_token)
    if not is_admin(username):
        return f"{username} is not authorized to delete a transaction"
    else:
        return delete_record("transaction", transaction_id)

@app.patch("/updatetransaction/{transaction_id}")
async def update_transaction(transaction_id: str, transaction: Transaction):
    return patch_transaction(transaction_id, transaction.customer_id_fk, transaction.title_id_fk, transaction.transaction_status_fk,
                             transaction.payment_method_fk, transaction.country_code_fk, transaction.currency_code_fk,
                             transaction.timestamp, transaction.number_of_attempts, transaction.mfa_status_fk,
                             transaction.amount)