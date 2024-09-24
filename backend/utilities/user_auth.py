from backend.db_utilities.get_table_from_db import get_table
from backend.utilities.jwt_handling import get_username_from_jwt

# this is used to validate user authorization on the backend side
def is_admin(username: str) -> bool:
    output = get_table("pvtlp_user")
    for user in output:
        if user['pvtlp_username_pk'] == username:
            return user['is_admin']
    return False

def is_logged_in(jwt_token: str) -> bool:
    return is_admin(username = get_username_from_jwt(jwt_token))