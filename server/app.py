import os
from flask_sqlalchemy import SQLAlchemy
import psycopg2
import sqlalchemy
from dotenv import load_dotenv
from flask import Flask
from models.tables import create_tables
from routes.user import user
from routes.title import title
from routes.blog import blog

app = Flask(__name__)
create_tables()


@app.route('/api/v1/title', methods=['GET', 'POST', 'PUT', 'DELETE'])
def title_route():
    return title()


@app.route('/api/v1/user', methods=['GET', 'POST', 'PUT', 'DELETE'])
def user_route():
    return user()

@app.category('/api/v1/blog', methods=['GET', 'POST', 'PUT', 'DELETE'])
def blog_route():
    return blog()

# @app.route('/api/v1/blog', methods=['GET', 'POST', 'PUT', 'DELETE'])
# def blog_route():
#     return blog()