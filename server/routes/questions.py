import json
from flask import request, jsonify
from sqlalchemy import JSON
from controllers.blog import ( create_blog, create_blog_comment, fetch_blog, edit_blog, delete_blog, fetch_blog_comments, fetch_blogs )
from slugify import slugify
from utils.token_handler import valid_token

from controllers.question import create_question, create_question_comment, edit_question, fetch_question, fetch_question_comments, fetch_questions

def questions(id):
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
            response = fetch_question(id)
            return jsonify(res), 200

        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
        
        # edit/update
    elif REQUEST == 'PUT':
        valid_token()
        vali
        try:
            data = request.get_json()
            account_id = data['account_id']
            question_id = data['question_id']
            question = data['question']
            category_id = data['category_id']
            topic_id = data['topic_id']
            
            if id and account_id and question_id and category_id and topic_id and question:
                response = edit_question(account_id, question, category_id, topic_id, question_id)
                return jsonify(response), 200 if not isinstance(response, dict) else response[1]

        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
    
    # delete
    elif REQUEST == 'DELETE':
        valid_token()
        try:
            response = json.loads(response)
            id = json.loads(request.data)['id']
            if id:
                response = delete_blog(id)
                return jsonify(response), 200 if not isinstance(response, dict) else response[1]
            
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400

def question():
    REQUEST = request.method
    if REQUEST == 'POST':
        valid_token()
        try:
            data = request.get_json()
            account_id = data['account_id']
            question = data['question']
            topic_id = data['topic_id']

            if account_id and question:
                response = create_question(account_id=account_id, question=question, topic_id=topic_id)
                return jsonify(response), 400

        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
        
    elif REQUEST == 'GET':
        try:
            response = fetch_questions()
            return jsonify(res), 200

        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
        
        
def question_comments(id):
    REQUEST = request.method
    if REQUEST == 'GET':
        valid_token()
        try:
            if id:
                response = fetch_question_comments(id)
                return jsonify(response), 200 if not isinstance(response, dict) else response[1]
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400

    if REQUEST == 'POST':
        try:
            data = request.get_json()
            account_id = data['account_id']
            comment = data['comment']
            question_id = data['question_id']

            if account_id and comment and question_id:
                response = create_question_comment(account_id, comment,question_id)
                return jsonify(response), 400

        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400