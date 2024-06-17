from fastapi import FastAPI
from skills_domain import get_skills_for_domain
from fastapi.middleware.cors import CORSMiddleware
import re
from work_experience import correct_experience_text
from skills import generate_profile_description
from education import correct_education_text
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

@app.get("/skills/{domain}")
async def get_skills(domain: str): 
    desc = generate_profile_description(domain) 
    return { desc}



@app.get("/edu/{education}")
async def opt_edu(education: str): 
    desc = correct_education_text(education) 
    return { desc}




@app.get("/domainskill/{domain}")
async def get_domainskill(domain: str): 
    desc = get_skills_for_domain(domain)
    return { desc}


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
