const emailInput = document.querySelector("#email");
const nameInput = document.querySelector("#name");
const passwordInput = document.querySelector("#password");
const passwordCheckInput = document.querySelector("#password-confirm");
const signupForm = document.querySelector(".signup-form");
const emailVeificationBtn = document.querySelector(".emailVerificationBtn");
const emailVericiationWrapper = document.querySelector(
  ".emailVericiationWrapper"
);

emailVeificationBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (emailVeificationBtn.classList.contains("unclicked")) {
    emailVeificationBtn.classList.remove("unclicked");
    emailVeificationBtn.classList.add("clicked");
    const email = emailInput.value;
    const verificiationInput = document.createElement("input");
    verificiationInput.setAttribute("type", "text");
    verificiationInput.setAttribute("placeholder", "인증번호를 입력해주세요.");
    verificiationInput.setAttribute("required", "true");
    verificiationInput.setAttribute("class", "verificiationInput");
    emailVericiationWrapper.appendChild(verificiationInput);
    const jsonData = await (
      await fetch(`/auth/email-auth?email=${email}`)
    ).json();
    if (jsonData.status === 400) {
      console.log(jsonData);
      alert("인증번호 전송에 실패하였습니다.");
    }
  } else {
    alert("이미 인증번호를 전송했습니다.");
    return;
  }
});
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const verificiationInput = document.querySelector(".verificiationInput");
  const auth = verificiationInput.value;
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

  if (auth === "" || auth.trim() === "") {
    return alert("인증번호를 입력해주세요.");
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
    auth,
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
