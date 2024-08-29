import json
from flask import request, jsonify
from sqlalchemy import JSON
from controllers.countries import fetch_countries

def countries():
    REQUEST = request.method 
    if REQUEST == 'GET':
        try:
            response = fetch_countries()
            return jsonify(response), 200 if not isinstance(response, dict) else response[1]            
        except Exception as error:
            # Generic exception handling
            return jsonify({"error": str(error)}), 500