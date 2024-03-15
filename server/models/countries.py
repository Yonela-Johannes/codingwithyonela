import os
import psycopg2
from dotenv import load_dotenv
load_dotenv()

import json
 
f = open('countries.json')
 


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


def insert_countries():
    """Inserting countries"""
    data = json.load(f)
    for country in data['countries']:
        sql = """INSERT INTO countries (name, code, emoji, unicode, image)
                VALUES(%s, %s, %s, %s, %s) RETURNING name;"""
        
        response = None

        try:
            with  connection as conn:
                with  conn.cursor() as cur:
                    # execute the INSERT statement
                    cur.execute(sql, (country['name'], country['code'], country['emoji'], country['unicode'], country['image']))
                
                    rows = cur.fetchone()
                    if rows:
                        response = rows
                    conn.commit()
            print(response)
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)    
    f.close()
    
if __name__ == '__main__':
    insert_countries()