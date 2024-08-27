import json
from flask import request, jsonify
from sqlalchemy import JSON
from controllers.title import ( create_title, fetch_titles, edit_title, delete_title, fetch_title )

def title():
    REQUEST = request.method 
    if REQUEST == 'GET':
        try:
            response = fetch_titles()
            res = {"data": response}
            return jsonify(res), 200            
        except json.decoder.JSONDecodeError:   
            res = {"message": "Something went wrong!"}
        return jsonify(res), 400
    
    # Create title
    elif REQUEST == 'POST':
        try:
            data = json.loads(request.data)
            if data:
                response = create_title(data["user_title"], data["description"], data["skill_id"])
                if response == data["user_title"]:
                    res = {"title": "Title created successfull"}
                    return jsonify(res), 400
                else:
                    res = {"message": "Invalid input or already exists"}
                    return jsonify(res), 400
                
            res = {"message": "Title invalid: (you must enter title)"}
            return jsonify(res), 400
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return jsonify(res), 400
            
        # edit/update
    elif REQUEST == 'PUT':
        try:
            title = json.loads(request.data)['title']
            id = json.loads(request.data)['id']
            if title and id:
                response = edit_title(id, title)
                if response == title:
                        res = {"title": f"{response}",
                            "message": "Update successful"
                            }
                        return jsonify(res), 200
                else:
                    res = {"message": f"{title} already exist"}
                    return jsonify(res), 400
            res = {"message": "Title or is ID invalid"}
            return jsonify(res), 400
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return jsonify(res), 400
    
    # delete
    elif REQUEST == 'DELETE':
        try:
            id = json.loads(request.data)['id']
            if id:
                response = delete_title(id)
                if response == id:
                    res = {"message": "Delete failed: something went wrong."}
                    return jsonify(res), 400
                else:
                    res = {
                            "message": "Delete successful"
                            }
                    return jsonify(res), 200
            res = {"message": "Title or is ID invalid"}
            return jsonify(res), 400
        except json.decoder.JSONDecodeError:
           res = {"message": "Missing data"}
        return jsonify(res), 400
    