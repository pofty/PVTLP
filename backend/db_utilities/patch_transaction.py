from sqlalchemy import update
from backend.db_utilities.create_db_schemas import transaction
from backend.db_utilities.global_db_variables import connection

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

#print("Records updated successfully!")