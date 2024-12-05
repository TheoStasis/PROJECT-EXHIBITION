import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import firebaseConfig from './config/firebase.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Email and Password Login or Registration
document.getElementById('email-login-button')?.addEventListener('click', async () => {
  try {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert('Logged in successfully!');
      window.location.replace('home-page.html');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert('User created successfully!');
        window.location.replace('home-page.html');
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error('Authentication error:', error);
    alert(error.message);
  }
});

// Set up reCAPTCHA verifier
window.recaptchaVerifier = new RecaptchaVerifier(
  'phone-number',
  {
    size: 'invisible',
  },
  auth
);

// Send OTP function
window.sendOTP = async function () {
  try {
    const phoneNumber = '+91' + document.getElementById('phone-number').value;

    if (phoneNumber.length !== 13) {
      throw new Error('Please enter a valid 10-digit phone number.');
    }

    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;
    const otpModal = new bootstrap.Modal(document.getElementById('otpModal'));
    otpModal.show();
  } catch (error) {
    console.error('OTP error:', error);
    alert(error.message);
  }
};

// Verify OTP function
window.verifyOTP = async function () {
  try {
    const code = document.getElementById('otp-code').value;
    const result = await window.confirmationResult.confirm(code);
    const user = result.user;
    alert('Phone number verified successfully!');
    window.location.replace('home-page.html');
  } catch (error) {
    console.error('OTP verification error:', error);
    document.getElementById('otp-error-message').style.display = 'block';
  }
};

// Event Listeners
document.getElementById('submit-button')?.addEventListener('click', () => sendOTP());
document.getElementById('verify-otp-button')?.addEventListener('click', () => verifyOTP());
document.getElementById('google-login-button')?.addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('Google sign-in successful:', user);
    window.location.replace('home-page.html');
  } catch (error) {
    console.error('Google sign-in error:', error);
    alert(error.message);
  }
});
