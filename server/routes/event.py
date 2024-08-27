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
                if response:
                    res = {
                        "message": "Fetch successful",
                        "data": response
                    }
                    return jsonify(res), 200
                else:
                    res = {"message": "Fetch failed: something went wrong."}
                    return jsonify(res), 400
            else:
                res = {"message": "Missing data"}
                return jsonify(res), 400
        except:
            return {"message": "Fetch failed: something went wrong."}
        
        # edit/update
    elif REQUEST == 'PUT':
        try:
            data = request.get_json()
            if 'status' in data != "undefined":
                account_id = data['user_id']
                status = data['status']
                res = {"message": "Missing data"}
                return jsonify(res), 400
        except json.decoder.JSONDecodeError as err:
            ic(err)
            res = {"message": "Missing data"}
        return jsonify(res), 400

def all_events():
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch all
        try:
            response = fetch_all_events()
            
            if response:
                for obj in response:
                        obj["start_time"] = str(obj["start_time"])
                        obj["end_time"] = str(obj["end_time"])
                   
                res = {
                    "message": "Fetch successful",
                    "data": response
                    }
                return jsonify(res), 200
            else:
                res = {"data": []}
                return jsonify(res), 200
        except  json.decoder.JSONDecodeError as err:
            print(err)
            return {"message": "Fetch failed: something went wrong."}
        
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
                if response and 'id' in response:
                    res = {"message": response}
                    return jsonify(res), 200 
                                                
                else:
                    res = {"message": "Something went wrong"}
                    return jsonify(res), 400
            else:
                res = {"message": "User data missing"}
                return jsonify(res), 400

        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return jsonify(res), 200