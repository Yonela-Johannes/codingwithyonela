import os
import psycopg2
from dotenv import load_dotenv
load_dotenv()

import json
 
f = open('topic.json')
 
POSTGRES_DATABASE = os.getenv('POSTGRES_DATABASE')
POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_HOST = os.getenv('POSTGRES_HOST')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')

connection = psycopg2.connect(
    dbname=POSTGRES_DATABASE,
    user=POSTGRES_USER,
    host=POSTGRES_HOST,
    password=POSTGRES_PASSWORD,
    )

def insert_topics():
    """Inserting topics"""
    data = json.load(f)
    for topic in data['topics']:
        sql = """INSERT INTO topics (name)
                VALUES(%s) RETURNING id;"""
        
        response = None

        try:
            with  connection as conn:
                with  conn.cursor() as cur:
                    # execute the INSERT statement
                    cur.execute(sql, (topic['name'],))
                
                    rows = cur.fetchone()
                    if rows:
                        response = rows
                    conn.commit()
            print(response)
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)    
    f.close()
    
if __name__ == '__main__':
    insert_topics()