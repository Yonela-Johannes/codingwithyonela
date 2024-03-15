import os
import psycopg2
from dotenv import load_dotenv
load_dotenv()

import json
 
f = open('roles.json')
 


DATABASE = os.getenv('DATABASE')
DATABASE_USER = os.getenv('DATABASE_USER')
HOST = os.getenv('HOST')
PASSWORD = os.getenv('PASSWORD')
PORT = os.getenv('PORT')

connection = psycopg2.connect(
    database = DATABASE, 
    user = DATABASE_USER, 
    host= HOST,
    password = PASSWORD,
    port = PORT)


def insert_roles():
    """Inserting roles"""
    data = json.load(f)
    for role in data['roles']:
        sql = """INSERT INTO user_title (user_title, description, skills)
                VALUES(%s, %s, %s) RETURNING id;"""
        
        response = None

        try:
            with  connection as conn:
                with  conn.cursor() as cur:
                    # execute the INSERT statement
                    cur.execute(sql, (role['title'], role['description'], role['skills']))
                
                    rows = cur.fetchone()
                    if rows:
                        response = rows
                    conn.commit()
            print(response)
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)    
    f.close()
    
if __name__ == '__main__':
    insert_roles()