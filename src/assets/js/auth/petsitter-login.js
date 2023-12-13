const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const loginForm = document.querySelector(".signup-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  if (
    email.indexOf("@") === -1 ||
    email.indexOf(".") === -1 ||
    email.trim() === ""
  ) {
    return alert("이메일을 입력해주세요.");
  }

  if (password.trim() === "" || password.length < 6 || password.length > 15) {
    return alert("비밀번호를 입력해주세요.");
  }

  const data = {
    email,
    password
  };

  const jsonData = await (
    await fetch("http://localhost:3000/auth/petsitters/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
  ).json();

  if (jsonData.status === 200) {
    alert(jsonData.message);
    location.href = "/";
  } else {
    alert(jsonData.message);
    emailInput.value = "";
    passwordInput.value = "";
  }
});
