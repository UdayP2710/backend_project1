const switchers = [...document.querySelectorAll(".switcher")];
const register = document.getElementById("register");
const login = document.getElementById("login");

switchers.forEach((item) => {
  item.addEventListener("click", function () {
    switchers.forEach((item) =>
      item.parentElement.classList.remove("is-active")
    );
    this.parentElement.classList.add("is-active");
  });
});
register.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const user_data = { username, email, password };
  console.log({ user_data });
  try {
    console.log("reached");
    const response = await fetch(
      "http://localhost:7000/api/employee/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user_data),
      }
    );

    if (response.ok) {
      alert("Data submitted successfully");
    } else {
      alert("Error submitting data in try block");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error submitting data in catch block");
  }
});

login.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const user_data = { email, password };
  try {
    const response = await fetch("http://localhost:7000/api/employee/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user_data),
    });

    if (response.ok) {
      alert("sucessfull response");
      window.location.href =
        "http://127.0.0.1:5500/frontend/student_details_form_page/ui.html";
    } else {
      alert("failed response");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error submitting data");
  }
});
