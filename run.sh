# Generating data.db
cd backend
python utils/data_processing.py

cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install Flask pandas matplotlib
flask run

cd frontend
npm install
npm start