#| eval: true
#| echo: false
import os
import traceback
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
from flask import Flask, jsonify, request
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

# Parameterize queries for security. Insertion. 
def execute_query(statement, params=None, fetch=False):
    try:
        with cnx.begin() as connection:
            result = connection.execute(text(statement), params)
            if fetch:
                return result.fetchall()
            else:
                connection.commit()
                if result.rowcount:
                    return result.lastrowid
    except SQLAlchemyError as e:
        app.logger.error(f"Database error occurred: {e}")
        raise

# Retrieving info from database
def get_or_create_entity_id(table, id, name_column, name):
    entity_id = execute_query(f"SELECT {id} FROM {table} WHERE {name_column} = :name", {'name': name}, fetch=True)
    if not entity_id:
        return execute_query(f"INSERT INTO {table} ({name_column}) VALUES (:name)", {'name': name})
    return entity_id[0][0]


# Retrieve Categories
@app.route('/api/category', methods=['GET'])
def get_categories():
    categories = execute_query("SELECT categoryName FROM agieCategory", fetch=True)
    return jsonify([category[0] for category in categories])

# Add paper to database
@app.route('/api/add_paper', methods=['POST'])
def add_paper(): 
    try: 
        # Request data from frotn end
        papers = request.get_json()

        # Insert paper
        for paper in papers:
            # The goods
            paperPMID = paper.get('paperPMID')
            title = paper.get('title')
            content = paper.get('content', '')[:65535]
            paperURL = paper.get('paperURL')
            publishedDate = paper.get('publishedDate')
            author_names = paper.get('authorNames', [])
            category_names = paper.get('categoryNames', [])
            keyword_names = paper.get('keywordNames', [])

            existing_paper = execute_query(
                "SELECT paperPMID FROM paper WHERE paperPMID = :paperPMID",
                {'paperPMID': paperPMID},
                fetch=True
            )

            if existing_paper:
                print(f"Paper {paperPMID} already exists, skipping...")
                continue 

            # Write paper query and execute
            paper_query = """
                INSERT INTO paper (paperPMID, title, content, paperURL, publishedDate) 
                VALUES (:paperPMID, :title, :content, :paperURL, :publishedDate)
            """
            try:
                execute_query(paper_query, {
                    'paperPMID': paperPMID,
                    'title': title,
                    'content': content,
                    'paperURL': paperURL,
                    'publishedDate': publishedDate,
                })
            
            except SQLAlchemyError as e:
                return jsonify({'error': 'Failed to insert paper', 'details': str(e)}), 500


            # Populating the fk tables
            for author_name in author_names:
                author_id = get_or_create_entity_id("author", "authorID", "authorName", author_name)
                execute_query("INSERT INTO authorPaper (authorID, paperPMID) VALUES (:author_id, :paperPMID)", {'author_id': author_id, 'paperPMID': paperPMID})
                
            for category_name in category_names:
                category_id = get_or_create_entity_id("agieCategory", "categoryID", "categoryName", category_name)
                execute_query("INSERT INTO paperCategory (categoryID, paperPMID) VALUES (:category_id, :paperPMID)", {'category_id': category_id, 'paperPMID': paperPMID})
                
            for keyword_name in keyword_names:
                keyword_id = get_or_create_entity_id("keyword", "keywordID", "keywordName", keyword_name)
                execute_query("INSERT INTO paperKeyword (keywordID, paperPMID) VALUES (:keyword_id, :paperPMID)", {'keyword_id': keyword_id, 'paperPMID': paperPMID})
                
            
        return jsonify({'message': 'Paper added successfully'}), 200
    
    except SQLAlchemyError as e:
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)
