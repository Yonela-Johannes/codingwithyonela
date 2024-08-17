import psycopg2                                                                                                                                                                       
from utils.db import connection
from psycopg2.extras import RealDictCursor
from slugify import slugify
from icecream import ic
from controllers.account import get_current_user
import datetime

def create_post(account_id, text, image, video, post_type, answers):
    response = None
    try: 
        sliced_text = slice(0, 99)
        slug = text[sliced_text]  
        """ Create post"""
        post = """INSERT INTO post (account_id, text, image, video, slug, type, post_time)
                VALUES(%s, %s, %s, %s, %s, %s, %s) RETURNING id;"""
                
        """ Create post"""
        
        query = """INSERT INTO poll_answer (text)
                VALUES(%s) RETURNING id;"""

        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(post, (account_id, text, image, video, slugify(slug), post_type, datetime.datetime.now()))        

                post = cur.fetchone()
                if post:
                    if post_type == 'poll' and post:
                        if answers['answer_one']:
                            cur.execute(query, (answers['answer_one'],))
                            one = cur.fetchone()
                            cur.execute("""UPDATE post SET answer_one_id = %s WHERE id = %s RETURNING id;""", (one['id'], post['id']))
                        if answers['answer_two']:
                            cur.execute(query, (answers['answer_two'],))
                            two = cur.fetchone()
                            cur.execute("""UPDATE post SET answer_two_id = %s WHERE id = %s RETURNING id;""", (two['id'], post['id']))
                        if answers['answer_three']:
                            cur.execute(query, (answers['answer_three'],))
                            three = cur.fetchone()
                            cur.execute("""UPDATE post SET answer_three_id = %s WHERE id = %s RETURNING id;""", (three['id'], post['id'])) 
                    
                    response = post
                conn.commit()
            
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)    
    finally:
        return response
 
# fetch user
def fetch_post(id):
    query = """SELECT * FROM post WHERE id=%s"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:

                cur.execute(query, (int(id), ))
            
                rows = cur.fetchone()
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response
    
# fetch all users
def fetch_posts():
    # query = """SELECT *, post.id as post_id FROM post JOIN account on account_id = account.id JOIN user_title on user_title_id = user_title.id ORDER BY post_id DESC;"""
    
    query = """SELECT 
    p.id,
    p.id AS post_id,
    p.account_id,
    a.username,
    a.firstname,
    a.lastname,
    a.profile,
    p.text,
    p.image,
    p.video,
    p.link,
    p.type,
    p.status,
    p.slug,
    p.post_time,
    pao.id as pao_id,
    pao.text as pao_text,
    pat.id as pat_id,
    pat.text as pat_text,
    path.id as path_id,
    path.text as path_text,
    COALESCE(pc.comment_count, 0) AS comment_count,
    COALESCE(pl.like_count, 0) AS like_count,
    COALESCE(pr.response_count, 0) AS response_count
        FROM 
            post p
        LEFT JOIN (
            SELECT 
                post_id,
                COUNT(*) AS comment_count
            FROM 
                post_comment
            GROUP BY 
                post_id
        ) pc ON p.id = pc.post_id
        LEFT JOIN (
            SELECT 
                post_id,
                COUNT(*) AS response_count
            FROM 
                post_response
            GROUP BY 
                post_id
        ) pr ON p.id = pr.post_id
        LEFT JOIN (
            SELECT 
                post_id,
                COUNT(*) AS like_count
            FROM 
                post_like
            GROUP BY 
                post_id
        ) pl ON p.id = pl.post_id
        LEFT JOIN 
            account a ON p.account_id = a.id
        LEFT JOIN 
            poll_answer pao ON pao.id = p.answer_one_id
        LEFT JOIN 
            poll_answer pat ON pat.id = p.answer_two_id
        LEFT JOIN 
            poll_answer path ON path.id = p.answer_three_id
        ORDER BY 
            p.post_time DESC;
    """
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the fetch statement
                cur.execute(query)

                # get the generated all data back                
                posts = cur.fetchall()
                if posts:
                    response = posts
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        ic(error)
        response = error
    finally:
        return response


def edit_post(id, user_id):
    
    """ Create post like"""
    sql = """INSERT INTO post_like (post_id, account_id)
            VALUES(%s, %s) RETURNING id
    ;"""
                
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(sql, (id, user_id))           
                post_like = cur.fetchone()
                if post_like and 'id' in post_like:          
                    response = post_like
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response
    
def edit_post_status(id, status):
    ic(status)
    sql = """UPDATE post SET status=%s
            WHERE id=%s RETURNING *
    ;"""
                
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(sql, (status, id))           
                row = cur.fetchone()
                if row:          
                    response = row
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        ic(error)
        response = error
    finally:
        return response
    



def delete_post(post_id, account_id):
    post = """DELETE FROM post WHERE id = %s AND account_id = %s RETURNING id;"""
    post_comment = """DELETE FROM post_comment WHERE post_id = %s RETURNING id;"""
    post_response = """DELETE FROM post_response WHERE post_id = %s RETURNING id;"""
    post_like = """DELETE FROM post_response WHERE post_id = %s RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(post, (post_id, account_id,) )
                cur.execute(post_comment, (post_id,) )
                cur.execute(post_response, (post_id,) )
                cur.execute(post_like, (post_id,) )
                rows = cur.fetchone()
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        ic(error)
        response = error
    finally:
        return response
    
    
def create_post_comment(account_id, comment, post_id):
    """ Create comment post """
    sql = """INSERT INTO post_comment (account_id, comment, post_id, post_comment_time)
             VALUES(%s, %s, %s, %s) RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(sql, (account_id, comment, post_id, datetime.datetime.now()))
            
                rows = cur.fetchone()
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)    
    finally:
        return response

# fetch feed responses
def fetch_post_comment(id):
    query = """SELECT * FROM post_comment JOIN account ON account_id = account.id WHERE post_id=%s ORDER BY post_comment_time DESC;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:

                cur.execute(query, (int(id), ))
            
                rows = cur.fetchall()
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response
 
def create_poll_vote(account_id, poll_a_id):
    """ Create post vote"""
    sql = """INSERT INTO poll_vote (account_id, poll_answer_id)
             VALUES(%s, %s) RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:
                # execute the INSERT statement
                cur.execute(sql, (account_id, poll_a_id))
            
                rows = cur.fetchone()
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        ic(error)
        print(error)    
    finally:
        return response
    
def create_post_response(account_id, text, post_id):
    """ Create reponse post """
    sql = """INSERT INTO post_response (account_id, text, post_id, post_response_time)
             VALUES(%s, %s, %s, %s) RETURNING id;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute(sql, (account_id, text, post_id, datetime.datetime.now()))
            
                rows = cur.fetchone()
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)    
    finally:
        return response

# fetch feed responses
def fetch_post_response(id):
    query = """SELECT post_response.*, post_response.id AS post_id, account.email, account.username, account.lastname, account.is_admin, account.is_staff, account.profile, account.user_title_id, user_title.user_title FROM post_response JOIN account ON account_id = account.id JOIN user_title ON user_title_id = user_title.id WHERE post_id=%s ORDER BY post_response_time DESC;"""
    
    response = None

    try:
        with  connection as conn:
            with  conn.cursor(cursor_factory=RealDictCursor) as cur:

                cur.execute(query, (int(id), ))
            
                rows = cur.fetchall()
                if rows:
                    response = rows
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        response = error
    finally:
        return response

  