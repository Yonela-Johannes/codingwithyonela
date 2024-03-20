import json
from flask import request
from sqlalchemy import JSON
from controllers.quotes import create_quote, fetch_quotes

def quotes():
    REQUEST = request.method 
    if REQUEST == 'GET':
        try:
            response = fetch_quotes()
            result = response
            res = {"data": result}
            return res, 200            
        except json.decoder.JSONDecodeError:   
            res = {"message": "Something went wrong!"}
        return res, 400 
    
    if REQUEST == 'POST':
        try:
            response = create_quote()
            result = response
            res = {"data": result}
            return res, 200            
        except json.decoder.JSONDecodeError:   
            res = {"message": "Something went wrong!"}
        return res, 400 