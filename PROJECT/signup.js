import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your web app's Firebase configuration
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
const provider = new GoogleAuthProvider();

// Set up reCAPTCHA verifier for phone number authentication
window.recaptchaVerifier = new RecaptchaVerifier('phone-number', {
    'size': 'invisible',
}, auth);

// Register button event listener
document.getElementById("register-button").addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phoneNumber = "+91" + document.getElementById('phone-number').value;

    // Create user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User registered:', user);

            // Send OTP to the phone number
            sendOTP(phoneNumber);
        })
        .catch((error) => {
            console.error("Error registering user", error);
            alert(error.message);
        });
});

// Function to send OTP
function sendOTP(phoneNumber) {
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            $('#otpModal').modal('show'); // Show the OTP modal
        })
        .catch((error) => {
            console.error("Error during signInWithPhoneNumber", error);
        });
}

// Verify OTP button event listener
document.getElementById("verify-otp-button").addEventListener('click', () => {
    const code = document.getElementById('otp-code').value;

    window.confirmationResult.confirm(code).then((result) => {
        const user = result.user;
        alert('Phone number verified successfully!');
        
        // Redirect to profile.html after successful verification
        window.location.replace("profile.html");
    }).catch((error) => {
        console.error("Error verifying OTP", error);
        document.getElementById('otp-error-message').style.display = 'block'; // Show error message on failure
    });
});

// Google Sign-In
const googleLogin = document.getElementById("google-login-button");
googleLogin.addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            window.location.replace("profile.html"); // Redirect to profile.html after Google sign-in
        }).catch((error) => {
            console.error("Error during Google sign-in", error);
        });
});