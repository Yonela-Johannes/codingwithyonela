import os
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from models.tables import create_tables
from routes.countries import countries
from routes.project import add_project_like, project, project_chat, projects
from routes.quotes import quotes
from routes.recommendation import all_recommendations, recommendation
from routes.feedback import all_feedback, feedback
from routes.event import all_events, event
from routes.topics import topics
from routes.user import create_user_profile, user, login_user, verify_user, users
from routes.title import title
from routes.blog import blog, blogs, blogs_comment_create, blogs_comments
from routes.post_router import post, posts, post_comment_create, post_comment, post_vote_create, post_response_create, post_response
from routes.task import task, project_task
from utils.token_handler import valid_token
from routes.enums import blog_enum
from flask_cors import CORS, cross_origin
from flask_mail import Mail
from dotenv import load_dotenv
from icecream import ic

load_dotenv()
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app, supports_credentials=True)

app.config.update(dict(
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = 465,
    MAIL_USERNAME = 'johannesyonela@gmail.com',
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD'),
    MAIL_USE_TLS = False,
    MAIL_USE_SSL = True,
))

mail = Mail(app)

# task route
@app.route('/' , methods=['GET'])
def test_route():
    return quotes()

# task route
@app.route('/api/v1/task/<int:project_id>' , methods=['GET', 'PUT', 'DELETE', 'POST'])
def task_route(project_id):
    return project_task(project_id=project_id)

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
    return user(id)

# user route
@app.route('/api/v1/login', methods=['GET'])
def login_route():
    return login_user()

# user route
@app.route('/api/v1/user', methods=['POST', 'GET'])
def create_user_route():
    return create_user_profile(mail)

# user route
@app.route('/api/v1/users', methods=['POST', 'GET'])
def users_route():
    return users()

# verify user route
@app.route('/api/v1/verify-email', methods=['GET', 'POST'])
def confirm_email():
    return verify_user()
# ----------------

# blog route
@app.route('/api/v1/blog', methods=['GET', 'PUT', 'DELETE'])
def blog_route():
    return blog()

@app.route('/api/v1/blogs', methods=['GET', 'POST'])
def all_blogs_route():
    return blogs()

@app.route('/api/v1/blog-enums', methods=['GET', 'POST'])
def blog_enums_route():
    return blog_enum()

# blog comments route
@app.route('/api/v1/blogs-comment', methods=['GET', 'DELETE'])
def all_blogs_comments_route():
    return blogs_comments()

# blog comments route
@app.route('/api/v1/blog-comment', methods=['GET', 'POST'])
def blogs_comments_route():
    return blogs_comment_create()

# recommendation route
@app.route('/api/v1/recommendation', methods=['GET', 'POST', 'DELETE'])
def recommendations_route():
    return all_recommendations(mail=mail)

@app.route('/api/v1/recommendation/<int:id>', methods=['GET', 'PUT'])
def recommendation_route(id):
    return recommendation(id, mail)

# feedback route
@app.route('/api/v1/event', methods=['GET', 'POST', 'DELETE'])
def feedbacks_route():
    return all_events()

@app.route('/api/v1/event/<int:id>', methods=['GET', 'PUT'])
def feedback_route(id):
    return event(id)

# ---------------------

# events route
@app.route('/api/v1/feedback', methods=['GET', 'POST', 'DELETE'])
def event_route():
    return all_feedback(mail=mail)

@app.route('/api/v1/feedback/<int:id>', methods=['GET', 'PUT'])
def events_route(id):
    return feedback(id, mail)

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

#post route
@app.route('/api/v1/post/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def feed_route(id):
    return post(id)

@app.route('/api/v1/posts', methods=['GET', 'POST'])
def all_feeds_route():
    return posts()

#post comments route
@app.route('/api/v1/posts-comment/<int:id>', methods=['GET', 'DELETE'])
def get_post_comment(id):
    return post_comment(id)

#post comments route
@app.route('/api/v1/posts-comment', methods=['GET', 'POST'])
def get_feeds_route():
    return post_comment_create()

#post comments route
@app.route('/api/v1/posts-response/<int:id>', methods=['GET', 'DELETE'])
def get_post_response(id):
    return post_response(id)

#post response route
@app.route('/api/v1/posts-response', methods=['GET', 'POST'])
def response_route():
    return post_response_create()

#post vote route
@app.route('/api/v1/posts-vote/<int:id>', methods=['GET', 'POST'])
def vote_route(id):
    return post_vote_create(id)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
