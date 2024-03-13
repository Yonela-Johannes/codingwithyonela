import os
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from models.tables import create_tables
from routes.recommendation import recommendation
from routes.status import status
from routes.user import create_user_profile, user
from routes.title import title
from routes.blog import blog, blogs
from routes.category import category
from routes.suggestion import all_suggestion, suggestion, suggestion_response
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/v1/title', methods=['GET', 'POST', 'PUT', 'DELETE'])
def title_route():
    return title()

@app.route('/api/v1/user/<int:id>' , methods=['GET', 'PUT', 'DELETE'])
def user_route(id):
    print("USER: ", type(id))
    return user(id)

@app.route('/api/v1/user' , methods=['POST', 'GET'])
def create_user_route():
    return create_user_profile()

@app.route('/api/v1/blog/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def blog_route(id):
    return blog(id)

@app.route('/api/v1/blogs', methods=['GET', 'POST'])
def all_blogs_route():
    return blogs()

@app.route('/api/v1/category', methods=['GET', 'POST', 'PUT', 'DELETE'])
def category_route():
    return category()


@app.route('/api/v1/suggestion/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def suggestions_route():
    return suggestion(id)

@app.route('/api/v1/suggestion', methods=['GET', 'POST'])
def suggestion_route():
    return all_suggestion()

@app.route('/api/v1/suggestion-response', methods=['GET', 'POST'])
def suggestion_response_route():
    return suggestion_response()

@app.route('/api/v1/status', methods=['GET', 'POST', 'PUT', 'DELETE'])
def status_route():
    return status()

@app.route('/api/v1/recommendation', methods=['GET', 'POST', 'PUT', 'DELETE'])
def recommendation_route():
    return recommendation()