import psycopg2
from utils.db import connection
from psycopg2.extras import RealDictCursor
from controllers.account import get_current_user
from icecream import ic

def create_recommendation(account_id, name, second_name, lastname, re_image, github, linkedin, email, portfolio, quote, country_id, title_id):
    try:
        sql = """INSERT INTO recommendation (account_id, name, second_name, lastname, re_image, github, linkedin, email, quote, portfolio, country_id, title_id)
                VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;"""
        
        response = None
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(sql, (account_id, name, second_name, lastname, re_image, github, linkedin, email, quote, portfolio, country_id, title_id))

                # get the generated id back                
                rows = cur.fetchone()
                if rows:
                    response = rows

                # commit the changes to the database
                conn.commit()
                    
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)    
    finally:
        return response
    
# fetch user
def fetch_recommendation(id):
    query = """SELECT * FROM recommendation WHERE id=%s"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the UPDATE statement
                cur.execute(query, (int(id), ))

                # get the generated id back                
                rows = cur.fetchone()
                if rows:
                    response = rows

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response
    
# fetch all users
def fetch_recommendations():
    query = """SELECT *, recommendation.name AS username, countries.name AS country_name, countries.code as country_code, countries.emoji AS country_flag, countries.unicode AS country_unicode FROM recommendation JOIN countries ON country_id = countries.id JOIN account ON account_id = account.id JOIN user_title ON title_id = user_title.id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(query)

                # get the generated all data back                
                rows = cur.fetchall()
                if rows:
                    response = rows
                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        ic(error)
        response = error
    finally:
        return response

# update user
def edit_recommendation(account_id, name, second_name, lastname, re_image, github, linkedin, email, portfolio, quote, status_id, title_id, country_id, id):
    query = """UPDATE recommendation SET (account_id=%s,name=%s,second_name=%s,lastname=%s,re_image=%s, github=%s, linkedin=%s, email=%s, portfolio=%s,quote=%s,status_id=%s, title_id=%s, country_id=%s) WHERE id = %s RETURNING title
    ;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the UPDATE statement
                cur.execute(query, account_id, name, second_name, lastname, re_image, github, linkedin, email, portfolio, quote, status_id, title_id, country_id, id)

                # get the generated id back                
                rows = cur.fetchone()
                if rows:
                    response = rows[0]

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response
    
# update user
def delete_recommendation(recommendation_id, account_id):
    query = """DELETE FROM recommendation WHERE id=%s RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the UPDATE statement
                cur.execute(query, (recommendation_id, account_id))

                # get the generated id back                
                rows = cur.fetchone()
                if rows:
                    response = rows

                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response