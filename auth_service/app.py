from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI();

app.middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

users = [{"user":"admin", "key":"12345"}]

#login endpoint Duvan Vivas
@app.post("/login")
async def login(user:str, key:str):
    for user in users:
        if(user["user"] == user and user["key"] == key):
            return {"state":"success"}
    return {"state":"failure"}