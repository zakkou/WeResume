from fastapi import FastAPI
from skills import generate_profile_description
import re
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

@app.get("/skills/{domain}")
async def get_skills(domain: str): 
    desc = generate_profile_description(domain) 
    return { desc}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your needs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
