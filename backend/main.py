from fastapi import FastAPI
from mangum import Mangum

app = FastAPI()
handler = Mangum(app)

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/name/{name}")
async def get_name(name: str):
    return {"hello ...": name}


