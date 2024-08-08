import json
from flask import request
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
            # ic(response)
            # if response:
            #         res = {"message": "Blog created successful"}
            #         return res, 201
            # else:
            #     res = {"message": "Blog already exist"}
            #     return res, 400 

        except json.decoder.JSONDecodeError:
            res = {"message": "Missing data"}
        return res, 400 
    elif REQUEST == 'GET':
        try:
            response = fetch_blog_enum()
            res = {"data": response}
            return res, 200
        except:
            return {"message": "Fetch failed: something went wrong."}
       