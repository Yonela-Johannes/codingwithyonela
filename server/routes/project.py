import json
from flask import request
from sqlalchemy import JSON
from controllers.project import create_project, create_project_chat, delete_project, edit_project, fetch_projects, fetch_projects_chats, project_like

def project(id):
    REQUEST = request.method 
    # edit/update
    if REQUEST == 'PUT':
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


def projects():
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
            response = fetch_projects()
            res = {"data": response}
            return res, 200
    
        except:
            return {"message": "Fetch failed: something went wrong."}
    # Create title
    elif REQUEST == 'POST':
        try:

            data = request.get_json()

            account_id = data['account_id']
            project_name = data['project_name']
            category_id = data['category_id']
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
            
            if account_id and project_name and description and github and link:
                response = create_project(account_id, account_id, project_name, description, status_id, category_id, github, link, management_tool)
                if response:
                        print(response)
                        res = {"data": f"{response}"}
                        return res, 201
                else:
                    res = {"message": "Project already exist"}
                    return res, 400 
                
            res = {"message": "Missing data"}
            return res, 400 
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
            print(res)
        return res, 200 


def project_chat(id):
    REQUEST = request.method 
    if REQUEST == 'POST':
        try:            
            data = request.get_json()
            account_id = data['account_id']
            message = data['message']
            project_id = data['project_id']
            
            if account_id and message and project_id:
                response = create_project_chat(account_id, message, project_id)
                if response:
                        res = {"data": f"{response}"}
                        return res, 201
                else:
                    res = {"message": "Project already exist"}
                    return res, 400 
                
            res = {"message": "Title invalid: (you must enter title)"}
            return res, 400 
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return res, 400 
    
    REQUEST = request.method 
    if REQUEST == 'GET':
        print("ID: : ", id)
        try:
            response = fetch_projects_chats(id)
            res = {"data": response}
            return res, 200
    
        except:
            return {"message": "Fetch failed: something went wrong."}

def add_project_like(id):
    REQUEST = request.method 
    if REQUEST == 'POST':
        try:            
            data = request.get_json()
            account_id = data['account_id']
          
            print("ACCOUNT_ ID: ", account_id)
            
            if account_id and res and id:
                response = project_like(account_id, id)
                if response:
                        res = {"data": f"{response}"}
                        return res, 201
                else:
                    res = {"message": "Project already exist"}
                    return res, 400 
                
            res = {"message": "Title invalid: (you must enter title)"}
            return res, 400 
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return res, 400 