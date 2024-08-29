
import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

POSTGRES_DATABASE = os.getenv('POSTGRES_DATABASE')
POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_HOST = os.getenv('POSTGRES_HOST')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
POSTGRES_URL = os.getenv('POSTGRES_URL')
PORT = os.getenv('PORT')
from psycopg2 import pool

connection_pool = pool.SimpleConnectionPool(
    minconn=1,
    maxconn=10,
    database = POSTGRES_DATABASE, 
    user = POSTGRES_USER, 
    host= POSTGRES_HOST,
    password = POSTGRES_PASSWORD
)

connection = connection_pool.getconn()