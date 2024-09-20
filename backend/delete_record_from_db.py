from sqlalchemy import create_engine, MetaData, Table, delete
from backend.db_auth_cred import connection_string

# Create an engine and initialize metadata
engine = create_engine(connection_string)
metadata = MetaData()

def delete_record(table_name, primary_key):
    table = Table(table_name, metadata, autoload_with=engine)
    stmt = delete(table).where(table.c.transaction_id_pk == primary_key)
    with engine.connect() as conn:
        result = conn.execute(stmt)
        conn.commit()
    return result.rowcount