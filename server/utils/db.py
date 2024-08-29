
import os
from psycopg2.pool import SimpleConnectionPool
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

# Initialize the connection pool
try:
    connection_pool = SimpleConnectionPool(
        minconn=1,
        maxconn=10,
        dbname=POSTGRES_DATABASE,  # Changed 'database' to 'dbname' for psycopg
        user=POSTGRES_USER,
        host=POSTGRES_HOST,
        password=POSTGRES_PASSWORD
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