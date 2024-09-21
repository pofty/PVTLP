from sqlalchemy import create_engine, MetaData, update
from backend.create_db_schemas import transaction
from backend.db_auth_cred import connection_string

# Create an engine
engine = create_engine(connection_string)
connection = engine.connect()

# Initialize metadata
metadata = MetaData()

def patch_transaction(transaction_id_pk: str, customer_id_fk: str, title_id_fk: str, transaction_status_fk: str, payment_method_fk: str,
                     country_code_fk: str, currency_code_fk: str, timestamp: str, number_of_attempts: int,
                     mfa_status_fk: str, amount: float):
    stmt = update(transaction).where(transaction.c.transaction_id_pk == transaction_id_pk).values(
        transaction_status_fk=transaction_status_fk,
        payment_method_fk=payment_method_fk,
        customer_id_fk=customer_id_fk,
        amount=amount,
        currency_code_fk=currency_code_fk,
        timestamp=timestamp,
        number_of_attempts=number_of_attempts,
        title_id_fk=title_id_fk,
        mfa_status_fk=mfa_status_fk,
        country_code_fk=country_code_fk
    )
    result = connection.execute(stmt)
    connection.commit()
    return result.rowcount

print("Records updated successfully!")