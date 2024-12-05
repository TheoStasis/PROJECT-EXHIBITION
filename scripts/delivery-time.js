// Delivery time calculation constants
const BASE_DELIVERY_TIME = 30; // minutes
const LOCATION_TIMES = {
  default: 30,
  location1: 25,
  location2: 35,
  location3: 40,
};

// Time slots for scheduling
const AVAILABLE_TIME_SLOTS = {
  startHour: 10, // 10 AM
  endHour: 22, // 10 PM
  intervalMinutes: 30,
};

class DeliveryTimeManager {
  constructor() {
    this.initializeElements();
    this.attachEventListeners();
    this.updateEstimatedTime();
  }

  initializeElements() {
    this.deliverNowBtn = document.getElementById('deliverNowBtn');
    this.scheduleBtn = document.getElementById('scheduleBtn');
    this.schedulePicker = document.getElementById('schedulePicker');
    this.estimatedTimeElement = document.getElementById('estimatedTime');
    this.locationSelect = document.getElementById('locationSelect');
    this.scheduleDateTime = document.getElementById('scheduleDateTime');
    this.confirmScheduleBtn = document.getElementById('confirmSchedule');
  }

  attachEventListeners() {
    this.deliverNowBtn.addEventListener('click', () => this.toggleDeliveryMode('now'));
    this.scheduleBtn.addEventListener('click', () => this.toggleDeliveryMode('schedule'));
    this.locationSelect.addEventListener('change', () => this.updateEstimatedTime());
    this.confirmScheduleBtn.addEventListener('click', () => this.confirmScheduledDelivery());

    // Set minimum datetime for schedule picker
    this.setSchedulePickerConstraints();
  }

  toggleDeliveryMode(mode) {
    if (mode === 'now') {
      this.deliverNowBtn.classList.add('active');
      this.scheduleBtn.classList.remove('active');
      this.schedulePicker.style.display = 'none';
      this.updateEstimatedTime();
    } else {
      this.scheduleBtn.classList.add('active');
      this.deliverNowBtn.classList.remove('active');
      this.schedulePicker.style.display = 'block';
    }
  }

  calculateDeliveryTime(selectedLocation) {
    const baseTime = LOCATION_TIMES[selectedLocation] || BASE_DELIVERY_TIME;
    const now = new Date();
    const estimatedDelivery = new Date(now.getTime() + baseTime * 60000);
    return estimatedDelivery;
  }

  updateEstimatedTime() {
    const selectedLocation = this.locationSelect.value;
    const estimatedDelivery = this.calculateDeliveryTime(selectedLocation);
    const formattedTime = estimatedDelivery.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    this.estimatedTimeElement.textContent = `${formattedTime}`;
  }

  setSchedulePickerConstraints() {
    const now = new Date();
    const minDateTime = new Date(now.getTime() + 30 * 60000); // Minimum 30 minutes from now

    // Format for datetime-local input
    const formattedMin = minDateTime.toISOString().slice(0, 16);
    this.scheduleDateTime.min = formattedMin;

    // Set max date to 7 days from now
    const maxDateTime = new Date(now.getTime() + 7 * 24 * 60 * 60000);
    const formattedMax = maxDateTime.toISOString().slice(0, 16);
    this.scheduleDateTime.max = formattedMax;
  }

  confirmScheduledDelivery() {
    const scheduledTime = new Date(this.scheduleDateTime.value);
    if (scheduledTime) {
      const formattedTime = scheduledTime.toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
      this.estimatedTimeElement.textContent = formattedTime;
      alert(`Delivery scheduled for ${formattedTime}`);
      this.toggleDeliveryMode('now');
    } else {
      alert('Please select a valid delivery time');
    }
  }
}

// Initialize delivery time manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DeliveryTimeManager();
});
