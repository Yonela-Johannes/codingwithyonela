
import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DATABASE = os.getenv('DATABASE')
DATABASE_USER = os.getenv('DATABASE_USER')
HOST = os.getenv('HOST')
PASSWORD = os.getenv('PASSWORD')
PORT = os.getenv('PORT')
from psycopg2 import pool

P_connection = psycopg2.connect(
    database = DATABASE, 
    user = DATABASE_USER, 
    host= HOST,
    password = PASSWORD,
    port = PORT)


connection_pool = pool.SimpleConnectionPool(
    minconn=1,
    maxconn=10,
    database = DATABASE, 
    user = DATABASE_USER, 
    host= HOST,
    password = PASSWORD
)

connection = connection_pool.getconn()