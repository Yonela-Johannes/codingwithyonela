import json
from flask import request, jsonify
from sqlalchemy import JSON
from controllers.title import ( create_title, fetch_titles, edit_title, delete_title, fetch_title )

def title():
    REQUEST = request.method 
    if REQUEST == 'GET':
        try:
            response = fetch_titles()
            return jsonify(response), 200 if not isinstance(response, dict) else response[1]            
        except json.decoder.JSONDecodeError as error:   
            return jsonify(response), 400
    
    # Create title
    elif REQUEST == 'POST':
        try:
            data = json.loads(request.data)
            if data:
                response = create_title(data["user_title"], data["description"], data["skill_id"])
            return jsonify(response), 400
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
        # edit/update
    elif REQUEST == 'PUT':
        try:
            title = json.loads(request.data)['title']
            id = json.loads(request.data)['id']
            if title and id:
                response = edit_title(id, title)
                return jsonify(response), 200 if not isinstance(response, dict) else response[1]
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
    # delete
    elif REQUEST == 'DELETE':
        try:
            id = json.loads(request.data)['id']
            if id:
                response = delete_title(id)
                return jsonify(response), 400
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400