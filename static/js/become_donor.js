document.getElementById("donorForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateForm()) {
    const formData = new FormData(this);
    const donorData = {};
    for (let [key, value] of formData.entries()) donorData[key] = value;

    donorData.availability = document.getElementById("availability").checked;

    // Push into global donorsData
    if (window.donorsData && Array.isArray(window.donorsData)) {
      window.donorsData.push({
        id: String(Date.now()),
        name: donorData.fullName,
        age: donorData.age,
        gender: donorData.gender,
        bloodGroup: donorData.bloodGroup,
        city: donorData.cityPincode,
        location: donorData.location,
        lastDonation: donorData.lastDonation,
        available: donorData.availability,
        phone: donorData.phone,
      });
      localStorage.setItem("donorsData", JSON.stringify(window.donorsData)); // save
    }

    showSuccessMessage(donorData);
  }
});

function validateForm() {
  let isValid = true;
  const requiredFields = [
    "fullName",
    "age",
    "gender",
    "bloodGroup",
    "phone",
    "cityPincode",
    "location",
    "lastDonation",
  ];

  requiredFields.forEach((field) => {
    const element = document.getElementById(field);
    if (!element.value.trim()) {
      showError(element, "This field is required");
      isValid = false;
    } else {
      clearError(element);
    }
  });

  const age = document.getElementById("age").value;
  if (age && (age < 18 || age > 65)) {
    showError(document.getElementById("age"), "Age must be between 18 and 65");
    isValid = false;
  }

  const phone = document.getElementById("phone").value;
  if (phone && !/^\d{10}$/.test(phone.replace(/\D/g, ""))) {
    showError(
      document.getElementById("phone"),
      "Please enter a valid 10-digit phone number"
    );
    isValid = false;
  }

  if (!document.getElementById("agreement").checked) {
    alert("Please agree to the terms and conditions");
    isValid = false;
  }

  return isValid;
}

const lastDonationInput = document.getElementById("lastDonation");
const availabilityCheckbox = document.getElementById("availability");

lastDonationInput.addEventListener("change", () => {
  const lastDonationDate = new Date(lastDonationInput.value);
  const today = new Date();

  if (!lastDonationInput.value) {
    availabilityCheckbox.disabled = false;
    return;
  }

  const threeMonthsAgo = new Date(today);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  if (lastDonationDate > threeMonthsAgo) {
    availabilityCheckbox.checked = false;
    availabilityCheckbox.disabled = true;
    alert(
      "You must wait at least 3 months after your last donation to be available for donation."
    );
  } else {
    availabilityCheckbox.disabled = false;
  }
});

function showError(element, message) {
  clearError(element);
  element.style.borderColor = "#e74c3c";
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.style.color = "#e74c3c";
  errorDiv.style.fontSize = "12px";
  errorDiv.style.marginTop = "5px";
  errorDiv.textContent = message;
  element.parentNode.appendChild(errorDiv);
}

function clearError(element) {
  element.style.borderColor = "#ecf0f1";
  const errorMessage = element.parentNode.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.remove();
  }
}

function showSuccessMessage(data) {
  const modal = document.createElement("div");
  modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;

  modal.innerHTML = `
            <div style="background: white; padding: 40px; border-radius: 20px; text-align: center; max-width: 400px; margin: 20px;">
                <div style="color: #27ae60; font-size: 48px; margin-bottom: 20px;">✓</div>
                <h2 style="color: #2c3e50; margin-bottom: 15px;">Registration Successful!</h2>
                <p style="color: #7f8c8d; margin-bottom: 20px;">Thank you for becoming a life-saving donor, ${data.fullName}!</p>
                <p style="color: #7f8c8d; font-size: 14px; margin-bottom: 30px;">We'll contact you when your blood type (${data.bloodGroup}) is needed.</p>
                <button onclick="this.parentElement.parentElement.remove()" style="background: #e74c3c; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Close</button>
            </div>
        `;

  document.body.appendChild(modal);

  // Reset form and availability checkbox state
  document.getElementById("donorForm").reset();
  availabilityCheckbox.disabled = false;
  availabilityCheckbox.checked = false;
}

function showPrivacyPolicy() {
  alert(
    "Privacy Policy:\n\nWe collect your information solely for blood donation coordination. Your data is kept secure and only used to contact you for emergency blood needs. We do not share your information with third parties without consent."
  );
}

document.getElementById("phone").addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 10) {
    value = value.slice(0, 10);
  }
  e.target.value = value;
});

document
  .querySelectorAll("input[required], select[required]")
  .forEach((element) => {
    element.addEventListener("blur", function () {
      if (this.value.trim()) {
        clearError(this);
      }
    });
  });
