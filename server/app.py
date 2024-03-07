import os
from flask_sqlalchemy import SQLAlchemy
import psycopg2
import sqlalchemy
from dotenv import load_dotenv
from flask import Flask
from models.tables import create_tables
from routes.recommendation import recommendation
from routes.status import status
from routes.user import user
from routes.title import title
from routes.blog import blog
from routes.category import category
from routes.suggestion import suggestion

app = Flask(__name__)
create_tables()


@app.route('/api/v1/title', methods=['GET', 'POST', 'PUT', 'DELETE'])
def title_route():
    return title()


@app.route('/api/v1/user', methods=['GET', 'POST', 'PUT', 'DELETE'])
def user_route():
    return user()

@app.route('/api/v1/blog', methods=['GET', 'POST', 'PUT', 'DELETE'])
def blog_route():
    return blog()

@app.route('/api/v1/category', methods=['GET', 'POST', 'PUT', 'DELETE'])
def category_route():
    return category()

@app.route('/api/v1/suggestion', methods=['GET', 'POST', 'PUT', 'DELETE'])
def suggestion_route():
    return suggestion()

@app.route('/api/v1/status', methods=['GET', 'POST', 'PUT', 'DELETE'])
def status_route():
    return status()

@app.route('/api/v1/recommendation', methods=['GET', 'POST', 'PUT', 'DELETE'])
def recommendation_route():
    return recommendation()