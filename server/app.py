import os
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from models.tables import create_tables
from routes.recommendation import recommendation
from routes.status import status
from routes.user import create_user_profile, user
from routes.title import title
from routes.blog import blog, blogs, blogs_comment_create, blogs_comments
from routes.category import category
from routes.suggestion import all_suggestion, get_suggestion_comments, get_suggestion_response, suggestion, suggestion_comment, suggestion_response
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# title route
@app.route('/api/v1/title', methods=['GET', 'POST', 'PUT', 'DELETE'])
def title_route():
    return title()

@app.route('/api/v1/user/<int:id>' , methods=['GET', 'PUT', 'DELETE'])
def user_route(id):
    print("USER: ", type(id))
    return user(id)

# user route
@app.route('/api/v1/user' , methods=['POST', 'GET'])
def create_user_route():
    return create_user_profile()

# blog route
@app.route('/api/v1/blog/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def blog_route(id):
    return blog(id)

@app.route('/api/v1/blogs', methods=['GET', 'POST'])
def all_blogs_route():
    return blogs()


# blog comments route
@app.route('/api/v1/blogs-comment/<int:id>', methods=['GET', 'DELETE'])
def all_blogs_comments_route(id):
    return blogs_comments(id)

# blog comments route
@app.route('/api/v1/blog-comment', methods=['GET', 'POST'])
def blogs_comments_route():
    return blogs_comment_create()

# category route
@app.route('/api/v1/category', methods=['GET', 'POST', 'PUT', 'DELETE'])
def category_route():
    return category()

# suggestion route
@app.route('/api/v1/suggestion/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def suggestions_route(id):
    return suggestion(id)

@app.route('/api/v1/suggestion', methods=['GET', 'POST'])
def suggestion_route():
    return all_suggestion()

# suggestion response route
@app.route('/api/v1/suggestion-response/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def get_suggestion_response_route(id):
    return get_suggestion_response(id)

@app.route('/api/v1/suggestion-response', methods=['GET', 'POST'])
def suggestion_response_route():
    return suggestion_response()

# comment suggestion route
@app.route('/api/v1/suggestion-comments/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def get_suggestion_comments_route(id):
    return get_suggestion_comments(id)

@app.route('/api/v1/comment-suggestion', methods=['GET', 'POST'])
def suggestion_comment_route():
    return suggestion_comment()


# status route
@app.route('/api/v1/status', methods=['GET', 'POST', 'PUT', 'DELETE'])
def status_route():
    return status()

# recommendation route
@app.route('/api/v1/recommendation', methods=['GET', 'POST', 'PUT', 'DELETE'])
def recommendation_route():
    return recommendation()