
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

load_dotenv()

# Retrieve the database connection information from environment variables
POSTGRES_DATABASE = os.getenv('POSTGRES_DATABASE')
POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_HOST = os.getenv('POSTGRES_HOST')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
PORT = os.getenv('PORT')

# Initialize the connection pool
try:
    connection_pool = psycopg2.connect(
    dbname=POSTGRES_DATABASE,
    user=POSTGRES_USER,
    host=POSTGRES_HOST,
    password=POSTGRES_PASSWORD,
    port = PORT
    )
    print("Connection pool created successfully")

except Exception as error:
    print(f"Error creating connection pool: {error}")
    connection_pool = None

# Example of using a connection from the pool
if connection_pool:
    try:
        connection = connection_pool.getconn()
        if connection:
            print("Successfully received a connection from the pool")
            # Use the connection here (e.g., execute a query)
            # Don't forget to release the connection back to the pool when done
            connection_pool.putconn(connection)
    except Exception as error:
        print(f"Error during database operation: {error}")