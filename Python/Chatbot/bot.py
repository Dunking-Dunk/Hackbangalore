from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.tools.retriever import create_retriever_tool
from langchain_openai import ChatOpenAI
from langchain import hub
from langchain.agents import create_openai_tools_agent, AgentExecutor
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

sme_keywords = ["sme", "small and medium enterprises","msme", "medium Enterprises", "small and medium enterprises", "business loans", "financing", "loan applications","working capital","assessment","collateral","interest rates","terms" ,"conditions","loan","credit","loan guarantees","eligibility","Loan Disbursement Process","Loan Application Status","SME Banking Services","Banking Services"]

def contains_sme_keywords(query):
    return any(keyword in query.lower() for keyword in sme_keywords)

loader = WebBaseLoader(["https://msme.gov.in/", "https://udyamregistration.gov.in/", "https://en.wikipedia.org/wiki/Ministry_of_Micro_Small_and_Medium_Enterprises"])
docs = loader.load()
documents = RecursiveCharacterTextSplitter(chunk_size=20, chunk_overlap=2).split_documents(docs)

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

vectordb = FAISS.from_documents(documents, OpenAIEmbeddings(api_key=api_key))
retriever = vectordb.as_retriever()

retriever_tool = create_retriever_tool(retriever, "sme_search", "Search for information relevant to small and medium enterprises (SMEs). If you have any questions about SMEs, you can use this tool.")

llm = ChatOpenAI(model="gpt-3.5-turbo-0125", temperature=0, api_key=api_key)
prompt = hub.pull("hwchase17/openai-functions-agent")
agent = create_openai_tools_agent(llm, [retriever_tool], prompt)
agent_executor = AgentExecutor(agent=agent, tools=[retriever_tool], verbose=False)

@app.get('/')
async def home():
    return {"message": "Hello World"}

@app.get('/chat')
async def chat(query: str):
    
    # Check if the query contains SME-related keywords
    if contains_sme_keywords(query):
        # Invoke the agent if the query is SME-related
        response = agent_executor.invoke({"input": query})["output"]
        return {"message" : f"{response}"}
    else:
        return {"message" : "This query is not related to small and medium enterprises."}