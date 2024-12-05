function proceedToBuy() {
  document.getElementById('payment-modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('payment-modal').style.display = 'none';
}

// Handle form submission
document.getElementById('payment-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Here you would typically handle the payment processing logic
  alert('Payment processed!');

  // Close the modal after processing
  closeModal();
});

// Close the modal when clicking outside of it
window.onclick = function (event) {
  const modal = document.getElementById('payment-modal');
  if (event.target === modal) {
    closeModal();
  }
};
