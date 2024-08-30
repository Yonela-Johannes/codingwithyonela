import json
from flask import request, jsonify
from sqlalchemy import JSON
from controllers.enum_controller import ( fetch_blog_enum )
from slugify import slugify
from icecream import ic


def blog_enum():
    REQUEST = request.method
    if REQUEST == 'POST':
        try:
            files = request.files
            data = request.form

            account = data['account']
            # post = data['post']
            # blog_image = ''
            # if 'url' in res:
            #     blog_image = res['url']
            # else:
            #     return {'message': 'Error image upload'}, 4000

            # response = create_blog(
            #     account=account, 
            #     post=post, 
            #     blog_image=blog_image, 
            #     blog_title=blog_title, 
            #     slug=slug)
            # if response:
            #         res = {"message": "Blog created successful"}
            #         return jsonify(res), 400
            # else:
            #     res = {"message": "Blog already exist"}
            #     return jsonify(res), 400

        except Exception as error:
            # Generic exception handling
            return jsonify({"error": str(error)}), 500
    elif REQUEST == 'GET':
        try:
            response = fetch_blog_enum()
            ic(response)
            return jsonify(response), 200 if not isinstance(response, dict) else response
        
        except Exception as error:
            # Generic exception handling
            return jsonify({"error": str(error)}), 500