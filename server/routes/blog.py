import json
from flask import request, jsonify
from sqlalchemy import JSON
from controllers.blog import ( create_blog, create_blog_comment, fetch_blog, edit_blog, delete_blog, fetch_blog_comments, fetch_blogs )
from slugify import slugify
from controllers.enum_controller import fetch_blog_enum
from icecream import ic
from routes.image_upload import uploadImage

def blog():
    REQUEST = request.method 
    if REQUEST == 'GET':
        slug = request.args.get('slug')
        # Fetch one
        try:
            response = fetch_blog(slug=slug)
            return jsonify(response), 200

        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
            
        # edit/update
    elif REQUEST == 'PUT':
        try:
            data = request.get_json()
            id = data['id']
            post = data['post']
            category_id = data['category_id']
            blog_image = data['blog_image']
            
            response = edit_blog(id, post, category_id, blog_image)
            return jsonify(response), 200
        
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
    
    # delete
    elif REQUEST == 'DELETE':
        try:
            data = request.get_json()
            id = data['id']
            response = delete_blog(id)
            return jsonify(response), 200

        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
      
def blogs():
    REQUEST = request.method
    if REQUEST == 'POST':
        try:
            files = request.files
            data = request.form
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
                return jsonify({"message": "Error image u0pload"}), 400

            response = create_blog(
                account=account, 
                post=post, 
                blog_image=blog_image, 
                blog_title=blog_title,
                slug=slug,
                category=category
                )
            
            return jsonify(response), 201


        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
            
    elif REQUEST == 'GET':
        try:
            response = fetch_blogs()
            return jsonify(response), 200
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
        
def blogs_comments():
    REQUEST = request.method
    if REQUEST == 'GET':
        try:
            id = request.args.get('id')
            response = fetch_blog_comments(id)
            return jsonify(response), 200


        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
        
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
                return jsonify(response), 201

        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
    
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
            return jsonify(response), 201


        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400
        
    elif REQUEST == 'GET':
        try:
            response = fetch_blog_enum()
            return jsonify(response), 200
        except json.decoder.JSONDecodeError as error:
            return jsonify(error), 400