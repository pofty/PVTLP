import sqlalchemy
from uuid import UUID
from datetime import datetime
from backend.db_utilities.global_db_variables import engine, metadata

def get_table(table_name: str):

    transaction = sqlalchemy.Table(table_name, metadata, autoload_with=engine)
    with engine.connect() as conn:
        result = conn.execute(transaction.select())
        rows = result.fetchall()
        column_names = result.keys()
        # Convert each row to a dictionary
        data = []
        for row in rows:
            row_dict = {}
            # some data types are converted for the ease of use and API handling
            for key, value in zip(column_names, row):
                if isinstance(value, UUID):
                    row_dict[key] = str(value)  # Convert UUID to string
                elif isinstance(value, datetime):
                    row_dict[key] = value.isoformat()  # Convert datetime to string
                else:
                    row_dict[key] = value
            data.append(row_dict)

        return data


#print(get_table("pvtlp_user"))