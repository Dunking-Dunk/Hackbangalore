from fastapi import FastAPI
import pickle
import numpy as np
import pandas as pd

app = FastAPI()

@app.get('/')
def home():
    return {"message": "Hello World"}

@app.get('/credit')
def credit(ann_inc: str, no_loan: str, mon_bal: str, cred_lim: str):

    with open('credit_scoring.pkl', 'rb') as f:
        model = pickle.load(f)

    new_X = pd.DataFrame({
    "Annual_Income": [19114.12],
    "Num_of_Loan": [4.0],
    "Monthly_Balance": [312.494089],
    "Changed_Credit_Limit": [11.27]
    })

    print(new_X)
    prediction = model.predict(new_X)
    return {"message": "prediction"}