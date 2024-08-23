import json
from flask import request, jsonify
from sqlalchemy import JSON
from controllers.project import create_project, create_project_chat, delete_project, edit_project, fetch_projects, fetch_projects_chats, project_like, fetch_project
from controllers.task import fetch_task, create_task, edit_task, delete_task
from icecream import ic

def project_task(project_id):
    REQUEST = request.method
    if REQUEST == 'GET':
        # Fetch project
        try:
            response = fetch_task(project_id=project_id)
            if response:
                res = jsonify({"data": response})
                return res, 200
            elif response == None:
                res = jsonify({"message" "Error: something went wrong"})
                return res, 400
            else:
                res = jsonify({"message": []})
                return res, 200
                
        except:
            return {"message": "Fetch failed: something went wrong."}, 400
        
    elif REQUEST == 'POST':
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

            if response:
                    res = {"data": "Project task created successfull"}
                    return res, 201
                
            res = {"message": "Missing data"}
            return res, 400 
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
            print(res)
        return res, 200 

    # edit/update
    elif REQUEST == 'PUT':
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
                    res = {"data": response,
                        "message": "Update successful"
                        }
                    return res, 200
            res = {"message": response}
            return res, 400

        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return res, 400
    elif REQUEST == 'DELETE':
        try:
            data = request.get_json()
            account_id = data['user_id']
            task_id = data['task_id']
    
            if task_id and account_id:
                response = delete_task(task_id=task_id, account_id=account_id)
                if response == id:
                    res = {"message": "Delete failed: something went wrong."}
                    return res, 400
                else:
                    res = {
                            "message": "Delete successful"
                            }
                    return res, 200
            res = {"message": "Title or is ID invalid"}
            return res, 400
        except json.decoder.JSONDecodeError:
           res = {"message": "Missing data"}
        return res, 400


def task():
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch projects
        try:
            response = fetch_projects()
            res = {"data": response}
            return res, 200

        except:
            return {"message": "Fetch failed: something went wrong."}, 400
    # Create title
