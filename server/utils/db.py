import os
import psycopg2
from psycopg2 import OperationalError, InterfaceError
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

POSTGRES_DATABASE = os.getenv('POSTGRES_DATABASE')
POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_HOST = os.getenv('POSTGRES_HOST')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')

def create_connection():
    try:
        connection = psycopg2.connect(
            dbname=POSTGRES_DATABASE,
            user=POSTGRES_USER,
            host=POSTGRES_HOST,
            password=POSTGRES_PASSWORD,
        )
        print("Database connection successful")
        return connection
    except OperationalError as e:
        print(f"The error '{e}' occurred while connecting to the database")
        return None
    
def get_connection(connection):
    try:
        # Check if the connection is closed and reconnect if necessary
        if connection is None or connection.closed:
            print("Reconnecting to the database...")
            connection = create_connection()
        return connection
    except InterfaceError as e:
        print(f"Error reconnecting: {e}")
        return None
    
connection = create_connection()

connection = get_connection(connection)