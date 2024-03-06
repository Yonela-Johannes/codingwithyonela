import os
import psycopg2
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask import Flask

load_dotenv()
app = Flask(__name__)

database_url = os.getenv('DATABASE_URL')
connection = psycopg2.connect(database_url)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
