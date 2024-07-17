from psycopg2.extras import RealDictCursor
import psycopg2
from utils.db import connection
from controllers.account import get_current_user

def create_question(account_id, question, category_id, topic_id, token):
    try:
        user = get_current_user(token=token)
        if "id" in user:
            """ Create new account into the acount table """
            sql = """INSERT INTO question (account_id, question, category_id, topic_id)
                    VALUES(%s, %s, %s, %s) RETURNING id;"""
            
            response = None

            with  connection as conn:
                with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                    # execute the INSERT statement
                    cur.execute(sql, (account_id, question, category_id, topic_id))

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
def fetch_question(id):
    try:
        query = """SELECT * FROM question WHERE id=%s"""
        
        response = None

        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the UPDATE statement
                cur.execute(query, (id,))

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
def fetch_questions():
    query = """SELECT question.*, question.id AS question_id, category.*, account.*, account.id AS account_id, topics.id AS topic_id, topics.name as topic_name FROM question JOIN account on account_id = account.id JOIN category on category_id = category.id JOIN topics ON topic_id = topics.id ORDER BY question_time;"""
    
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
        response = error
    finally:
        return response

# update user
def edit_question(account_id, question, category_id, topic_id, question_id):
    query = """UPDATE question SET (account_id=%s, question=%s, category_id=%s, topic_id=%s) WHERE id = %s RETURNING title
    ;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the UPDATE statement
                cur.execute(query, (account_id, question, category_id, topic_id, question_id))

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
def delete_question(id):
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
    
# fetch all users
def fetch_question_comments(id):
    print("ID: INSIDE")
    print("ID: ", id)
    query = """SELECT question_comment.*, question_comment.id AS question_comment_id, account.*, account.id AS account_id FROM question_comment JOIN account on account_id = account.id WHERE question_id = %s;"""
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(query, (id,))

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
    
def create_question_comment(account_id, comment, question_id):
    print("ACCOUNT ID: ", account_id)
    print("COMMENT: ", comment)
    print("QUESTION ID: ", question_id)
    print(12*"___")
    """ Create new account into the acount table """
    sql = """INSERT INTO question_comment (account_id, comment, question_id)
             VALUES(%s, %s, %s) RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(sql, (account_id, comment, question_id))

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