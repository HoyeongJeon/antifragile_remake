const emailInput = document.querySelector("#email");
const nameInput = document.querySelector("#name");
const passwordInput = document.querySelector("#password");
const passwordCheckInput = document.querySelector("#password-confirm");
const signupForm = document.querySelector(".signup-form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const name = nameInput.value;
  const password = passwordInput.value;
  const passwordCheck = passwordCheckInput.value;

  if (
    email === "" ||
    email.indexOf("@") === -1 ||
    email.indexOf(".") === -1 ||
    email.trim() === ""
  ) {
    return alert("이메일을 입력해주세요.");
  }

  if (
    name === "" ||
    name.trim() === "" ||
    name.length < 2 ||
    name.length > 10
  ) {
    return alert("이름을 입력해주세요.");
  }

  if (
    password === "" ||
    password.trim() === "" ||
    password.length < 6 ||
    password.length > 15
  ) {
    return alert("비밀번호를 입력해주세요.");
  }
  if (
    passwordCheck === "" ||
    passwordCheck.trim() === "" ||
    passwordCheck.length < 6 ||
    passwordCheck.length > 15
  ) {
    return alert("비밀번호 확인을 입력해주세요.");
  }

  if (password !== passwordCheck) {
    passwordInput.value = "";
    passwordCheckInput.value = "";
    return alert("비밀번호가 일치하지 않습니다.");
  }

  const data = {
    email,
    name,
    password,
    passwordCheck
  };

  const jsonData = await (
    await fetch("http://localhost:3000/auth/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
  ).json();

  if (jsonData.status === 200) {
    alert(jsonData.message);
    location.href = "user-login.html";
  } else {
    alert(jsonData.message);
    emailInput.value = "";
    nameInput.value = "";
    passwordInput.value = "";
    passwordCheckInput.value = "";
  }
});
