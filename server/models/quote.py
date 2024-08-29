import os
import psycopg2
from dotenv import load_dotenv
load_dotenv()

import json
 
f = open('quote.json', encoding="utf8")
 


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


def insert_quotes():
    """Inserting quotes"""
    data = json.load(f)
    print(data)
    for quotes in data['quotes']:
        sql = """INSERT INTO quotes (quote, author)
                VALUES(%s, %s) RETURNING id;"""
        
        response = None

        try:
            with  connection as conn:
                with  conn.cursor() as cur:
                    # execute the INSERT statement
                    cur.execute(sql, (quotes['quote'], quotes['author']))
                
                    rows = cur.fetchone()
                    if rows:
                        response = rows
                    conn.commit()
            print(response)
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)    
    f.close()
    
if __name__ == '__main__':
    insert_quotes()