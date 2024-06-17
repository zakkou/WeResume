import re
from langchain.prompts import PromptTemplate
from langchain.llms import CTransformers

# Optimisation de l'education
def correct_education_text(education_text):
    # Remove asterisks and improve formatting using regex
    

    # LLama2 model
    llm = CTransformers(model="C:\\Users\\GIGABYTE\\llama-2-7b-chat.ggmlv3.q8_0.bin",
                        model_type='llama',
                        config={'max_new_tokens': 256,
                                'temperature': 0.01})

    # Prompt Template for correcting education text
    template = f"""
            The following project text needs optimization:

            {education_text}

            Please revise and improve the wording to highlight achievements and responsibilities effectively. Use proper formatting, bullet points, and headings to make it easy to read and scan.
    """

    # Generate the response from the LLama2 model
    response = llm(template)

    # Extracting the optimized text
    optimized_text = re.sub(r'\*(.*?)\*', r'\1', response)

    return optimized_text
