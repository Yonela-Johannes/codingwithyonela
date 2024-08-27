import json
from flask import request, jsonify
from sqlalchemy import JSON
from controllers.blog import ( create_blog, create_blog_comment, fetch_blog, edit_blog, delete_blog, fetch_blog_comments, fetch_blogs )
from slugify import slugify
from icecream import ic
from routes.image_upload import uploadImage

def blog():
    REQUEST = request.method 
    if REQUEST == 'GET':
        slug = request.args.get('slug')
        # Fetch one
        try:
            response = fetch_blog(slug=slug)
            if response:
                res = {
                        "message": "Fetch successful",
                        "data": response
                        }
                return jsonify(res), 200
            else:
                res = {"message": "Fetch failed: something went wrong."}
                return jsonify(res), 400
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
            
            response = edit_blog(id, post, category_id, blog_image)
            res = {"data": response,
                "message": "Update successful"
                }
            return jsonify(res), 200
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return jsonify(res), 400
    
    # delete
    elif REQUEST == 'DELETE':
        try:
            data = request.get_json()
            id = data['id']
            response = delete_blog(id)
            if response == id:
                res = {"message": "Delete failed: something went wrong."}
                return jsonify(res), 400
            else:
                res = {
                        "message": "Delete successful"
                        }
                return jsonify(res), 200
            return jsonify(res), 400
        except json.decoder.JSONDecodeError:
           res = {"message": "Missing data"}
        return jsonify(res), 400
      
def blogs():
    REQUEST = request.method
    if REQUEST == 'POST':
        try:
            files = request.files
            data = request.form
            ic(data)
            account = data['account']
            post = data['post']
            category = data['category']
            image = files['image']
            blog_title = data['title']
            slug = slugify(blog_title)
            
            res = uploadImage(image=image)

            blog_image = ''
            if 'url' in res:
                blog_image = res['url']
            else:
                return {'message': 'Error image upload'}, 4000

            response = create_blog(
                account=account, 
                post=post, 
                blog_image=blog_image, 
                blog_title=blog_title,
                slug=slug,
                category=category
                )
            
            if response:
                    res = {"message": "Blog created successful"}
                    return jsonify(res), 201
            else:
                res = {"message": "Blog already exist"}
                return jsonify(res), 400

        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return jsonify(res), 400
    elif REQUEST == 'GET':
        try:
            response = fetch_blogs()
            res = {"data": response}
            return jsonify(res), 200
        except:
            return jsonify({"message": "Fetch failed: something went wrong."}), 400
        
        
def blogs_comments():
    REQUEST = request.method
    if REQUEST == 'GET':
        try:
            id = request.args.get('id')
            response = fetch_blog_comments(id)
            if response == None or len(response) < 1:
                res = {"data": []}
                return jsonify(res), 200
            else:
                res = {"data": response}
                return jsonify(res), 200

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
                        res = {"data": response,
                               "message": "Commented successful"}
                        return jsonify(res), 201
                else:
                    res = {"message": "Blog already exist"}
                    return jsonify(res), 400
                
            res = {"message": "Title invalid: (you must enter title)"}
            return jsonify(res), 400
        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return jsonify(res), 400
    
def blog_enum():
    REQUEST = request.method
    if REQUEST == 'POST':
        try:
            files = request.files
            data = request.form

            account = data['account']
            post = data['post']
            image = files['image']
            blog_title = data['title']
            slug = slugify(blog_title)
            
            res = uploadImage(image=image)

            blog_image = ''
            if 'url' in res:
                blog_image = res['url']
            else:
                return jsonify({'message': 'Error image upload'}), 400

            response = create_blog(
                account=account, 
                post=post, 
                blog_image=blog_image, 
                blog_title=blog_title, 
                slug=slug)
            if response:
                    res = {"message": "Blog created successful"}
                    return jsonify(res), 201
            else:
                res = {"message": "Blog already exist"}
                return jsonify(res), 400

        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return jsonify(res), 400
    elif REQUEST == 'GET':
        try:
            response = fetch()
            res = {"data": response}
            return jsonify(res), 200
        except:
            return {"message": "Fetch failed: something went wrong."}
       