import json
from flask import request
from sqlalchemy import JSON
from controllers.blog import ( create_blog, create_blog_comment, fetch_blog, edit_blog, delete_blog, fetch_blog_comments, fetch_blogs )
from slugify import slugify
from icecream import ic

def blog(id):
    REQUEST = request.method 
    if REQUEST == 'GET':
        # Fetch one
        try:
            if id:
                response = fetch_blog(id)
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
            id = data['id']
            post = data['post']
            category_id = data['category_id']
            blog_image = data['blog_image']
            
            if id:
                response = edit_blog(id, post, category_id, blog_image)
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
            data = request.get_json()
            id = data['id']
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
    
    
def blogs():
    REQUEST = request.method
    if REQUEST == 'POST':
        try:
            data = request.get_json()
            ic(data['post'])
            account = data['account']
            post = data['post']
            category_id = data['category_id']
            blog_image = data['blog_image']
            blog_title = data['blog_title']
            slug = slugify(blog_title)
            
            if account and post and category_id:
                response = create_blog(account, post, category_id, blog_image, blog_title, slug)
                if response:
                        res = {"message": "Blog created successful"}
                        return res, 201
                else:
                    res = {"message": "Blog already exist"}
                    return res, 400 
                
            res = {"message": "Title invalid: (you must enter title)"}
            return res, 400 
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return res, 400 
    elif REQUEST == 'GET':
        try:
            response = fetch_blogs()
            res = {"data": response}
            return res, 200
        except:
            return {"message": "Fetch failed: something went wrong."}
        
        
def blogs_comments(id):
    REQUEST = request.method
    if REQUEST == 'GET':
        try:
            if id:
                response = fetch_blog_comments(id)
                print("RESPONSE: ", response)
                res = {"data": response}
                return res, 200
            else:
                res = {"data": "Missing data"}
            return res, 200
        except:
            return {"message": "Fetch failed: something went wrong."}, 400
        
def blogs_comment_create():
    REQUEST = request.method
    if REQUEST == 'POST':
        try:
            data = request.get_json()
            account_id = data['account_id']
            comment = data['comment']
            blog_id = data['blog_id']

            if account_id and comment and blog_id:
                response = create_blog_comment(account_id, comment,blog_id)
                if len(response) > 0:
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