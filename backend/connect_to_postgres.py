from sqlalchemy import create_engine, inspect
from backend.db_auth_cred import connection_string


# Create an engine
engine = create_engine(connection_string)

# Create an inspector
inspector = inspect(engine)

# Get all table names
tables = inspector.get_table_names()

# Print table names
for table in tables:
    print(table)

