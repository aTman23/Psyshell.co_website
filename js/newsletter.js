
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
});
//   document.addEventListener('DOMContentLoaded', function() {
//     var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
//     myModal.show();
//   });
  function submitForm(event) {
  event.preventDefault();

  let nameElement = document.getElementById("name");
  let professionElement = document.getElementById("profession");
  let emailElement = document.getElementById("email");
  let mobileNumberElement = document.getElementById("mobile_number");
  let hobbyElement = document.getElementById("hobby");

  let errorMessage = "Please fill in the following fields:\n";
  let fieldsWithError = [];

  if (nameElement && nameElement.value.trim() === "") {
      fieldsWithError.push("Name");
  }
  if (professionElement && professionElement.value.trim() === "") {
      fieldsWithError.push("Profession");
  }
  if (emailElement && emailElement.value.trim() === "") {
      fieldsWithError.push("Email");
  }
  if (mobileNumberElement && mobileNumberElement.value.trim() === "") {
      fieldsWithError.push("Mobile Number");
  }
  if (hobbyElement && hobbyElement.value.trim() === "") {
      fieldsWithError.push("How you heard about us");
  }

  if (fieldsWithError.length > 0) {
      errorMessage += fieldsWithError.join(", ");
      alert(errorMessage);
  } else {
      let form = document.getElementById("myForm");
      let data = new FormData(form);
      console.log("Form submitted:");
      fetch("https://script.google.com/macros/s/AKfycbzmz7RJSUwIUbFLtlsh6bbxoQW5Rz22auch0xdBHeX_HnkNXhuJQpHLACM0jJVuHJOG/exec", {
          method: "POST",
          body: data
      })
      .then(res => res.text())
      .then(data => {
          console.log(data);
          alert("Thank you for your response");
          form.reset();
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }
}

