import os
from flask import Flask, request, jsonify, render_template
import joblib
import pickle
import numpy as np
from flask_cors import CORS
import pandas as pd
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from bson import ObjectId


# Load environment variables from .env file
load_dotenv()

# Load the trained model and LabelEncoder using joblib
model = joblib.load('employee_promotion_model.pkl')  # Use joblib to load
le = pickle.load(open('label_encoder.pkl', 'rb'))  # Keep using pickle for the LabelEncoder

app = Flask(__name__)
CORS(app)

# MongoDB Setup
try:
    uri = 'mongodb+srv://noobDev:GrtXJqila8Q02rH8@cluster0.ealoq1g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    client = MongoClient(uri, server_api=ServerApi(
    version="1", strict=True, deprecation_errors=True))
    client.admin.command("ping")
    print("Connected successfully")
    
    database = client["Employee-Prediction"]
    posts_collection = database["posts"]
    
    
except Exception as e:
    raise Exception(
        "The following error occurred: ", e)



#Routes
@app.route('/')
def home():
    return "Employee Promotion Prediction Model Running"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from POST request
        data = request.get_json()
        print(data)

        # Extract and preprocess features using the same transformations as the training model
        feature_names = ['department', 'region', 'education', 'gender', 'recruitment_channel', 
                         'no_of_trainings', 'age', 'previous_year_rating', 'length_of_service', 
                         'KPIs_met', 'awards_won', 'avg_training_score']

        # Initialize an empty list for features
        features = []

        # Transform categorical features using label encoder and handle unseen labels
        categorical_features = ['department', 'region', 'education', 'gender', 'recruitment_channel']
        
        for feature in categorical_features:
            try:
                encoded_value = le.transform([data[feature]])[0]
            except ValueError:
                # Handle unseen labels by assigning a default value (e.g., the first label)
                encoded_value = le.transform([le.classes_[0]])[0]
                print(f"Unseen label '{data[feature]}' encountered. Defaulting to {le.classes_[0]}.")
            features.append(encoded_value)

        # Append numeric features directly, setting KPIs_met and awards_won to fixed value of 1
        features.extend([
            int(data['no_of_trainings']),
            int(data['age']),
            int(data['previous_year_rating']),
            int(data['length_of_service']),
            int(data['KPIs_met']),
            int(data['awards_won']),
            int(data['avg_training_score'])
        ])

        # Convert features to a DataFrame
        features_df = pd.DataFrame([features], columns=feature_names)

        print("Features for prediction:", features_df)
        
        # Make the prediction
        prediction = model.predict(features_df)[0]

        # Return the prediction result as JSON
        return jsonify({'promotion_prediction': int(prediction)})

    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/data')
def data():
    return "data"

@app.route('/createpost', methods=['POST'])
def create_post():
    data = request.json
    
    text = data.get('text')
    name = data.get('name')
    email = data.get('email')
    photoUrl = data.get('photoUrl')
    upVote = data.get('upVote')
    downVote = data.get('downVote')

    post = {
        "text": text,
        "name": name,
        "email": email,
        "photoUrl": photoUrl,
        "upVote": upVote,
        "downVote": downVote
    }
    
    result = posts_collection.insert_one(post)

    return jsonify({"message": "Post created", "id": str(result.inserted_id)})

@app.route('/posts', methods=['GET'])
def get_posts():
    posts = list(posts_collection.find({}).sort([("upVote", -1), ("downVote", 1)]))
    for post in posts:
        post['_id'] = str(post['_id'])
    return jsonify(posts)

@app.route('/vote', methods=['POST'])
def update_post():
    data = request.json
    post_id = data.get('id')
    vote_type = data.get('type')
    email = data.get('email')
    
    print(post_id,vote_type,email)
    
    if not post_id or not vote_type or not email:
        return jsonify({"error": "Missing data"}), 400 

    if vote_type == 'upvote':
        update_operation = {"$inc": {"upVote": 1}, "$push": {"voters_email": email}}
    elif vote_type == 'downvote':
        update_operation = {"$inc": {"downVote": 1}, "$push": {"voters_email": email}}
    else:
        return jsonify({"error": "Invalid vote type"}), 400
    
    result = posts_collection.update_one(
        {"_id": ObjectId(post_id)}, 
        update_operation
    )
    
    return jsonify({"message": "Post updated successfully"})

@app.route('/comment', methods=['POST'])
def update_post_comment():
    data = request.json
    post_id = data.get('id')
    comment_text = data.get('comment', '')
    user_name = data.get('name', '')

    if not comment_text or not user_name:
        return jsonify({"error": "Missing comment text or user email"}), 400

    # Create the comment object
    comment = {
        "name": user_name,
        "text": comment_text
    }

    # Add the comment to the post
    result = posts_collection.update_one(
        {"_id": ObjectId(post_id)},
        {"$push": {"comments": comment}}
    )

    if result.modified_count == 1:
        return jsonify({"message": "Comment added successfully"}), 201
    else:
        return jsonify({"error": "Post not found"}), 404


if __name__ == '__main__':
    app.run(debug=True)