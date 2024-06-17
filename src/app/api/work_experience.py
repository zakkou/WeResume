from langchain.prompts import PromptTemplate
from langchain.llms import CTransformers
import re

# Optimisation de l'experience
def correct_experience_text(experience_text):
    # LLama2 model
    llm = CTransformers(model="C:\\Users\\GIGABYTE\\llama-2-7b-chat.ggmlv3.q8_0.bin",
                        model_type='llama',
                        config={'max_new_tokens': 256,
                                'temperature': 0.01})

    # Prompt Template for correcting education text
    template = f"""

    Please revise and enhance the wording to effectively highlight achievements and responsibilities. Ensure that the text is clear, concise, and impactful.

    - Focus on quantifiable achievements and specific contributions.
    - Use bullet points or numbered lists for responsibilities and achievements.
    - Include relevant skills and technologies used.

    Once optimized, provide a concise version of the experience text below.

    Optimized Experience:

    [Your optimized experience text goes here]

        Experience Optimization:

    Here is the experience text that needs optimization:


    {experience_text}
    """

    # Generate the response from the LLama2 model
    response = llm(template)

    # Extracting the optimized text
#     optimized_text = response.split("\n\n\n")[1].strip()

    return response

# Get user input for the education text


