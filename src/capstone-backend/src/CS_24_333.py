#| eval: true
#| echo: false
import os
import sys
import pandas as pd
from tabulate import tabulate
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from flask import Flask, jsonify, json, logging, request
from sqlalchemy.exc import OperationalError, ProgrammingError
from flask_cors import CORS

config_map = {
    'user':'CS_24_333_USER',
    'password':'CS_24_333_PASSWORD',
    'host':'CS_24_333_HOST',
    'database':'CS_24_333_DBNAME'
}
# load and store credentials
load_dotenv()
config = {}
for key in config_map.keys():
    config[key] = os.getenv(config_map[key])
flag = False
for param in config.keys():
    if config[param] is None:
        flag = True
        print(f"Missing {config_map[param]} in .env file")



engine_uri = f"mysql+pymysql://{config['user']}:{config['password']}@{config['host']}/{config['database']}"


cnx = create_engine(engine_uri)

def my_sql_wrapper(query):
    try:
        df = pd.read_sql(query,cnx)
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

app = Flask(__name__)
CORS(app)

@app.route("/hello", methods=["GET"])
def hello():
    return 'Hello, world!'

#displays all papers in the database
@app.route('/api/paper', methods=["GET"])
def api_show_paper():
    df = my_sql_wrapper("select * from paper")

    paper_data = df.to_dict(orient='records')


    return jsonify(paper_data)

"""
#displays data from the paperCategory table with the inputted categoryID
@app.route('/api/paperofcategory/<int:categoryID>', methods=['GET'])
def api_show_papersofcategories(categoryID):
    try:
        category_str = f"'{categoryID}'"
        query = f"SELECT * FROM paperCategory WHERE categoryID = {categoryID}"
        
        df = my_sql_wrapper(query)
        papercategory_data = df.to_dict(orient='records')

        return jsonify(papercategory_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
"""
    
#displays the papers that fit the inputted category (by categoryID)
@app.route('/api/paperbycategory/<int:categoryID>', methods=['GET'])
def api_show_papersbycategoriesID(categoryID):
    try:
        
        query = f"""
            SELECT paper.* 
            FROM paper
            JOIN paperCategory ON paper.paperPMID = paperCategory.paperPMID
            WHERE paperCategory.categoryID = {categoryID}
        """
        
        df = my_sql_wrapper(query)
        papercategory_data = df.to_dict(orient='records')

        return jsonify(papercategory_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#displays the papers that fit the inputted category (by categoryName)
@app.route('/api/paperbycategory/<string:categoryName>', methods=['GET'])
def api_show_papersbycategoriesName(categoryName):
    try:
        
        query = f"""
            SELECT paper.* 
            FROM paper
            JOIN paperCategory ON paper.paperPMID = paperCategory.paperPMID
            JOIN agieCategory ON paperCategory.categoryID = agieCategory.categoryID
            WHERE agieCategory.categoryName = '{categoryName}'
        """
        
        df = my_sql_wrapper(query)
        papercategory_data = df.to_dict(orient='records')

        return jsonify(papercategory_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#displays the papers that fit the inputted category (by categoryName)
@app.route('/api/paperbycategory', methods=['GET'])
def api_show_papersbycategoriesName2():
    try:
        #Getting the category name from search bar input
        categoryName = request.args.get('categoryName')

        query = f"""
            SELECT paper.* 
            FROM paper
            JOIN paperCategory ON paper.paperPMID = paperCategory.paperPMID
            JOIN agieCategory ON paperCategory.categoryID = agieCategory.categoryID
            WHERE agieCategory.categoryName = '{categoryName}'
        """
        
        df = my_sql_wrapper(query)
        papercategory_data = df.to_dict(orient='records')

        return jsonify(papercategory_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500




if __name__ == "__main__":
    app.run()
