import sqlite3
import pandas as pd

def generate_data():
    # Example data
    data = {
        'ec_number': ['1.1.1.1', '1.1.1.2', '1.2.1.1', '2.1.1.1', '3.1.1.1', '4.1.1.1', '5.1.1.1'],
        'uniprot_id': ['P12345', 'P23456', 'P34567', 'P45678', 'P56789', 'P67890', 'P78901'],
        'entry_id': ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7'],
        'substrate': ['Sub1', 'Sub2', 'Sub1', 'Sub1', 'Sub1', 'Sub1', 'Sub1'],
        'kcat': [10, 20, 30, 40, 50, 60, 70]
    }
    
    df = pd.DataFrame(data)
    
    conn = sqlite3.connect('../database/data.db')
    df.to_sql('your_table', conn, if_exists='replace', index=False)
    conn.close()

if __name__ == "__main__":
    generate_data()