from backend.get_table_from_db import get_table


def is_admin(username: str) -> bool:
    output = get_table("pvtlp_user")
    for user in output:
        if user['pvtlp_username_pk'] == username:
            return user['is_admin']
    return False
