#| eval: true
#| echo: false
import os
import sys
import traceback
import pandas as pd
from tabulate import tabulate
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from flask import Flask, jsonify, request
from sqlalchemy.exc import SQLAlchemyError
from flask_cors import CORS

# Initialize app
app = Flask(__name__)
CORS(app)

# Retrieve details of accessing database from .env
load_dotenv()
config = {
    'user': os.getenv('CS_24_333_USER'),
    'password': os.getenv('CS_24_333_PASSWORD'),
    'host': os.getenv('CS_24_333_HOST'),
    'database': os.getenv('CS_24_333_DBNAME')
}

# Check for missing config parameters
for key, value in config.items():
    if value is None:
        raise ValueError(f"Missing '{key}' in .env file")

# Engine
engine_uri = f"mysql+pymysql://{config['user']}:{config['password']}@{config['host']}/{config['database']}?connect_timeout=30"
cnx = create_engine(engine_uri)

# Error handling 
@app.errorhandler(Exception)
def handle_exception(e):
    # Handle SQLAlchemy Errors
    if isinstance(e, SQLAlchemyError):
        error_info = str(e.__dict__['orig'])
        return jsonify({'error': 'Database error', 'details': error_info}), 500
    # Other Errors
    else:
        traceback.print_exc()
        return jsonify({'error': 'An unexpected error occurred', 'details': str(e)}), 500


def my_sql_wrapper(query, params):
    try:
        df = pd.read_sql(query, cnx, params=params)
    except Exception as e:
        message = str(e)
        print(f"An error occurred:\n\n{message}\n\nIgnoring and moving on.")
        df = pd.DataFrame()
    return df

def my_sql_statement( statement ):
    """ used with DDL, when the statement doesn't return any results. """
    try:
        with cnx.begin() as x:
            x.execute(text(statement))
            x.commit()
    #    conn = create_engine(engine_uri)
        result = ""
    except Exception as e:
        result = f"Error: {str(e)}"
#    conn = create_engine(engine_uri)
    return result


@app.route("/hello", methods=["GET"])
def hello():
    return 'Hello, world!'

#displays the papers that fit the inputted category (by categoryName)
@app.route('/api/paperByCategory', methods=["GET"])
def api_show_papersbycategoriesName():

    categoryName = request.args.get("categoryName")
    print(categoryName)
    
    if not categoryName:
        return jsonify({"error": "Missing categoryName query parameter"}), 400

    query = text("""
        SELECT paper.*
        FROM paper
        JOIN paperCategory ON paper.paperPMID = paperCategory.paperPMID
        JOIN agieCategory ON paperCategory.categoryID = agieCategory.categoryID
        WHERE agieCategory.categoryName = :categoryName
    """)
    
    df = my_sql_wrapper(query, params={'categoryName': categoryName})
    
    categoryData = df.to_dict(orient='records')
    return jsonify(categoryData)

# Get ALL Categories
@app.route('/api/categories', methods=["GET"])
def api_get_categories():
    try:
        query = "SELECT DISTINCT categoryName FROM agieCategory"
        df = my_sql_wrapper(query, params=None)
        categories = df['categoryName'].tolist()
        return jsonify(categories)
    except Exception as e:
        return jsonify({'error': 'Failed to fetch categories', 'details': str(e)}), 500

# Get ALL papers
@app.route('/api/paper', methods=["GET"])
def api_show_paper():
    try:
        query = """
        SELECT *
        FROM paper;
        """
        df = my_sql_wrapper(query, params=None)
        
        paper_data = df.to_dict(orient='records')

        return jsonify(paper_data)
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "Failed to fetch papers"}), 500


#displays the papers that have matching input words to the papers' titles or abstracts
@app.route('/api/papersbywords', methods=['GET'])
def api_show_papers_by_words():
    try:
        words = request.args.get('words')

        query = f"""
            SELECT * 
            FROM paper
            WHERE title LIKE '%%{words}%%' OR content LIKE '%%{words}%%'
        """

        df = my_sql_wrapper(query, params={'words': words})
        papers_data = df.to_dict(orient='records')

        return jsonify(papers_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=8080)
