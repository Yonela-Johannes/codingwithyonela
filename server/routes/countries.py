import json
from flask import request, jsonify
from sqlalchemy import JSON
from controllers.countries import fetch_countries

def countries():
    REQUEST = request.method 
    if REQUEST == 'GET':
        try:
            response = fetch_countries()
            result = response
            res = {"data": result}
            return jsonify(res), 200            
        except json.decoder.JSONDecodeError:   
            res = {"message": "Something went wrong!"}
        return jsonify(res), 400