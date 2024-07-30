import React, { useEffect } from 'react';
import { requestFirebaseNotificationPermission, onMessageListener } from './firebaseConfig';

function App() {
  useEffect(() => {
    requestFirebaseNotificationPermission()
      .then((token) => {
        if (token) {
          console.log("FCM Token:", token);
          // Store the token in your database to send notifications
        }
      })
      .catch((err) => {
        console.log('FCM Token Error:', err);
      });

    onMessageListener()
      .then((payload) => {
        console.log('Message received. ', payload);
        // Customize how you handle the message here
      })
      .catch((err) => {
        console.log('Failed to receive message. ', err);
      });
  }, []);

  return (
    <div className="App">
      <h1>Flight Status Notifications</h1>
    </div>
  );
}

export default App;
