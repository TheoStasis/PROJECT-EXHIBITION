import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

// Email and Password Login or Registration
document.getElementById("email-login-button").addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if the user already exists
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Logged in successfully!');
            window.location.replace("home-page.html");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            // If the error code indicates that the user does not exist, create a new user
            if (errorCode === 'auth/user-not-found') {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        alert('User created successfully!');
                        window.location.replace("home-page.html");
                    })
                    .catch((error) => {
                        console.error("Error creating user", error);
                        alert(error.message);
                    });
            } else {
                console.error("Error during email login", error);
                alert(error.message);
            }
        });
});

// Set up reCAPTCHA verifier for phone number authentication
window.recaptchaVerifier = new RecaptchaVerifier('phone-number', {
    'size': 'invisible',
}, auth);

// Function to send OTP
window.sendOTP = function() {
    const phoneNumber = "+91" + document.getElementById('phone-number').value;
    
    if (phoneNumber.length === 13) {
        const appVerifier = window.recaptchaVerifier;
        
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                const otpModal = new bootstrap.Modal(document.getElementById('otpModal'));
                otpModal.show();
            }).catch((error) => {
                console.error("Error during signInWithPhoneNumber", error);
            });
    } else {
        alert('Please enter a valid 10-digit phone number.');
    }
};

// Verify OTP
window.verifyOTP = function() {
    const code = document.getElementById('otp-code').value;

    window.confirmationResult.confirm(code).then((result) => {
        const user = result.user;
        alert('Phone number verified successfully!');
        window.location.replace("home-page.html");
    }).catch((error) => {
        console.error("Error verifying OTP", error);
        document.getElementById('otp-error-message').style.display = 'block'; // Show error message on failure
    });
};

// Phone Number Submission
document.getElementById("submit-button").addEventListener('click', () => {
    sendOTP(); // Trigger the send OTP function on submit
});

// Verify OTP button event listener
document.getElementById("verify-otp-button").addEventListener('click', () => {
    verifyOTP(); // Trigger the verify OTP function when verifying the code
});

// Google Sign-In
const googleLogin = document.getElementById("google-login-button");
googleLogin.addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            window.location.replace("home-page.html");
        }).catch((error) => {
            console.error("Error during Google sign-in", error);
        });
});