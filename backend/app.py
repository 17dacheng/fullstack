from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import sqlite3
import pandas as pd
import matplotlib.pyplot as plt
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

DATABASE = 'database/data.db'

# Temporary storage for search results
search_results_storage = []

def query_db(query, args=(), one=False):
    con = sqlite3.connect(DATABASE)
    cur = con.execute(query, args)
    rv = cur.fetchall()
    con.close()
    return (rv[0] if rv else None) if one else rv

@app.route('/search', methods=['POST'])
def search():
    print('enter the search term')
    data = request.json
    print(data)
    search_type = data['searchType']
    search_value = data['searchValue']
    
    if search_type == 'EC':
        query = "SELECT * FROM your_table WHERE ec_number LIKE ?"
        results = query_db(query, (f'{search_value}%',))
    elif search_type == 'UniprotID':
        query = "SELECT * FROM your_table WHERE uniprot_id = ?"
        results = query_db(query, (search_value,))
    elif search_type == 'EntryID':
        query = "SELECT * FROM your_table WHERE entry_id = ?"
        results = query_db(query, (search_value,))
    elif search_type == 'Substrate':
        query = "SELECT * FROM your_table WHERE substrate LIKE ?"
        results = query_db(query, (f'%{search_value}%',))

    # Save results
    global search_results_storage
    search_results_storage = results    
    return jsonify(results)

@app.route('/statistics', methods=['POST'])
def statistics():
    print('enter the statistics term')
    data = request.json
    print('data: ', data)
    stat_type = data['statType']

    global search_results_storage
    df = pd.DataFrame(search_results_storage, columns=['ec_number', 'uniprot_id', 'entry_id', 'substrate', 'kcat'])

    if stat_type == 'EC':
        counts = df['ec_number'].str.split('.').str[0].value_counts()
    elif stat_type == 'kcat':
        counts = df['kcat'].value_counts()
    elif stat_type == 'substrate':
        counts = df['substrate'].value_counts()

    plt.figure()
    counts.plot(kind='bar')
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    
    return send_file(img, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)