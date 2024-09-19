from sqlalchemy import create_engine, MetaData, Table, Column, ForeignKey
from sqlalchemy import Text, Boolean, SmallInteger, UUID, TIMESTAMP, CHAR, VARCHAR
import uuid
from backend.db_auth_cred import connection_string

engine = create_engine(connection_string)

# Initialize metadata
metadata = MetaData()

# Define the tables with all fields marked as not null
transaction_status = Table(
    'transaction_status', metadata,
    Column('status_name_pk', VARCHAR(20), primary_key=True, nullable=False)
)

mfa_status = Table(
    'mfa_status', metadata,
    Column('status_name_pk', VARCHAR(20), primary_key=True, nullable=False)
)

title = Table(
    'title', metadata,
    Column('title_id_pk', UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False),
    Column('name', VARCHAR(100), nullable=False)
)

currency = Table(
    'currency', metadata,
    Column('currency_iso_4217_code_pk', CHAR(3), primary_key=True, nullable=False)
)

country = Table(
    'country', metadata,
    Column('country_iso_alpha_code_pk', CHAR(3), primary_key=True, nullable=False)
)

payment_method = Table(
    'payment_method', metadata,
    Column('payment_method_pk', VARCHAR(20), primary_key=True, nullable=False)
)

customer = Table(
    'customer', metadata,
    Column('customer_id_pk', UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False),
    Column('first_name', VARCHAR(100), nullable=False),
    Column('last_name', VARCHAR(100), nullable=False),
    Column('note', Text, nullable=True),
    Column('home_country_code_fk', CHAR(3), ForeignKey('country.country_iso_alpha_code_pk'), nullable=False)
)

transaction = Table(
    'transaction', metadata,
    Column('transaction_id_pk', UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False),
    Column('number_of_attempts', SmallInteger, nullable=False),
    Column('timestamp', TIMESTAMP, nullable=False),
    Column('mfa_status_fk', VARCHAR(20), ForeignKey('mfa_status.status_name_pk'), nullable=False),
    Column('transaction_status_fk', VARCHAR(20), ForeignKey('transaction_status.status_name_pk'), nullable=False),
    Column('customer_id_fk', UUID(as_uuid=True), ForeignKey('customer.customer_id_pk'), nullable=False),
    Column('title_id_fk', UUID(as_uuid=True), ForeignKey('title.title_id_pk'), nullable=False),
    Column('currency_code_fk', CHAR(3), ForeignKey('currency.currency_iso_4217_code_pk'), nullable=False),
    Column('country_code_fk', CHAR(3), ForeignKey('country.country_iso_alpha_code_pk'), nullable=False),
    Column('payment_method_fk', VARCHAR(20), ForeignKey('payment_method.payment_method_pk'), nullable=False),
    Column('amount', SmallInteger, nullable=False)
)

pvtlp_user = Table(
    'pvtlp_user', metadata,
    Column('pvtlp_username_pk', VARCHAR(128), primary_key=True, nullable=False),
    Column('is_admin', Boolean, nullable=False)
)

# Create all tables in the database
def create_tables():
    metadata.create_all(engine)
    print("Database structure created successfully!")