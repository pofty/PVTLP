import unittest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)
jwt_test_token = "eyJraWQiOiIrZmlIaUhhXC8xVHh0ZmwrbmV5THpIY3V5SW9ub2VXQWNhNFQ2M2NBRmJqVT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNDI4MzRhOC1lMDgxLTcwZDgtNmY4MS04MjkzYzA0YWVmMWIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfVWcwTWtFaHh1IiwiY29nbml0bzp1c2VybmFtZSI6ImFkbWluNTAiLCJvcmlnaW5fanRpIjoiMmY3OGY0ZGEtMmZmOS00NGI4LWEwYjktMjI1OGYyOTUxZWE2IiwiYXVkIjoiNG9rcW9rNXIwaDQ2bzRwZ2k5cjFlNDQwZG4iLCJldmVudF9pZCI6IjRhNzdiOTg0LTI1ZDgtNDBlYi05YjM0LTMxMmNjOWExYzlkNyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzI3MDI0Mjg0LCJleHAiOjE3MjcxNjQyNDEsImlhdCI6MTcyNzE2MDY0MSwianRpIjoiZjA0MDA5MTctMjgwOS00ZTdmLWFhMzUtY2EzNGIyYTMzYjhjIiwiZW1haWwiOiJpbmZvQGhhc2Fud2F6emFuLmNvbSJ9.exSOru7Zbd0WaAx3u6mlnBM-MA8e-SX2fQEHg4lvtvKrhDrU-hcUsiiQxfjHl_qSsoAOJdkbgxg022-19Ogp41vWqhDUbx87emP0q7XmTyhK4XZ-BswjIOTDfZ9sfejg4mg-X55f-Ud9QbZV9rZrhq7O6cNtLvnIqQ5XD-wJ-8zNpuEz6ZzHfb8KaJoTQofw6xCc06CPFcD8eMNIYdO_O65Uke_UaYHcRT-fCsG5ybMkA6lbOEiOwRXwCLRtpCehg44Qg7uSBNf5RKYBAi8jksJwCvqmwhbIivVa5zEoXBRpOhb92SH7VsyF_1rKGT0v55qF5bNj7SVvkdi0JCgr1w"

# prepare data for testing
def prepare_data():
    global transaction_data_record
    global transaction_data_record_transaction_id

    # get transaction from the database
    response = client.get("/transactions")
    transactions = response.json()
    transaction_data_record = transactions[0] # get the first transaction
    # remove the transaction_id_pk key and value
    transaction_data_record_transaction_id = transaction_data_record["transaction_id_pk"]
    transaction_data_record.pop("transaction_id_pk")

class ApiTests(unittest.TestCase):

    def test_root(self):
        response = client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Hello World"})

    def test_get_transactions(self):
        response = client.get("/transactions")
        self.assertEqual(response.status_code, 200)

    def test_get_customers(self):
        response = client.get("/customers")
        self.assertEqual(response.status_code, 200)

        response = client.get("/titles")
        self.assertEqual(response.status_code, 200)
        

    def test_get_countries(self):
        response = client.get("/countries")
        self.assertEqual(response.status_code, 200)
        

    def test_get_currencies(self):
        response = client.get("/currencies")
        self.assertEqual(response.status_code, 200)
        

    def test_get_payment_methods(self):
        response = client.get("/payment_methods")
        self.assertEqual(response.status_code, 200)
        

    def test_get_transaction_statuses(self):
        response = client.get("/transaction_statuses")
        self.assertEqual(response.status_code, 200)
        

    def test_get_mfa_statuses(self):
        response = client.get("/mfa_statuses")
        self.assertEqual(response.status_code, 200)
        

    def test_is_admin(self):
        response = client.get(f"/isadmin?jwt_token={jwt_test_token}")
        self.assertEqual(response.status_code, 200)
        # check response is true
        self.assertEqual(response.json(), True)
        

    def test_is_admin_no_token_expect_error(self):
        response = client.get(f"/isadmin")
        self.assertEqual(response.status_code, 422)
        

    def unknown_endpoint(self):
        response = client.get("/unknown")
        self.assertEqual(response.status_code, 404)
        

    def test_post_transactions(self):
        response = client.post("/createtransaction", json=transaction_data_record)
        self.assertEqual(response.status_code, 200)

    def test_delete_transaction(self):
        response = client.delete(f"/deletetransaction/{transaction_data_record_transaction_id}?jwt_token={jwt_test_token}")
        self.assertEqual(response.status_code, 200)
        

    def test_update_transaction(self):
        response = client.patch(f"/updatetransaction/{transaction_data_record_transaction_id}", json=transaction_data_record)
        self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    prepare_data()
    unittest.main()