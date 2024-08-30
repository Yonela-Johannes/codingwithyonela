import json
from flask import request, jsonify
from sqlalchemy import JSON
from controllers.task import fetch_task, create_task, edit_task, delete_task
from icecream import ic
from utils.token_handler import valid_token

def project_task(project_id):
    REQUEST = request.method
    if REQUEST == 'GET':
        # Fetch tasks
        try:
            response = fetch_task(project_id=project_id)
            if response:
                return jsonify(response), 200 if not isinstance(response, dict) else response[1]
                
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
        
    elif REQUEST == 'POST':
        user =  valid_token() 
        if user == False: 
            return jsonify({'message': 'You are not authorized'}), 401
        try:
            data = request.get_json()
            account_id = data['account_id']
            task = data['task']              
            description = data['description']  
            project_id = data['project_id']  

            response = create_task(
                project_id=project_id,
                account_id=account_id,
                task=task, 
                description=description
                )
            return jsonify(response), 200 if not isinstance(response, dict) else response[1]
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400

    # edit/update
    elif REQUEST == 'PUT':
        user =  valid_token() 
        if user == False: 
            return jsonify({'message': 'You are not authorized'}), 401
        try:
            
            data = request.get_json()
            account_id = data['user_id']
            task_id = data['task_id']
            status = None
            if 'status' in data:
                status = data['status']
            priority = None
            if 'priority' in data:
                priority = data['priority']
                
            response = edit_task(account_id=account_id, task_id=task_id, status=status, priority=priority)
            if response:
                return jsonify(response), 200 if not isinstance(response, dict) else response[1]

        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
        
    elif REQUEST == 'DELETE':
        user =  valid_token() 
        if user == False: 
            return jsonify({'message': 'You are not authorized'}), 401
        try:
            data = request.get_json()
            account_id = data['user_id']
            task_id = data['task_id']
    
            if task_id and account_id:
                response = delete_task(task_id=task_id, account_id=account_id)
                return jsonify(response), 400
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400


def task():
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch tasks
        try:
            response = fetch_task()
            return jsonify(response), 200

        except:
            return jsoninify({"message": "Fetch failed: something went wrong."}), 400

