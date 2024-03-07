import json
import flask
from flask import Response, request
from controllers.title import ( create_title )

def title():
    REQUEST = request.method 
    if REQUEST == 'GET':
        response = create_title(data)
        if response == data:
                res = {"title": f"{response}"}
                return res, 201
        else:
            res = {"message": f"{data} already exist"}
            return res, 400 
    elif REQUEST == 'POST':
        data = json.loads(request.data)['title']
        if data:
            response = create_title(data)
            if response == data:
                    res = {"title": f"{response}"}
                    return res, 201
            else:
                res = {"message": f"{data} already exist"}
                return res, 400 
            
    elif REQUEST == 'PUT':
        return {"title": "You have updated the user"}
    elif REQUEST == 'DELETE':
        return {"title": "You have deleted the user"}