import os
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from models.tables import create_tables
from routes.countries import countries
from routes.project import add_project_like, project, project_chat, projects
from routes.questions import question, question_comments, questions
from routes.quotes import quotes
from routes.recommendation import all_recommendations, recommendation
from routes.status import status
from routes.topics import topics
from routes.user import create_user_profile, user
from routes.title import title
from routes.blog import blog, blogs, blogs_comment_create, blogs_comments
from routes.category import category
from routes.suggestion import all_suggestion, get_suggestion_comments, get_suggestion_response, suggestion, suggestion_comment, suggestion_response
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


# quotes route
@app.route('/api/v1/quote', methods=['GET', 'POST'])
def quotes_route():
    return quotes()
# ----------------

# title route
@app.route('/api/v1/title', methods=['GET', 'POST', 'PUT', 'DELETE'])
def title_route():
    return title()
# ----------------

# contries route
@app.route('/api/v1/countries', methods=['GET'])
def countries_route():
    return countries()
# ----------------

# topic route
@app.route('/api/v1/topics', methods=['GET'])
def topics_route():
    return topics()
# ----------------

@app.route('/api/v1/user/<int:id>' , methods=['GET', 'PUT', 'DELETE'])
def user_route(id):
    print("USER: ", type(id))
    return user(id)

# user route
@app.route('/api/v1/user' , methods=['POST', 'GET'])
def create_user_route():
    return create_user_profile()
# ----------------

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

# ----------------
# question route
@app.route('/api/v1/question/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def question_route(id):
    return questions(id)

@app.route('/api/v1/question', methods=['GET', 'POST'])
def all_question_route():
    return question()

# question comments route
@app.route('/api/v1/question-comment/<int:id>', methods=['GET', 'DELETE', 'POST'])
def all_question_comments_route(id):
    return question_comments(id)
# ----------------

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
# ----------------

# status route
@app.route('/api/v1/status', methods=['GET', 'POST', 'PUT', 'DELETE'])
def status_route():
    return status()
# ----------------

# recommendation route
@app.route('/api/v1/recommendation', methods=['GET', 'POST', 'DELETE'])
def recommendations_route():
    return all_recommendations()

@app.route('/api/v1/recommendation/<int:id>', methods=['GET', 'PUT'])
def recommendation_route(id):
    return recommendation(id)

# ---------------------
# project route
@app.route('/api/v1/project', methods=['GET', 'POST'])
def project_route():
    return projects()

# project route
@app.route('/api/v1/project/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def projects_route(id):
    return project(id)

@app.route('/api/v1/project-chat/<int:id>', methods=['GET', 'POST'])
def project_chat_route(id):
    return project_chat(id)

# comment project route
@app.route('/api/v1/project-like/<int:id>', methods=['POST'])
def create_project_like(id):
    return add_project_like(id)

# ----------------