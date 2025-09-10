document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const submitBtn = form.querySelector("button[type=submit]");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const now = new Date().toLocaleString();
    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim() || "Not provided",
      message: form.message.value.trim(),
      time: now,
    };

    console.log("frommmmm", formData);
    
    // Validate
    const errorMsg = validateForm(formData);
    if (errorMsg) {
      Toastify({
        text: errorMsg,
        duration: 4000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#ffc107", // warning yellow
      }).showToast();
      return;
    }

    try {
      setLoading(true, submitBtn);

      // Send to company
      await emailjs.send("template_jejsdxm", formData);

      // Auto reply to user
      await emailjs.send("template_fcauugx", formData);

      Toastify({
        text: "✅ Thank you! Your message has been sent.",
        duration: 4000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#28a745",
      }).showToast();

      form.reset();
    } catch (err) {
      console.error("EmailJS Error:", err);
      Toastify({
        text: "Oops! Something went wrong. Please try again later.",
        duration: 4000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#dc3545",
      }).showToast();
    } finally {
      setLoading(false, submitBtn);
    }
  });
});

// Validation helper
function validateForm(formData) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.name) return "Name is required !!";
  if (!emailRegex.test(formData.email)) return "Please enter a valid email !!";
  if (!formData.message) return "Message cannot be empty !!";
  return null;
}

// Button loading state helper
function setLoading(isLoading, button) {
  if (isLoading) {
    button.disabled = true;
    button.innerHTML = "Sending...";
  } else {
    button.disabled = false;
    button.innerHTML = "Submit";
  }
}