import json
from sqlalchemy import JSON
from controllers.quotes import create_quote, fetch_quotes
from flask import request, jsonify
from icecream import ic
from utils.token_handler import valid_token

def quotes():
    REQUEST = request.method 
    if REQUEST == 'GET':
        try:
            response = fetch_quotes()
            return jsonify(response), 200 if not isinstance(response, dict) else response[1]        
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
    
    if REQUEST == 'POST':
        try:
            valid_token()
            response = create_quote()
            return jsonify(response), 200 if not isinstance(response, dict) else response[1]    
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400