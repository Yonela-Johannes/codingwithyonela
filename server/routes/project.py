import json
from flask import request, jsonify
from sqlalchemy import JSON
from controllers.project import create_project, create_project_chat, delete_project, edit_project, fetch_projects, fetch_projects_chats, project_like, fetch_project, create_project_feedback, fetch_project_feedback
from icecream import ic
from routes.image_upload import uploadImage
from utils.token_handler import valid_token

def project(id):
    REQUEST = request.method
    if REQUEST == 'GET':
        # Fetch project
        try:
            response = fetch_project(id)   
            return jsonify(response), 200 if not isinstance(response, dict) else response
        
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
    # edit/update
    elif REQUEST == 'PUT':
        user =  valid_token() 
        if user == False: 
            return jsonify({'message': 'You are not authorized'}), 401
        try:
            data = request.get_json()
            project_id = data['project_id']
            project_name = None
            description = None
            github = None
            link = None
            status = None
            priority = None
            user_ids = None
            progress = None
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

            response = edit_project(user_id=user['id'], 
                                    project_id=project_id, 
                                    project_status=status, 
                                    project_name=project_name, 
                                    description=description, 
                                    github=github, 
                                    link=link, 
                                    priority=priority, 
                                    )
            return jsonify(response), 200 if not isinstance(response, dict) else response
   
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
    
    elif REQUEST == 'DELETE':
        user =  valid_token() 
        if user == False: 
            return jsonify({'message': 'You are not authorized'}), 401 
     
        try:
            data = request.get_json()
            account_id = data['user_id']
            project_id = data['project_id']
 
            response = delete_project(project_id=project_id, account_id=account_id)
            return jsonify(response), 200 if not isinstance(response, dict) else response
 
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400

def projects():
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch projects
        try:
            response = fetch_projects()
            return jsonify(response), 200 if not isinstance(response, dict) else response
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
        
    # Create title
    elif REQUEST == 'POST':
        user =  valid_token() 
        if user == False: 
            return jsonify({'message': 'You are not authorized'}), 401
        try:
            image = request.files['image']
            account_id = user.get('id')
            project_name = request.form['project_name']
            description = request.form['description']
            github = request.form['github']
            link = request.form['link']               
            tags = request.form['tags']
            team = request.form['team']
            features = request.form['features']
            manager = request.form['manager']
            due_date = request.form['due_date']
            
            ic(manager)
            ic(team)
            ic(tags)
            
            res = uploadImage(image=image)
            
            if 'url' in res:
                if account_id and project_name and description and github and link:
                    response = create_project(
                        account_id=user.get('id'), 
                        image=res['url'], 
                        project_name=project_name, 
                        description=description,
                        github=github, 
                        link=link, 
                        tags=tags,
                        team=team,
                        manager=manager,
                        due_date=due_date,
                        features=features
                        )
                    return jsonify(response), 200 if not isinstance(response, dict) else response

        except json.decoder.JSONDecodeError as error:
            ic(error)
            return jsonify(error), 400


def project_chat(id):
    REQUEST = request.method 
    if REQUEST == 'POST':
        user =  valid_token() 
        if user == False: 
            return jsonify({'message': 'You are not authorized'}), 401 
     
        try:            
            data = request.get_json()
            message = data['message']
            project_id = data['project_id']
            
            if user.get('id') and message and project_id:
                response = create_project_chat(account_id=user.get('id'), message=message, project_id=project_id)
                return jsonify(response), 200 if not isinstance(response, dict) else response
                
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
    
    REQUEST = request.method 
    if REQUEST == 'GET':
        try:
            response = fetch_projects_chats(id)
            return jsonify(response), 200 if not isinstance(response, dict) else response
    
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400


def add_project_like(id):
    REQUEST = request.method 
    if REQUEST == 'POST':
        user =  valid_token() 
        if user == False: 
            return jsonify({'message': 'You are not authorized'}), 401 
     
        try:            
            data = request.get_json()
            account_id = data['account_id']
            
            if account_id and id:
                response = project_like(account_id, id)
                return jsonify(response), 200 if not isinstance(response, dict) else response
 
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
        


def project_feedback(id):
    REQUEST = request.method 
    if REQUEST == 'POST':
        user =  valid_token() 
        if user == False: 
            return jsonify({'message': 'You are not authorized'}), 401 
     
        try:            
            data = request.get_json()
            message = data['comment']
            project_id = data['project_id']
            
            if user.get('id') and message and project_id:
                response = create_project_feedback(account_id=user.get('id'), message=message, project_id=project_id)
                return jsonify(response), 200 if not isinstance(response, dict) else response
                
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
    
    REQUEST = request.method 
    if REQUEST == 'GET':
        try:
            response = fetch_project_feedback(id)
            return jsonify(response), 200 if not isinstance(response, dict) else response
    
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400

