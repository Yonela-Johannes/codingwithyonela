import json
from flask import request, jsonify
from controllers.event_controller import create_event, fetch_all_events, fetch_event, edit_event
from icecream import ic

def event(id, mail):
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
            if id:
                response = fetch_event(id)
                return jsonify(response), 200

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
            
            # for obj in response:
            #         obj["start_time"] = str(obj["start_time"])
            #         obj["end_time"] = str(obj["end_time"])
                
            return jsonify(response), 200

        except json.decoder.JSONDecodeError as error:
                return jsonify(error), 400
        
    # Create recommendation
    elif REQUEST == 'POST':
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
                return jsonify(response), 200 

        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400