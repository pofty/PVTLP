import jwt

def decode_jwt_token(jwt_token):
    try:

        decoded_token = jwt.decode(jwt_token, options={"verify_signature": False})
        # print(decoded_token["cognito:username"])
        return decoded_token
    except Exception as e:
        return {"error": str(e)}


# data structure for this outcome:
#{'sub': '443824e8-b0d1-70c7-a8cb-2dedb4a1e676', 'email_verified': True, 'iss': 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_Ug0MkEhxu', 'cognito:username': 'hasan', 'origin_jti': '36019140-9755-463c-8a4a-9150cee74fc8', 'aud': '4okqok5r0h46o4pgi9r1e440dn', 'event_id': '4f54d760-e685-4f92-a411-6c8578000aae', 'token_use': 'id', 'auth_time': 1726814979, 'exp': 1726818579, 'iat': 1726814979, 'jti': '9ca7dd90-6a9b-4d38-ab4f-5f556f42c222', 'email': 'info@hasanwazzan.com'}

#decode_jwt_token("eyJraWQiOiIrZmlIaUhhXC8xVHh0ZmwrbmV5THpIY3V5SW9ub2VXQWNhNFQ2M2NBRmJqVT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0NDM4MjRlOC1iMGQxLTcwYzctYThjYi0yZGVkYjRhMWU2NzYiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfVWcwTWtFaHh1IiwiY29nbml0bzp1c2VybmFtZSI6Imhhc2FuIiwib3JpZ2luX2p0aSI6IjM2MDE5MTQwLTk3NTUtNDYzYy04YTRhLTkxNTBjZWU3NGZjOCIsImF1ZCI6IjRva3FvazVyMGg0Nm80cGdpOXIxZTQ0MGRuIiwiZXZlbnRfaWQiOiI0ZjU0ZDc2MC1lNjg1LTRmOTItYTQxMS02Yzg1NzgwMDBhYWUiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcyNjgxNDk3OSwiZXhwIjoxNzI2ODE4NTc5LCJpYXQiOjE3MjY4MTQ5NzksImp0aSI6IjljYTdkZDkwLTZhOWItNGQzOC1hYjRmLTVmNTU2ZjQyYzIyMiIsImVtYWlsIjoiaW5mb0BoYXNhbndhenphbi5jb20ifQ.o8PTHAcxR-C5I7iIHESM1yn3U6d1wWCxpvfxt6oNfxVnu9Yx21SD0bdXleppmU6ExVtiFYfd0fwYwd3t83-_gHvaOqTLWTKG0aeS7mx9cIaiDpDE3CZ5x13CHUwG8QBYUKBXtQNHrVvYpqz0OWDK7FrFZiw9Q6R6KUZT4hRgX3w4spIuPMyVylQxCpJyXPfO21uW2G9NzRq64R0MIpycJQPkQuhfb95rSjnOhxqHFTjB7PUKKFJnlMQN2UICPk8Zq7tNNMbnE_N9mr7ZvejG1gBb28VpAK6MvDkcmeQ62KLntBmgeDAjDblPXLiprNTYrOP0R2z86KPSN9QLSqkzgg")