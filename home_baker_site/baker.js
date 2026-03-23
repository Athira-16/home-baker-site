let service_id = "service_bmujzdi";
let public_Key = "faZpPdKtJP2eygvgx";
let template_Id ="template_urjkhik";

(function () {
  emailjs.init(public_Key); // replace with your public key
})();

document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.querySelector("textarea").value.trim();

    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    const templateParams = {
      name: name,
      email: email,
      message: message,
    };

    emailjs.send(service_id, template_Id, templateParams).then(
      function (response) {
        alert("Message sent successfully! 🎉");
        document.querySelector(".contact-form").reset();
      },
      function (error) {
        alert("Failed to send message ❌");
        console.error(error);
      },
    );
  });
