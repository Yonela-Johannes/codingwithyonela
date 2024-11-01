import json
from flask import request, jsonify
from controllers.event_controller import create_event, fetch_all_events, fetch_event, edit_event
from icecream import ic
from utils.token_handler import valid_token

def event(id, mail):
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
            if id:
                response = fetch_event(id)
                return jsonify(response), 200 if not isinstance(response, dict) else response

        except json.decoder.JSONDecodeError as error:
                return jsonify(error), 400
        # edit/update
    elif REQUEST == 'PUT':
        try:
            data = request.get_json()
            return jsonify(response), 400
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400

def all_events():
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch all
        try:
            response = fetch_all_events()
                            
            return jsonify(response), 200 if not isinstance(response, dict) else response

        except json.decoder.JSONDecodeError as error:
                return jsonify(error), 400
        
    # Create event
    elif REQUEST == 'POST':
        user =  valid_token() 
        if user == False: 
            return jsonify({'message': 'You are not authorized'}), 401
        try:
            data = request.form
            account_id = data['account_id']
            title = data['title']
            description = data['description']
            start_time = data['start_time']
            end_time = data['end_time']

            if account_id:
                response = create_event(
                    title=title, 
                    description=description, 
                    start_time=start_time,
                    end_time=end_time
                )
                return jsonify(response), 200 if not isinstance(response, dict) else response 

        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400