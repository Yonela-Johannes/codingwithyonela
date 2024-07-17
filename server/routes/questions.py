import json
from flask import request
from sqlalchemy import JSON
from controllers.blog import ( create_blog, create_blog_comment, fetch_blog, edit_blog, delete_blog, fetch_blog_comments, fetch_blogs )
from slugify import slugify

from controllers.question import create_question, create_question_comment, edit_question, fetch_question, fetch_question_comments, fetch_questions

def questions(id):
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
            if id:
                response = fetch_question(id)
                if response:
                    res = {
                            "message": "Fetch successful",
                            "data": response
                            }
                    return res, 200
                else:
                    res = {"message": "Fetch failed: something went wrong."}
                    return res, 400
            
        except:
            return {"message": "Fetch failed: something went wrong."}
            
        # edit/update
    elif REQUEST == 'PUT':
        try:
            data = request.get_json()
            account_id = data['account_id']
            question_id = data['question_id']
            question = data['question']
            category_id = data['category_id']
            topic_id = data['topic_id']
            
            if id and account_id and question_id and category_id and topic_id and question:
                response = edit_question(account_id, question, category_id, topic_id, question_id)
                if response:
                        res = {"data": f"{response}",
                            "message": "Update successful"
                            }
                        return res, 200
            res = {"message": "Title or is ID invalid"}
            return res, 400
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return res, 400
    
    # delete
    elif REQUEST == 'DELETE':
        try:
            response = json.loads(response)
            id = json.loads(request.data)['id']
            if id:
                response = delete_blog(id)
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
    
    
def question():
    REQUEST = request.method
    if REQUEST == 'POST':
        try:
            data = request.get_json()
            account_id = data['account_id']
            question = data['question']
            category_id = data['category_id']
            topic_id = data['topic_id']
            token = data['token']

            if account_id and question and category_id:
                response = create_question(account_id=account_id, question=question, category_id=category_id, topic_id=topic_id, token=token)
                if response:
                        res = {"data": "Question created successful"}
                        return res, 201
                else:
                    res = {"message": "Question already exist"}
                    return res, 400 
                
            res = {"message": "Error: Something went wrong"}
            return res, 400 
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return res, 400 
    elif REQUEST == 'GET':
        try:
            response = fetch_questions()
           
            if response == None:
                res = {"data": []}
                return res, 200
            elif response:
                res = {"data": response}
                return res, 200
            else:                
                res = {"data", []}
                return res, 200
        except:
            return {"message": "Fetch failed: something went wrong."}
        
        
def question_comments(id):
    REQUEST = request.method
    if REQUEST == 'GET':
        try:
            if id:
                response = fetch_question_comments(id)
                print("RESPONSE: ", response)
                res = {"data": response}
                return res, 200
            else:
                res = {"data": "Missing data"}
            return res, 200
        except:
            return {"message": "Fetch failed: something went wrong."}, 400
        
    REQUEST = request.method
    if REQUEST == 'POST':
        try:
            data = request.get_json()
            account_id = data['account_id']
            comment = data['comment']
            question_id = data['question_id']

            if account_id and comment and question_id:
                response = create_question_comment(account_id, comment,question_id)
                if response:
                        res = {"data": f"{response}",
                               "message": "Commented successful"}
                        return res, 201
                else:
                    res = {"message": "Blog already exist"}
                    return res, 400 
                
            res = {"message": "Title invalid: (you must enter title)"}
            return res, 400 
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return res, 400 