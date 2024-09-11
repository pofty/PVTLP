from sqlalchemy import create_engine, MetaData, select, func
from sqlalchemy.sql import insert
import random
from data.create_db_schemas import transaction_status, payment_method, mfa_status, customer, country, currency, title, \
    transaction
from data.inject_synthetic_data_to_dependency_tables import connection
from db_auth_cred import user, password, host, port, database


# PostgreSQL connection string format
connection_string = f'postgresql+psycopg2://{user}:{password}@{host}:{port}/{database}'

# Create an engine
engine = create_engine(connection_string)
connection = engine.connect()

# Initialize metadata
metadata = MetaData()

def get_random_customer_id(connection):
    customer_ids = connection.execute(select(customer.c.customer_id_pk)).fetchall()
    return random.choice(customer_ids)[0]

def get_random_title_id(connection):
    title_ids = connection.execute(select(title.c.title_id_pk)).fetchall()
    return random.choice(title_ids)[0]


# Connect to the database
with (connection):
    random_customer_id = get_random_customer_id(connection)

    # Insert records
    insert_stmt = [insert(transaction).values([
        {
            'transaction_status_fk': 'Failed',
            'payment_method_fk': 'Debit Card',
            'customer_id_fk': get_random_customer_id(connection),
            'amount': 50,
            'currency_code_fk': 'CAD',
            'timestamp': '2020-02-01 13:08:00',
            'number_of_attempts': 6,
            'title_id_fk': get_random_title_id(connection),
            'mfa_status_fk': 'Successful',
            'country_code_fk': 'CAN'
        },
        {
            'transaction_status_fk': 'Pending',
            'payment_method_fk': 'PayPal',
            'customer_id_fk': get_random_customer_id(connection),
            'amount': 75,
            'currency_code_fk': 'GBP',
            'timestamp': '2020-03-01 14:00:00',
            'number_of_attempts': 3,
            'title_id_fk': get_random_title_id(connection),
            'mfa_status_fk': 'Exempted',
            'country_code_fk': 'GBR'
        },
        {
            'transaction_status_fk': 'Cancelled',
            'payment_method_fk': 'Bank Transfer',
            'customer_id_fk': get_random_customer_id(connection),
            'amount': 90,
            'currency_code_fk': 'JPY',
            'timestamp': '2020-04-01 15:00:00',
            'number_of_attempts': 4,
            'title_id_fk': get_random_title_id(connection),
            'mfa_status_fk': 'Grandfathered',
            'country_code_fk': 'JPN'
        },
        {
            'transaction_status_fk': 'Successful',
            'payment_method_fk': 'Cash',
            'customer_id_fk': get_random_customer_id(connection),
            'amount': 30,
            'currency_code_fk': 'CHF',
            'timestamp': '2020-05-01 16:00:00',
            'number_of_attempts': 1,
            'title_id_fk': get_random_title_id(connection),
            'mfa_status_fk': 'Successful',
            'country_code_fk': 'CHE'
        },
        {
            'transaction_status_fk': 'Failed',
            'payment_method_fk': 'Gift Card',
            'customer_id_fk': get_random_customer_id(connection),
            'amount': 20,
            'currency_code_fk': 'CNY',
            'timestamp': '2020-06-01 17:00:00',
            'number_of_attempts': 5,
            'title_id_fk': get_random_title_id(connection),
            'mfa_status_fk': 'Failed',
            'country_code_fk': 'CHN'
        },
        {
            'transaction_status_fk': 'Pending',
            'payment_method_fk': 'Credit Card',
            'customer_id_fk': get_random_customer_id(connection),
            'amount': 85,
            'currency_code_fk': 'INR',
            'timestamp': '2020-07-01 18:00:00',
            'number_of_attempts': 3,
            'title_id_fk': get_random_title_id(connection),
            'mfa_status_fk': 'Exempted',
            'country_code_fk': 'IND'
        },
        {
            'transaction_status_fk': 'Cancelled',
            'payment_method_fk': 'Debit Card',
            'customer_id_fk': get_random_customer_id(connection),
            'amount': 40,
            'currency_code_fk': 'BRL',
            'timestamp': '2020-08-01 19:00:00',
            'number_of_attempts': 2,
            'title_id_fk': get_random_title_id(connection),
            'mfa_status_fk': 'Grandfathered',
            'country_code_fk': 'BRA'
        },
        {
            'transaction_status_fk': 'Successful',
            'payment_method_fk': 'PayPal',
            'customer_id_fk': get_random_customer_id(connection),
            'amount': 95,
            'currency_code_fk': 'AUD',
            'timestamp': '2020-09-01 20:00:00',
            'number_of_attempts': 1,
            'title_id_fk': get_random_title_id(connection),
            'mfa_status_fk': 'Successful',
            'country_code_fk': 'AUS'
        },
        {
            'transaction_status_fk': 'Failed',
            'payment_method_fk': 'Bank Transfer',
            'customer_id_fk': get_random_customer_id(connection),
            'amount': 60,
            'currency_code_fk': 'CAD',
            'timestamp': '2020-10-01 21:00:00',
            'number_of_attempts': 4,
            'title_id_fk': get_random_title_id(connection),
            'mfa_status_fk': 'Failed',
            'country_code_fk': 'CAN'
        },
        {
            'transaction_status_fk': 'Pending',
            'payment_method_fk': 'Cash',
            'customer_id_fk': get_random_customer_id(connection),
            'amount': 55,
            'currency_code_fk': 'NZD',
            'timestamp': '2020-11-01 22:00:00',
            'number_of_attempts': 3,
            'title_id_fk': get_random_title_id(connection),
            'mfa_status_fk': 'Exempted',
            'country_code_fk': 'NZL'
        },
        {
            'transaction_status_fk': 'Cancelled',
            'payment_method_fk': 'Gift Card',
            'customer_id_fk': get_random_customer_id(connection),
            'amount': 45,
            'currency_code_fk': 'SGD',
            'timestamp': '2020-12-01 23:00:00',
            'number_of_attempts': 2,
            'title_id_fk': get_random_title_id(connection),
            'mfa_status_fk': 'Grandfathered',
            'country_code_fk': 'SGP'
        },
        {
            'transaction_status_fk': 'Successful',
            'payment_method_fk': 'Credit Card',
            'customer_id_fk': get_random_customer_id(connection),
            'amount': 70,
            'currency_code_fk': 'EUR',
            'timestamp': '2020-01-15 10:30:00',
            'number_of_attempts': 1,
            'title_id_fk': get_random_title_id(connection),
            'mfa_status_fk': 'Successful',
            'country_code_fk': 'DEU'
        },
        {
            'transaction_status_fk': 'Failed',
            'payment_method_fk': 'Debit Card',
            'customer_id_fk': get_random_customer_id(connection),
            'amount': 65,
            'currency_code_fk': 'USD',
            'timestamp': '2020-02-15 11:45:00',
            'number_of_attempts': 4,
            'title_id_fk': get_random_title_id(connection),
            'mfa_status_fk': 'Failed',
            'country_code_fk': 'USA'
        }
    ])]



    # Execute the insert statement
    for stmt in insert_stmt:
        connection.execute(stmt)
    connection.commit()

print("Records inserted successfully!")