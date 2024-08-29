import json
from flask import request, jsonify
from sqlalchemy import JSON
from controllers.post_controller import ( create_post, fetch_post, create_post_comment, fetch_post_comment, fetch_posts, edit_post, delete_post, create_poll_vote, create_post_response, fetch_post_response, edit_post_status )
from icecream import ic
from routes.image_upload import uploadImage
from faker import Faker

fake = Faker()

def post(id):
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
            response = fetch_post(id)
            return jsonify(response), 200 if not isinstance(response, dict) else response[1]

        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
            
        # edit/update
    elif REQUEST == 'PUT':
        try:
            data = request.get_json()
            user_id = data['account']
            post_id = data['post']
            
            if 'status' in data and post_id:
                status = data['status']
                response = edit_post_status(id=post_id, status=status)
                return jsonify(response), 200 if not isinstance(response, dict) else response[1]
            elif id and user_id and post_id:
                response = edit_post(id=post_id, user_id=user_id)
                return jsonify(response), 200 if not isinstance(response, dict) else response[1]

        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
    
    # delete
    elif REQUEST == 'DELETE':
        try:
            data = request.get_json(force=True, silent=False, cache=True)
            account = data['account']
            post_user = data['post_user']
            post_id = data['post']

            if account == post_user:
                response = delete_post(post_id=post_id, account_id=account)
                if response == None:
                    return jsonify(response), 200 if not isinstance(response, dict) else response[1]

        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
    
    
def posts():
    REQUEST = request.method
    if REQUEST == 'POST':
        try:
            data = request.form
            get_files = request.files
            account = data['account']

            image = ''
            text = ''
            answers = {}
            post_type = ''
            if data['type'] == 'Post':
                post_type = 'post'
            elif data['type'] == 'Question':
                post_type = 'question'
            elif data['type'] == 'Suggestion':
                post_type = 'suggestion'
            elif data['type'] == 'Poll':
                post_type = 'poll'
                answers = {
                "answer_one": data['answer_one'],
                "answer_two": data['answer_two'],
                "answer_three": data['answer_three']
            }

            elif data['type'] == 'Image / Video':
                post_type = 'image/video'
                text = fake.text()
            if "text" in data:
                text = data['text']
            
            if 'image' in get_files:
                new_image = uploadImage(get_files['image'])
                image = new_image['url']
      
            video = ''
            if 'video' in get_files:
                new_video = uploadImage(get_files['video'])
                video = new_video['url']
    
            response = create_post(account_id=account, text=text, image=image, video=video, post_type=post_type, answers=answers)
            return jsonify(response), 400
    
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
        
    elif REQUEST == 'GET':
        try:
            response = fetch_posts()
            return jsonify(response), 200 if not isinstance(response, dict) else response[1]
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
        
        
def post_comment(id):
    REQUEST = request.method
    if REQUEST == 'GET':
        try:
            response = fetch_post_comment(id)
            return jsonify(response), 200 if not isinstance(response, dict) else response[1]

        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
        
def post_comment_create():
    REQUEST = request.method
    if REQUEST == 'POST':
        try:
            data = request.get_json()
            account_id = data['account']
            comment = data['comment']
            post_id = data['post']

            response = create_post_comment(account_id=account_id, comment=comment, post_id=post_id)
            return jsonify(res), 400

        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
        
def post_vote_create(id):
    REQUEST = request.method
    if REQUEST == 'POST':
        try:
            data = request.get_json()
            account_id = data['account']
            post_id = data['post']

            response = create_poll_vote(account_id=account_id, poll_a_id=post_id)
            return jsonify(res), 200

        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
    
def post_response_create():
    REQUEST = request.method
    if REQUEST == 'POST':
        try:
            data = request.get_json()
            account_id = data['account']
            post = data['text']
            post_id = data['post']
            
            response = create_post_response(account_id=account_id, text=post, post_id=post_id)
            return jsonify(response), 400

        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
        
        
def post_response(id):
    REQUEST = request.method
    if REQUEST == 'GET':
        try:
            response = fetch_post_response(id)
            return jsonify(response), 200 if not isinstance(response, dict) else response[1]
  
        except json.decoder.JSONDecodeError as error:
                return jsonify(error), 400