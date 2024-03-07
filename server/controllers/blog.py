
import psycopg2
from utils.db import connection

def create_blog(user_id, post, category_id, image, time):
    """ Create new account into the acount table """

    sql = """INSERT INTO blog (account, post, category_id, image, time)
             VALUES(%s, %s, %s, %s, %s) RETURNING post, email, account, categoy_id, image;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(sql, (user_id, post, category_id, image, time))

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
    
import psycopg2
from utils.db import connection

# fetch user
def fetch_blog(id):
    query = """SELECT * FROM blog WHERE id=%s"""
    
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
def fetch_blogs():
    query = """SELECT * FROM blog JOIN account on acount = acount.id JOIN category on category_id = category.id  ORDER BY time;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(query)

                # get the generated all data back                
                rows = cur.fetchall()
                if rows:
                    response = rows
                # commit the changes to the database
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response

# update user
def edit_blog(id, post, category_id, image):
    query = """UPDATE account SET (post=%s,category_id=%s,image=%s) WHERE id = %s RETURNING title
    ;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the UPDATE statement
                cur.execute(query, (post, category_id, image, int(id)))

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
def delete_blog(id):
    query = """DELETE FROM blog WHERE id=%s RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the UPDATE statement
                cur.execute(query, (int(id), ))

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