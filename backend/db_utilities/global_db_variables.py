from sqlalchemy import create_engine, inspect, MetaData
from backend.db_auth_cred import connection_string

engine = create_engine(connection_string)
connection = engine.connect()
metadata = MetaData()
inspector = inspect(engine)