import os
from flask_sqlalchemy import SQLAlchemy
import psycopg2
import sqlalchemy
from dotenv import load_dotenv
from flask import Flask

load_dotenv()
app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
