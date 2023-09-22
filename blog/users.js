// Initialize Firebase with your configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC2L31O2VtvaXWe-ktH77iMagARxdNqB88",
//   authDomain: "climpy-e9dab.firebaseapp.com",
//   projectId: "climpy-e9dab",
//   storageBucket: "climpy-e9dab.appspot.com",
//   messagingSenderId: "194247994975",
//   appId: "1:194247994975:web:422d737a1bd25c0a4335ea",
//   measurementId: "G-0R00GJTLX5"
// };

// firebase.initializeApp(firebaseConfig);

// Reference to the "users" node in your Firebase Realtime Database
const usersRef = firebase.database().ref('users');

// Variables to store counts
let totalUsers = 0;
const uniqueInstitutions = new Set();

// Retrieve data from the "users" node
usersRef.once('value', (snapshot) => {
  snapshot.forEach((userSnapshot) => {
    const user = userSnapshot.val();

    // Increment the total user count
    totalUsers++;

    // Check if the user has an associated institution
    if (user.institutions) {
      // Add the institution to the Set to ensure uniqueness
      uniqueInstitutions.add(user.institutions);
    }
  });

  // After iterating through all users, update the HTML elements
  const totalUsersElement = document.getElementById('totalUsers');
  const uniqueInstitutionsElement = document.getElementById('uniqueInstitutions');

  totalUsersElement.textContent = "Total Users: " + totalUsers;
  uniqueInstitutionsElement.textContent = "Unique Institutions: " + uniqueInstitutions.size;
});
