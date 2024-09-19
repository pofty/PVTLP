import sqlalchemy
from sqlalchemy import create_engine
from uuid import UUID
from datetime import datetime
from backend.db_auth_cred import connection_string

def get_table(table_name: str):
    global engine
    engine = create_engine(connection_string)
    metadata = sqlalchemy.MetaData()
    transaction = sqlalchemy.Table(table_name, metadata, autoload_with=engine)
    with engine.connect() as conn:
        result = conn.execute(transaction.select())
        rows = result.fetchall()
        column_names = result.keys()
        # Convert each row to a dictionary
        data = []
        for row in rows:
            row_dict = {}
            for key, value in zip(column_names, row):
                if isinstance(value, UUID):
                    row_dict[key] = str(value)  # Convert UUID to string
                elif isinstance(value, datetime):
                    row_dict[key] = value.isoformat()  # Convert datetime to ISO 8601 string
                else:
                    row_dict[key] = value
            data.append(row_dict)

        return data


print(get_table("transaction"))