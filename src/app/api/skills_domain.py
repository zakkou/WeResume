from langchain.prompts import PromptTemplate
from langchain.llms import CTransformers
# constants

LLAMA2_MODEL_PATH = "C:\\Users\\GIGABYTE\\llama-2-7b-chat.ggmlv3.q8_0.bin"
LLAMA2_MODEL_CONFIG = {
    "max_new_tokens": 256,
    "temperature": 0.01
}

def get_skills_for_domain(domain: str) -> str:
    """
    Generate skills for a given domain using the LLama2 model.

    Args:
        domain (str): The domain for which to generate skills.

    Returns:
        str: The generated skills as a string.
    """
    llm = CTransformers(model=LLAMA2_MODEL_PATH, model_type='llama', config=LLAMA2_MODEL_CONFIG)

    # Prompt template for skills in the specified domain
    template = f"""
        Provide a list of 20 skills required for a {domain} professional.
        Please include both technical and soft skills.
        """

    prompt = PromptTemplate(input_variables=[], template=template)

    try:
        # Generate the response from the LLama2 model
        response = llm(prompt.template)
        return response
    except Exception as e:
        print(f"Error generating skills: {e}")
        return ""


