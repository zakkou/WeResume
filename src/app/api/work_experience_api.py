from fastapi import FastAPI
from work_experience import correct_experience_text
import re
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

@app.get("/exp/{experience}")
async def opt_experience(experience: str): 
    desc = correct_experience_text(experience)
    
    return {desc} 


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your needs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
