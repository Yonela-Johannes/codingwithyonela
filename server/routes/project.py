import json
from flask import request, jsonify
from sqlalchemy import JSON
from controllers.project import create_project, create_project_chat, delete_project, edit_project, fetch_projects, fetch_projects_chats, project_like, fetch_project
from icecream import ic
from routes.image_upload import uploadImage
from utils.token_handler import valid_token

def project(id):
    REQUEST = request.method
    if REQUEST == 'GET':
        # Fetch project
        try:
            print("WE ARE HERE, AND ONE")
            response = fetch_project(id)
            res = {"data": response}
            return res, 200

        except:
            return {"message": "Fetch failed: something went wrong."}, 400
    # edit/update
    elif REQUEST == 'PUT':
        try:

            data = request.get_json()
            ic(data)
            account_id = data['user_id']
            project_id = data['project_id']
            
            project_name = None
            description = None
            github = None
            link = None
            status = None
            priority = None
            user_ids = None
            progress = None
            topic_id = None
            progress = None
            
            if 'status' in data:
                status = data['status']
            if 'project_name' in data:
                project_name = data['project_name']
            if 'description' in data:
                description = data['description']
            if 'github' in data:
                github = data['github']
            if 'link' in data:
                link = data['link']
            if 'priority' in data:
                priority = data['priority']
            if 'user_ids' in data:
                user_ids = data['user_ids']
            if 'progress' in data:
                progress = data['progress']
            if 'topic_id' in data:
                topic_id = data['topic_id']
            if 'progress' in data:
                progress = data['progress']
            
            response = edit_project(user_ids=account_id, 
                                    project_id=project_id, 
                                    project_status=status, 
                                    project_name=project_name, 
                                    description=description, 
                                    github=github, 
                                    link=link, 
                                    priority=priority, 
                                    topic_id=topic_id,
                                    progress=progress
                                    )
            
            if response:
                    res = {"data": f"{response}",
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
        # Fetch projects
        try:
            response = fetch_projects()
            res = {"data": response}
            return jsonify(res), 200

        except:
            return {"message": "Fetch failed: something went wrong."}, 400
    # Create title
    elif REQUEST == 'POST':
        try:
            auth = valid_token()
            ic(auth)
            image = request.files['image']
            account_id = request.form['account_id']
            project_name = request.form['project_name']
            description = request.form['description']
            user_ids = request.form['user_ids']
            github = request.form['github']
            link = request.form['link']
            progress = request.form['progress']           
            priority = request.form['priority']      
            topic_ids = request.form['topic_ids']      
            category_id = request.form['category_id']
            project_status = request.form['project_status']  
            
            res = uploadImage(image=image)
            
            if 'url' in res:
                if account_id and project_name and description and github and link:
                    response = create_project(user_ids=user_ids, 
                                            account_id=account_id, 
                                            image=res['url'], 
                                            project_name=project_name, 
                                            description=description,
                                            project_status=project_status,
                                            category_id=category_id, 
                                            github=github, 
                                            link=link, 
                                            progress=progress, 
                                            priority=priority,
                                            topic_ids=topic_ids
                                            )
                    if response:
                            res = {"data": "Project created successfull"}
                            return res, 201
                    else:
                        res = {"message": "Error: something went wrong."}
                        return res, 400 
                    
                res = {"message": "Missing data"}
                return res, 400 
            res = {"message": "Error: image upload"}
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