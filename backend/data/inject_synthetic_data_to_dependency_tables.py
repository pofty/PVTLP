from sqlalchemy import create_engine, MetaData, Table, Column, VARCHAR
from sqlalchemy.sql import insert
import pycountry
from data.create_db_schemas import transaction_status, payment_method, mfa_status, customer, country, currency, title
from db_auth_cred import user, password, host, port, database


# PostgreSQL connection string format
connection_string = f'postgresql+psycopg2://{user}:{password}@{host}:{port}/{database}'

# Create an engine
engine = create_engine(connection_string)
countries = pycountry.countries

# Initialize metadata
metadata = MetaData()

# Connect to the database
with (engine.connect() as connection):
    # Insert records
    insert_stmt = [
        insert(country).values([
            {'country_iso_alpha_code_pk': country.alpha_3} for country in pycountry.countries
        ]),
        insert(currency).values([
            {'currency_iso_4217_code_pk': currency.alpha_3} for currency in list(pycountry.currencies)
        ]),

        insert(mfa_status).values([
            {'status_name_pk': 'Successful'},
            {'status_name_pk': 'Failed'},
            {'status_name_pk': 'Exempted'},
            {'status_name_pk': 'Grandfathered'},
        ]),
        insert(transaction_status).values([
            {'status_name_pk': 'Successful'},
            {'status_name_pk': 'Failed'},
            {'status_name_pk': 'Pending'},
            {'status_name_pk': 'Cancelled'},
        ]),
        insert(payment_method).values([
            {'payment_method_pk': 'Credit Card'},
            {'payment_method_pk': 'Debit Card'},
            {'payment_method_pk': 'PayPal'},
            {'payment_method_pk': 'Bank Transfer'},
            {'payment_method_pk': 'Cash'},
            {'payment_method_pk': 'Gift Card'},
        ]),
        insert(customer).values([
            {'first_name': 'John', 'last_name': 'Doe', 'note': 'This is a test note', 'home_country_code_fk': 'USA'},
            {'first_name': 'Jane', 'last_name': 'Doe', 'note': 'This is another test note', 'home_country_code_fk': 'USA'},
            {'first_name': 'Alice', 'last_name': 'Smith', 'note': 'This is a test note', 'home_country_code_fk': 'CAN'},
            {'first_name': 'Bob', 'last_name': 'Smith', 'note': 'This is another test note', 'home_country_code_fk': 'CHE'},
            {'first_name': 'Charlie', 'last_name': 'Brown', 'note': 'This is a test note', 'home_country_code_fk': 'SYR'},
            {'first_name': 'Daisy', 'last_name': 'Duck', 'note': 'This is another test note', 'home_country_code_fk': 'SYR'},
            {'first_name': 'Eve', 'last_name': 'Johnson', 'note': 'This is a test note', 'home_country_code_fk': 'AUT'},
            {'first_name': 'Frank', 'last_name': 'Johnson', 'note': 'This is another test note', 'home_country_code_fk': 'MCO'},
            {'first_name': 'Grace', 'last_name': 'Smith', 'note': 'This is a test note', 'home_country_code_fk': 'JOR'},
            {'first_name': 'Harry', 'last_name': 'Smith', 'note': 'This is another test note', 'home_country_code_fk': 'JOR'},
            {'first_name': 'Ivy', 'last_name': 'Brown', 'note': 'This is a test note', 'home_country_code_fk': 'USA'},
            {'first_name': 'Jack', 'last_name': 'Brown', 'note': 'This is another test note', 'home_country_code_fk': 'ZAF'},
            {'first_name': 'Karl', 'last_name': 'Duck', 'note': 'This is a test note', 'home_country_code_fk': 'KNA'},
            {'first_name': 'Lily', 'last_name': 'Duck', 'note': 'This is another test note', 'home_country_code_fk': 'JPN'},
            {'first_name': 'Mike', 'last_name': 'Johnson', 'note': 'This is a test note', 'home_country_code_fk': 'UKR'},
            {'first_name': 'Nancy', 'last_name': 'Johnson', 'note': 'This is another test note', 'home_country_code_fk': 'TCD'},
            {'first_name': 'Oscar', 'last_name': 'Smith', 'note': 'This is a test note', 'home_country_code_fk': 'GRC'},
            {'first_name': 'Pam', 'last_name': 'Smith', 'note': 'This is another test note', 'home_country_code_fk': 'GMB'},
            {'first_name': 'Quinn', 'last_name': 'Brown', 'note': 'This is a test note', 'home_country_code_fk': 'FJI'},
            {'first_name': 'Ron', 'last_name': 'Brown', 'note': 'This is another test note', 'home_country_code_fk': 'EST'},
            {'first_name': 'Sally', 'last_name': 'Duck', 'note': 'This is a test note', 'home_country_code_fk': 'SAU'},
            {'first_name': 'Tom', 'last_name': 'Duck', 'note': 'This is another test note', 'home_country_code_fk': 'RWA'},
            {'first_name': 'Ursula', 'last_name': 'Johnson', 'note': 'This is a test note', 'home_country_code_fk': 'QAT'},
            {'first_name': 'Victor', 'last_name': 'Johnson', 'note': 'This is another test note', 'home_country_code_fk': 'EGY'},
            {'first_name': 'Wendy', 'last_name': 'Smith', 'note': 'This is a test note', 'home_country_code_fk': 'DZA'},
        ]),
        insert(title).values([
            {'name': 'Harry Potter and the Philosopher\'s Stone'},
            {'name': 'Spiderman 3'},
            {'name': 'The Lord of the Rings: The Return of the King'},
            {'name': 'The Dark Knight'},
            {'name': 'The Godfather'},
            {'name': 'The Shawshank Redemption'},
            {'name': 'The Matrix'},
            {'name': 'The Lion King'},
            {'name': 'The Incredibles'},
            {'name': 'The Avengers'},
            {'name': 'The Dark Knight Rises'},
            {'name': 'The Lord of the Rings: The Fellowship of the Ring'},
            {'name': 'The Lord of the Rings: The Two Towers'},
            {'name': 'The Hobbit: An Unexpected Journey'},
            {'name': 'The Hobbit: The Desolation of Smaug'},
            {'name': 'The Hobbit: The Battle of the Five Armies'},
            {'name': 'The Hunger Games'},
            {'name': 'The Hunger Games: Catching Fire'},
            {'name': 'The Hunger Games: Mockingjay - Part 1'},
            {'name': 'The Hunger Games: Mockingjay - Part 2'},
            {'name': 'The Twilight Saga: Breaking Dawn - Part 1'},
            {'name': 'The Twilight Saga: Breaking Dawn - Part 2'},
            {'name': 'The Twilight Saga: Eclipse'},
            {'name': 'The Twilight Saga: New Moon'},
            {'name': 'The Twilight Saga: Twilight'},
            {'name': 'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe'},
            {'name': 'The Chronicles of Narnia: Prince Caspian'},
            {'name': 'The Chronicles of Narnia: The Voyage of the Dawn Treader'},
            {'name': 'The Chronicles of Narnia: The Silver Chair'},
            {'name': 'The Chronicles of Narnia: The Magician\'s Nephew'}
        ]),
    ]

def create_synthetic_data():

    # Execute the insert statement
    for stmt in insert_stmt:
        connection.execute(stmt)
    connection.commit()
    print("Records inserted successfully!")