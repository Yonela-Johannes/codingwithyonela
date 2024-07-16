import json
from flask import request, jsonify
from sqlalchemy import JSON
from controllers.project import create_project, create_project_chat, delete_project, edit_project, fetch_projects, fetch_projects_chats, project_like, fetch_project
from controllers.task import fetch_task, create_task
from icecream import ic

def project_task(project_id):
    REQUEST = request.method
    if REQUEST == 'GET':
        # Fetch project
        try:
            ic()
            ic(project_id)
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
            text = data['text']
            users_id = data['users_id']
            skill_id = data['skill_id']
            progress = data['progress']          
            priority = data['priority']      
            tags_id = data['tags_id']      
            description = data['description']  
    
            response = create_task(users_id=users_id, 
                                        project_id=project_id,
                                        account_id=account_id,
                                        task=text, 
                                        tags_id=tags_id,
                                        skill_id=skill_id, 
                                        progress=progress, 
                                        priority=priority,
                                        description=description
                                        )
            ic(response)
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
            account_id = data['account_id']
            project_name = data['project_name']
            description = data['description']
            github = data['github']
            link = data['link']
            
            category_id = None
            status_id = None
            management_tool = ''
            if 'category_id' in data and 'status_id' in data and 'management_tool' in data:
                category_id = data['category_id']
                status_id = data['status_id']
                management_tool = data['management_tool']
            
            if id and project_name and category_id and account_id and id == account_id:
                response = edit_project(account_id, project_name, description, status_id, category_id, github, link, management_tool)
                print('RESPONSE: :', response)
                if response:
                        res = {"data": f"{response}",
                            "message": "Update successful"
                            }
                        return res, 200
                res = {"message": response}
                return res, 400
            res = {"message": "Missing data"}
            return res, 400
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return res, 400
    elif REQUEST == 'DELETE':
        try:
            data = request.get_json()
            account_id = data['account_id']
            project_id = data['project_id']
    
            if id and project_id and account_id and id == account_id:
                response = delete_project(project_id, account_id)
                if response == id:
                    res = {"message": "Delete failed: something went wrong."}
                    return res, 400
                else:
                    res = {
                            "message": "Delete successful"
                            }
                    return res, 200
            res = {"message": "Title or is ID invalid"}
            return res, 00 
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
