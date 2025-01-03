import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import pickle
import numpy as np

# Load the dataset
data = pd.read_csv(r"E:\employee_prediction\Dataset .csv")  # Make sure the file name is correct
data

# Handle missing data
data['education'] = data['education'].fillna(data['education'].mode()[0])
data['previous_year_rating'] = data['previous_year_rating'].fillna(data['previous_year_rating'].median())

# Encode categorical variables
le = LabelEncoder()
categorical_cols = ['department', 'region', 'education', 'gender', 'recruitment_channel']
for col in categorical_cols:
    data[col] = le.fit_transform(data[col])

# Define features and target variable
X = data.drop(columns=['employee_id', 'is_promoted'])
y = data['is_promoted']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)

# Train the RandomForestClassifier
rf_model = RandomForestClassifier(random_state=42)
rf_model.fit(X_train, y_train)

# Evaluate the model
y_pred = rf_model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred))

# Save the model
joblib.dump(rf_model, 'employee_promotion_model.pkl')

# Optionally save the LabelEncoder
pickle.dump(le, open('label_encoder.pkl', 'wb'))