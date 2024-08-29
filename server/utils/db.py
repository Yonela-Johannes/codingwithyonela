
import os
import psycopg2
from dotenv import load_dotenv
from icecream import ic

load_dotenv()

connection = psycopg2.connect(
    dbname=os.getenv('POSTGRES_DATABASE'),
    user=os.getenv('POSTGRES_USER'),
    password=os.getenv('POSTGRES_PASSWORD'),
    host=os.getenv('POSTGRES_HOST'),
    )