import json
from flask import request, jsonify
from sqlalchemy import JSON
from icecream import ic
from utils.token_handler import valid_token
from controllers.note_controller import create_note, fetch_note, fetch_notes, edit_note, delete_note, pin_note

def note():
    REQUEST = request.method 
    if REQUEST == 'GET':
        slug = request.args.get('slug')
        # Fetch one
        try:
            response = fetch_note(slug=slug)
            return jsonify(response), 200 

        except Exception as error:
            # Generic exception handling
            return jsonify({"error": str(error)}), 500
            
        # edit/update
    elif REQUEST == 'PUT':

        user =  valid_token() 
        if user == False: 
            return jsonify({'message': 'You are not authorized'}), 401

        try:
            data = request.form
            id = data.get('id')
            pin = data.get('pin')

            if pin and id:
                if pin == 'false':
                    pin = 'true'
                elif pin == 'true':
                    pin = 'false'
                    
                response = pin_note(
                    pin=pin,
                    id=id
                    )
                return jsonify(response), 200 if not isinstance(response, dict) else response
        
            elif id:
                title = data.get('title')
                slug = title.replace(" ", "-").lower()
                content = data.get('content')
                tags = ''
                if 'tags' in data:
                    tags = data.get('tags')
                
                response = edit_note(
                    title=title,
                    content=content, 
                    tags=tags, 
                    slug=slug,
                    id=id
                    )
                return jsonify(response), 200 if not isinstance(response, dict) else response
            else:
                return jsonify('Invalid task id'), 400 if not isinstance(response, dict) else response
                
        except Exception as error:
            # Generic exception handling
            ic(error)
            return jsonify({"error": str(error)}), 500
    
    # delete
    elif REQUEST == 'DELETE':
        user =  valid_token() 
        if user == False: 
            return jsonify({'message': 'You are not authorized'}), 401
        try:
            data = request.form
            id = data.get('id')
            
            if id:
                response = delete_note(id=id)
                return jsonify(response), 200 if not isinstance(response, dict) else response
        
        except Exception as error:
            # Generic exception handling
            return jsonify({"error": str(error)}), 500
      
def notes():
    REQUEST = request.method
    if REQUEST == 'POST':
        
        user =  valid_token() 
        if user == False: 
            return jsonify({'message': 'You are not authorized'}), 401
        
        try:
            data = request.form

            title = data['title']
            slug = title.replace(" ", "-").lower()
            content = data['content']
            tags = ''
            if 'tags' in data:
                tags = data['tags']
        
            response = create_note(
                account=user.get('id'), 
                title=title,
                content=content, 
                tags=tags, 
                slug=slug,
                )
            
            return jsonify(response), 200 if not isinstance(response, dict) else response

        except Exception as error:
            # Generic exception handling
            return jsonify({"error": str(error)}), 500
            
    elif REQUEST == 'GET':
        try:
            response = fetch_notes()
            return jsonify(response), 200 if not isinstance(response, dict) else response
        except Exception as error:
            # Generic exception handling
            return jsonify({"error": str(error)}), 500
        