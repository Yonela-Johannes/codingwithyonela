
import psycopg2
from utils.db import connection

def create_tables():
    """ Create tables in the PostgreSQL database"""
    commands = (
        # USER TITLE TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS user_title (
            id SERIAL PRIMARY KEY,
            title VARCHAR(50) UNIQUE NOT NULL
        );
        """,
        # USER TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS account (
            id SERIAL PRIMARY KEY,
            email VARCHAR(50) UNIQUE NOT NULL,
            username VARCHAR(20) UNIQUE NOT NULL,
            lastname VARCHAR(20) UNIQUE NOT NULL,
            is_admin BOOLEAN NOT NULL,
            is_staff BOOLEAN NOT NULL,
            image TEXT,
            user_title_id INTEGER NOT NULL,
            FOREIGN KEY (user_title_id)
            REFERENCES user_title (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        );
        """,
        # CATEGORY TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS category (
            id SERIAL PRIMARY KEY,
            category VARCHAR(50) NOT NULL,
            account_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        # STATUS TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS status (
            id SERIAL PRIMARY KEY,
            status VARCHAR(50) NOT NULL,
            account_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        # BLOG TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS blog (
            id SERIAL PRIMARY KEY,
            account INTEGER NOT NULL,
            post Text NOT NULL,
            category_id INTEGER NOT NULL,
            time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (category_id)
            REFERENCES category (id)
            ON UPDATE CASCADE ON DELETE CASCADE      
        )
        """,
        # START OF BLOG RESPONSE SCHEMA LIMIT 1
        """
        CREATE TABLE IF NOT EXISTS blog_response (
            id SERIAL PRIMARY KEY,
            account INTEGER NOT NULL,
            response Text NOT NULL,
            blog_id INTEGER NOT NULL,
            time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (blog_id)
            REFERENCES blog (id)
            ON UPDATE CASCADE ON DELETE CASCADE   
        )
        """,
        ########################
        # LIKES BLOG/TABLE
        """
        CREATE TABLE IF NOT EXISTS blog_like (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            blog_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (blog_id)
            REFERENCES blog (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        # COMMENTS BLOG/TABLE
        """
        CREATE TABLE IF NOT EXISTS blog_comment (
            id SERIAL PRIMARY KEY,
            comment Text NOT NULL,
            blog_id INTEGER NOT NULL,
            account_id INTEGER NOT NULL,
            time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (blog_id)
            REFERENCES blog (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        # LIKES BLOG COMMENT/TABLE
        """
        CREATE TABLE IF NOT EXISTS blog_comment_like (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            blog_id INTEGER NOT NULL,
            blog_comment_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (blog_id)
            REFERENCES blog (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (blog_comment_id)
            REFERENCES blog_comment (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        # END OF BLOG SCHEMA
        # ######################

        # QUESTION TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS question (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            question Text NOT NULL,
            category INTEGER NOT NULL,
            time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS question_comment (
            id SERIAL PRIMARY KEY,
            comment VARCHAR(300) NOT NULL,
            question_id INTEGER NOT NULL,
            account_id INTEGER NOT NULL,
            time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (question_id)
            REFERENCES question (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        # LIKES QUESTION LIKE/TABLE
        """
        CREATE TABLE IF NOT EXISTS question_like (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            question_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (question_id)
            REFERENCES question (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        # LIKES QUESTION COMMENT/TABLE
        """
        CREATE TABLE IF NOT EXISTS question_comment_like (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            question_id INTEGER NOT NULL,
            question_comment_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (question_id)
            REFERENCES question (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (question_comment_id)
            REFERENCES question_comment (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        ######
        # START OF QUESTION RESPONSE SCHEMA
        """
        CREATE TABLE IF NOT EXISTS question_response (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            response Text NOT NULL,
            question_id INTEGER NOT NULL,
            time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,            
            FOREIGN KEY (question_id)
            REFERENCES question (id)
            ON UPDATE CASCADE ON DELETE CASCADE      
        )
        """,
        # LIKES QUESTION RESPONSE/TABLE
        """
        CREATE TABLE IF NOT EXISTS question_response_like (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            question_id INTEGER NOT NULL,
            question_response_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (question_id)
            REFERENCES question (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (question_response_id)
            REFERENCES question_response (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        ######
            # END OF QUESTION TABLE/SCHEMA
        ######
        # START OF TESTIMONIALS RESPONSE SCHEMA
        """
        CREATE TABLE IF NOT EXISTS testimonial (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            comment Text NOT NULL,
            rating INTEGER NOT NULL,
            time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE                
        )
        """,
        # LIKES TESTIMONIAL/TABLE
        """
        CREATE TABLE IF NOT EXISTS testimonial_like (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            testimonial_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (testimonial_id)
            REFERENCES testimonial (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        ######
            # END OF TESTIMONIAL TABLE/SCHEMA
        ######
        # START OF RECOMMENDATION RESPONSE SCHEMA
        """
        CREATE TABLE IF NOT EXISTS recommendation (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            second_name VARCHAR(50),
            lastname VARCHAR(50) NOT NULL,
            image TEXT NOT NULL,           
            account_id INTEGER NOT NULL,
            title_id INTEGER NOT NULL,
            quote VARCHAR(200) NOT NULL,
            status_id INTEGER NOT NULL,
            time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (status_id)
            REFERENCES status (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (title_id)
            REFERENCES status (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        ######
        # END OF RECOMMENDATIONS TABLE/SCHEMA
                # SUGGESTION TABLE/SCHEMA
        """
        CREATE TABLE IF NOT EXISTS suggestion (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            post Text NOT NULL,
            status_id INTEGER NOT NULL,
            category_id INTEGER NOT NULL,
            time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (category_id )
            REFERENCES category (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (status_id)
            REFERENCES status (id)
            ON UPDATE CASCADE ON DELETE CASCADE      
        )
        """,
        # START OF SUGGESTION RESPONSE SCHEMA
        """
        CREATE TABLE IF NOT EXISTS suggestion_response (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            response Text NOT NULL,
            suggestion_id INTEGER NOT NULL,
            time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (suggestion_id)
            REFERENCES blog (id)
            ON UPDATE CASCADE ON DELETE CASCADE   
        )
        """,
        ########################
        # VOTES SUGGESTION/TABLE
        """
        CREATE TABLE IF NOT EXISTS suggestion_vote (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            suggestion_id INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (suggestion_id)
            REFERENCES suggestion (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        # COMMENTS SUGGESTION/TABLE
        """
        CREATE TABLE IF NOT EXISTS suggestion_comment (
            id SERIAL PRIMARY KEY,
            comment Text NOT NULL,
            suggestion_id INTEGER NOT NULL,
            account_id INTEGER NOT NULL,
            time DATE NOT NULL DEFAULT CURRENT_DATE,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (suggestion_id)
            REFERENCES suggestion (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        # LIKE SUGGESTION RESPONSE/TABLE
        """
        CREATE TABLE IF NOT EXISTS suggestion_response_like (
            id SERIAL PRIMARY KEY,
            account_id INTEGER NOT NULL,
            suggestion_id INTEGER NOT NULL,
            suggestion_response INTEGER NOT NULL,
            FOREIGN KEY (account_id)
            REFERENCES account (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (suggestion_id)
            REFERENCES blog (id)
            ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (suggestion_response)
            REFERENCES suggestion_response (id)
            ON UPDATE CASCADE ON DELETE CASCADE
        )
        """,
        # END OF BLOG SCHEMA
    )
    
    try:
        with connection as conn:
            print(conn)
            with conn.cursor() as cur:
                print(cur)
                # execute the CREATE TABLE statement
                for command in commands:
                    cur.execute(command)
    except (psycopg2.DatabaseError, Exception) as error:
        print(error)