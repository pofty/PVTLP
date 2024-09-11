from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, inspect
from db_auth_cred import user, password, host, port, database


# PostgreSQL connection string format
connection_string = f'postgresql+psycopg2://{user}:{password}@{host}:{port}/{database}'

# Create an engine
engine = create_engine(connection_string)

# Create an inspector
inspector = inspect(engine)

# Get all table names
tables = inspector.get_table_names()

# Print table names
for table in tables:
    print(table)

