import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import firebaseConfig from './config/firebase.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Set up reCAPTCHA verifier
window.recaptchaVerifier = new RecaptchaVerifier(
  'phone-number',
  {
    size: 'invisible',
  },
  auth
);

// Register handler
document.getElementById('register-button')?.addEventListener('click', async () => {
  try {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phoneNumber = '+91' + document.getElementById('phone-number').value;

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User registered:', userCredential.user);
    await sendOTP(phoneNumber);
  } catch (error) {
    console.error('Registration error:', error);
    alert(error.message);
  }
});

// Send OTP function
async function sendOTP(phoneNumber) {
  try {
    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;
    $('#otpModal').modal('show');
  } catch (error) {
    console.error('OTP error:', error);
    alert(error.message);
  }
}

// Verify OTP handler
document.getElementById('verify-otp-button')?.addEventListener('click', async () => {
  try {
    const code = document.getElementById('otp-code').value;
    const result = await window.confirmationResult.confirm(code);
    alert('Phone number verified successfully!');
    window.location.replace('profile.html');
  } catch (error) {
    console.error('OTP verification error:', error);
    document.getElementById('otp-error-message').style.display = 'block';
  }
});

// Google Sign-In handler
document.getElementById('google-login-button')?.addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log('Google sign-in successful:', result.user);
    window.location.replace('profile.html');
  } catch (error) {
    console.error('Google sign-in error:', error);
    alert(error.message);
  }
});

// Password visibility toggle
const passwordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('showPassword');

showPasswordCheckbox?.addEventListener('change', function () {
  passwordInput.type = this.checked ? 'text' : 'password';
});
