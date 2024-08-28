import json
from flask import request, jsonify
from sqlalchemy import JSON
from controllers.topics import fetch_topics

def topics():
    REQUEST = request.method 
    if REQUEST == 'GET':
        try:
            response = fetch_topics()
            return jsonify(response), 200            
        except json.decoder.JSONDecodeError as error:   
            return jsonify(error), 400