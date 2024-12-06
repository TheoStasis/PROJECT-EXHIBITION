export let cart = [];

export function addToCart(button) {
	const quantitySelector = document.querySelector(`.js-quantity-selector-${button.dataset.id}`);
	if (quantitySelector) {
		const quantity = parseInt(quantitySelector.value, 10);
		const foodItem = {
			id: button.dataset.id,
			name: button.dataset.name,
			price: button.dataset.price,
			quantity: quantity,
			image: button.dataset.image
		};
		cart.push(foodItem);
		updateCartQuantity();

		// Send the food item to the server to update cart.json
		fetch('/update-cart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(foodItem)
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.text();
		})
		.then(data => {
			console.log(data); // Log success message
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
	} else {
		console.error('Quantity selector not found for button with ID:', button.dataset.id);
	}
}

export function updateCartQuantity() {
	const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
	document.querySelector('.cart-count').innerHTML = totalQuantity;
}

export function createPaymentModals() {
	// Main payment method modal
	const mainModalHTML = `
		<div class="modal fade" id="paymentModal" tabindex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="paymentModalLabel">Select Payment Method</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<button type="button" class="btn btn-outline-primary w-100 mb-3" id="cashOnDelivery">
							Cash on Delivery
						</button>
						<button type="button" class="btn btn-outline-primary w-100" id="onlinePayment">
							Online Payment
						</button>
					</div>
				</div>
			</div>
		</div>
	`;

	// Online payment method modal
	const onlinePaymentModalHTML = `
		<div class="modal fade" id="onlinePaymentModal" tabindex="-1" aria-labelledby="onlinePaymentLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="onlinePaymentLabel">Choose Online Payment Method</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<button type="button" class="btn btn-outline-primary w-100 mb-3" id="qrCodePayment">
							QR Code Scanner
						</button>
						<button type="button" class="btn btn-outline-primary w-100" id="debitCardPayment">
							Debit Card
						</button>
					</div>
				</div>
			</div>
		</div>
	`;

	// QR Code payment modal
	const qrCodeModalHTML = `
		<div class="modal fade" id="qrCodeModal" tabindex="-1" aria-labelledby="qrCodeModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="qrCodeModalLabel">Scan QR Code to Pay</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body text-center">
						<img src="./css/images/qr_code_scanner.jpg" alt="QR Code" class="img-fluid mb-3" style="max-width: 250px;">
						<div class="alert alert-info">
							Total Amount to Pay: ₹<span class="total">400.50</span>
						</div>
						<p class="text-muted timer">Time Remaining: <span id="countdown">30</span> seconds</p>
						<p class="text-muted">Scan the QR code with your payment app</p>
						<button type="button" class="btn btn-primary mt-3" id="qrDoneButton">Done</button>
					</div>
				</div>
			</div>
		</div>
	`;

	// Thanks modal
	const thanksModalHTML = `
		<div class="modal fade" id="thanksModal" tabindex="-1" aria-labelledby="thanksModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-body text-center">
						<h3>THANKS FOR ORDERING</h3>
					</div>
				</div>
			</div>
		</div>
	`;

	// Remove existing modals first
	['paymentModal', 'onlinePaymentModal', 'qrCodeModal', 'thanksModal'].forEach(id => {
		const existingModal = document.getElementById(id);
		if (existingModal) existingModal.remove();
	});

	// Add modals to body
	document.body.insertAdjacentHTML('beforeend', mainModalHTML);
	document.body.insertAdjacentHTML('beforeend', onlinePaymentModalHTML);
	document.body.insertAdjacentHTML('beforeend', qrCodeModalHTML);
	document.body.insertAdjacentHTML('beforeend', thanksModalHTML);
}

export function initializePaymentModal() {
	createPaymentModals();

	const proceedButton = document.querySelector('.invoice button');
	if (proceedButton) {
		proceedButton.addEventListener('click', () => {
			const mainPaymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
			mainPaymentModal.show();

			// Cash on Delivery
			const cashButton = document.getElementById('cashOnDelivery');
			cashButton.addEventListener('click', () => {
				alert('Cash on Delivery selected');
				mainPaymentModal.hide();
			});

			// Online Payment
			const onlineButton = document.getElementById('onlinePayment');
			onlineButton.addEventListener('click', () => {
				mainPaymentModal.hide();
				const onlinePaymentModal = new bootstrap.Modal(document.getElementById('onlinePaymentModal'));
				onlinePaymentModal.show();

				// QR Code Payment
				const qrCodeButton = document.getElementById('qrCodePayment');
				qrCodeButton.addEventListener('click', () => {
					onlinePaymentModal.hide();
					const qrCodeModal = new bootstrap.Modal(document.getElementById('qrCodeModal'));

					// Set total amount from invoice
					const totalElement = document.querySelector('.invoice strong:last-child');
					if (totalElement) {
						const totalAmount = totalElement.textContent.trim();
						document.querySelector('#qrCodeModal .total').textContent = totalAmount.replace('₹', '');
					}

					qrCodeModal.show();

					// Start 30-second countdown
					const countdownElement = document.getElementById('countdown');
					let timeLeft = 30;

					const countdownInterval = setInterval(() => {
						timeLeft--;
						countdownElement.textContent = timeLeft;

						if (timeLeft <= 0) {
							clearInterval(countdownInterval);
							qrCodeModal.hide();
						}
					}, 1000);

					// Done button click handler
					const doneButton = document.getElementById('qrDoneButton');
					doneButton.addEventListener('click', () => {
						qrCodeModal.hide();
						const thanksModal = new bootstrap.Modal(document.getElementById('thanksModal'));
						thanksModal.show();

						// Auto-close thanks modal after 5 seconds
						setTimeout(() => {
							thanksModal.hide();
						}, 5000);
					});
				});

				// Debit Card Payment
				const debitCardButton = document.getElementById('debitCardPayment');
				debitCardButton.addEventListener('click', () => {
					alert('Debit Card Payment selected');
					onlinePaymentModal.hide();
				});
			});
		});
	}
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePaymentModal);
