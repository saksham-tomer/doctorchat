// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

export const firebaseConfig = {
  apiKey: "AIzaSyDdks62Y2zN5Oha7FI2KITJayTaoHIV7NU",
  authDomain: "helthyy-a34b0.firebaseapp.com",
  projectId: "helthyy-a34b0",
  storageBucket: "helthyy-a34b0.appspot.com",
  messagingSenderId: "1059258763242",
  appId: "1:1059258763242:web:7960a80ec467bddd6fd493",
  measurementId: "G-1146SZE1KP"
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});