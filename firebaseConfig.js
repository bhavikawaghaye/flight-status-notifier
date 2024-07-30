import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_auth_domain",
  projectId: "your_project_id",
  storageBucket: "your_storage_bucket",
  messagingSenderId: "your_messaging_sender_id",
  appId: "your_app_id",
  measurementId: "your_measurement_id"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

export const requestFirebaseNotificationPermission = async () => {
  try {
    const token = await messaging.getToken({
      vapidKey: 'your_public_vapid_key'  // Get this from Firebase Console
    });
    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
