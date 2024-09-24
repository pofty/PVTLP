import jwt

def decode_jwt_token(jwt_token):
    try:
        decoded_token = jwt.decode(jwt_token, options={"verify_signature": False})
        # print(decoded_token["cognito:username"])
        return decoded_token
    except Exception as e:
        return {"error": str(e)}
