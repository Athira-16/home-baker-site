const service_id = "service_bmujzdi";
const public_Key = "faZpPdKtJP2eygvgx";
const template_Id = "template_urjkhik";

const form = document.querySelector(".contact-form");
const statusEl = document.getElementById("form-status");
const submitBtn = form.querySelector("button[type='submit']");

// The EmailJS script is loaded from a CDN; if it is blocked or offline,
// keep the rest of the page working and tell the user when they try to send.
const emailReady = typeof emailjs !== "undefined";
if (emailReady) {
  emailjs.init(public_Key);
}

function showStatus(text, isError) {
  statusEl.textContent = text;
  statusEl.classList.toggle("error", Boolean(isError));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    showStatus("Please fill in all fields.", true);
    return;
  }

  if (!emailReady) {
    showStatus(
      "Sorry, the contact form isn't available right now. Please try again later.",
      true,
    );
    return;
  }

  const templateParams = {
    name: name,
    email: email,
    message: message,
  };

  submitBtn.disabled = true;
  showStatus("Sending...", false);

  emailjs
    .send(service_id, template_Id, templateParams)
    .then(function () {
      showStatus("Thanks! Your message was sent. I'll get back to you soon.", false);
      form.reset();
    })
    .catch(function (error) {
      showStatus(
        "Sorry, your message couldn't be sent. Please try again.",
        true,
      );
      console.error(error);
    })
    .finally(function () {
      submitBtn.disabled = false;
    });
});
