import pymongo
from firebase_admin import messaging, credentials, initialize_app
import time

# MongoDB connection
client = pymongo.MongoClient('mongodb+srv://bhavikawaghaye:jmJCnnlm4YEci9ZH@cluster0.nn1vb9c.mongodb.net/')
db = client.your_database_name
collection = db.flights

# Firebase Admin SDK initialization
cred = credentials.Certificate('path/to/your-firebase-adminsdk.json')
initialize_app(cred)

# Function to send FCM notification
def send_notification(token, title, body):
    message = messaging.Message(
        notification=messaging.Notification(
            title=title,
            body=body
        ),
        token=token
    )
    response = messaging.send(message)
    print('Successfully sent message:', response)

# Function to check for flight status changes
def check_for_updates():
    while True:
        flights = collection.find({})
        for flight in flights:
            if flight['status_changed']:  # Assuming you have a flag for status change
                # Retrieve device token (you need to store this when user subscribes)
                token = flight['device_token']
                send_notification(token, 'Flight Status Update', f"Flight {flight['flight_number']} status changed to {flight['status']}")
                # Reset the status_changed flag
                collection.update_one({'_id': flight['_id']}, {'$set': {'status_changed': False}})
        time.sleep(60)  # Check for updates every 60 seconds

if __name__ == "__main__":
    check_for_updates()
