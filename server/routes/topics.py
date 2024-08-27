import json
from flask import request, jsonify
from sqlalchemy import JSON
from controllers.topics import fetch_topics

def topics():
    REQUEST = request.method 
    if REQUEST == 'GET':
        try:
            response = fetch_topics()
            result = response
            res = {"data": result}
            return jsonify(res), 200            
        except json.decoder.JSONDecodeError:   
            res = {"message": "Something went wrong!"}
        return jsonify(res), 400