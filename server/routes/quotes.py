import json
from sqlalchemy import JSON
from controllers.quotes import create_quote, fetch_quotes
from flask import request, jsonify

def quotes():
    REQUEST = request.method 
    if REQUEST == 'GET':
        try:
            response = fetch_quotes()
            result = response
            res = {"data": result}
            return jsonify(res), 200        
        except json.decoder.JSONDecodeError:   
            res = {"message": "Something went wrong!"}
        return jsonify(res), 400 
    
    if REQUEST == 'POST':
        try:
            response = create_quote()
            result = response
            res = {"data": result}
            return jsonify(res), 200    
        except json.decoder.JSONDecodeError:   
            res = {"message": "Something went wrong!"}
        return jsonify(res), 400 