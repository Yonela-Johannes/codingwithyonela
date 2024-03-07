import os
from flask_sqlalchemy import SQLAlchemy
import psycopg2
import sqlalchemy
from dotenv import load_dotenv
from flask import Flask
from models.tables import create_tables

app = Flask(__name__)
create_tables()

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
