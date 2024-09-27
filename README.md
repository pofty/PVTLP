### The web application is online at: https://pvtlp.com/

## Running the PVTLP application locally:

### Prerequisites
1. Clone the repository

`git clone https://github.com/pofty/PVTLP`

2. Navigate to the root directory
3. Python 3.12
4. Node.js 18, npm 8.1.0

### Setting up the database
1. Install PostgreSQL 15.0

`sudo dnf install postgresql15.x86_64 postgresql15-server -y`
2. Initialise the database:

`sudo postgresql-setup --initdb --unit postgresql`

3. Setup postgres user password:

`sudo passwd postgres`

4. alter the database user table for the user postgres:
5. 
`psql -c 'ALTER USER postgres PASSWORD 'your password goes here';'`

5. Setup your authentication listen_addresses and port in pg_hba.conf file:

`sudo nano /var/lib/pgsql/15/data/pg_hba.conf`

6. start and enable the postgresql service:

`sudo systemctl start postgresql`

`sudo systemctl enable postgresql`

7. Create a database named `pvtlp`:

`psql -c 'CREATE DATABASE pvtlp;'`

8. Create a file in the backend directory named db_auth_cred.py and paste the following after adding your login details:

```python
user = 'postgres'
password = 'your password goes here'
host = 'localhost'
port = 'your database port goes here'
database = 'postgres'

# PostgreSQL connection string format
connection_string = f'postgresql+psycopg://{user}:{password}@{host}:{port}/{database}'
```

### setting up the backend (FASTAPI)

1. navigate to the backend directory, and run the following commands:

'python3.12 -m pip install -r requirements.txt'

2. run the backend server:

'fastapi run main.py'

### setting up amplify (AWS) for AWS Cognito

Follow this documentation to setup amplify for AWS Cognito: https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/create-a-react-app-by-using-aws-amplify-and-add-authentication-with-amazon-cognito.html

### setting up the frontend (React)
1. navigate to the frontend directory frontend/pvtlp-react, and run the following command to install the dependencies:

'npm install'

2. edit the fastapi url in the frontend/pvtlp-react/src/utils/api_call_backend.js and change the baseUrl to your backend url, following the fastAPI section

3.  start the frontend dev server:

'npm start'

navigate to url displayed in the terminal to view the application


