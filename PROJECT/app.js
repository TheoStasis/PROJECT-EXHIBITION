  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

  // import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC3DuJ1p0Qn_nl1hdY6mB0PwnlNoG17iPQ",
    authDomain: "delivo-login.firebaseapp.com",
    projectId: "delivo-login",
    storageBucket: "delivo-login.firebasestorage.app",
    messagingSenderId: "17443651568",
    appId: "1:17443651568:web:be1159d2e14839d0dbe735",
    measurementId: "G-FBXJR2GXEG"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = 'en';
  const provider = new GoogleAuthProvider();
  // const analytics = getAnalytics(app);

  const googleLogin = document.getElementById("google-login-button");

  googleLogin.addEventListener('click', () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    console.log(user);
    window.location.replace("home-page.html");

  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });

  })