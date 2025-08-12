document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault(); // Prevent form from reloading the page

  const formData = {
    name: this.name.value.trim(),
    email: this.email.value.trim(),
    message: this.message.value.trim()
  };

  try {
    const response = await fetch("/api/sendToTelegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    let result = {};
    try {
      result = await response.json();
    } catch {
      alert("Server response was not valid JSON.");
      return;
    }

    if (response.ok && result.success) {
      alert("Message sent successfully!");
      this.reset(); // Clear the form
    } else {
      alert("Error sending message: " + (result.error || "Unknown error"));
    }
  } catch (err) {
    alert("Fetch error: " + err.message);
  }
});
