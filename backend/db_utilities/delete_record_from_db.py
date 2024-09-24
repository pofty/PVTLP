from sqlalchemy import Table, delete
from backend.db_utilities.global_db_variables import metadata, engine

def delete_record(table_name, primary_key):
    table = Table(table_name, metadata, autoload_with=engine)
    stmt = delete(table).where(table.c.transaction_id_pk == primary_key)
    with engine.connect() as conn:
        result = conn.execute(stmt)
        conn.commit()
    return result.rowcount