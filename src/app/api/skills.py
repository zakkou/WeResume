from langchain.prompts import PromptTemplate
from langchain.llms import CTransformers
# constants
import re

def generate_profile_description(domain):
    # LLama2 model
    llm = CTransformers(model="C:\\Users\\GIGABYTE\\llama-2-7b-chat.ggmlv3.q8_0.bin",
                        model_type='llama',
                        config={'max_new_tokens': 256,
                                'temperature': 0.01})

    # Prompt Template for profile description in the specified domain
    template = f"""
        generate only a one paragraph profile description for a professional in the field of {domain} to be integreted in a resume as profile description.
            """

    # Generate the response from the LLama2 model
    response = llm(template)
    return response

# Get user input for the domain
