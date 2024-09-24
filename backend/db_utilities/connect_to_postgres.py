from global_db_variables import inspector

# This script is not used by any of the APIs
# and is only used for debugging purposes

tables = inspector.get_table_names()

for table in tables:
    print(table)

