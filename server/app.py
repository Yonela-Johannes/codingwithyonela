import os
from flask_sqlalchemy import SQLAlchemy
import psycopg2
import sqlalchemy
from dotenv import load_dotenv
from flask import Flask
from models.tables import create_tables

app = Flask(__name__)
create_tables()

from routes.title import title

@app.route('/api/v1/title', methods=['GET', 'POST', 'PUT', 'DELETE'])
def title_route():
    return title()
    
# @app.route("/api/v1/")
# def hello_world():
    
#     return "<p>Hello, World!</p>"
