const emailInput = document.querySelector("#email");
const nameInput = document.querySelector("#name");
const careerInput = document.querySelector("#career");
const passwordInput = document.querySelector("#password");
const passwordCheckInput = document.querySelector("#password-confirm");
const profileInput = document.querySelector("#profile");
const signupForm = document.querySelector(".signup-form");
const signupButton = document.querySelector(".signup-button");

const formData = new FormData();

const fileUpload = (e) => {
  formData.append("profile", e.target.files[0]);
};

profileInput.addEventListener("change", fileUpload);
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  //   if (formData.get("profile") === null) {
  //     return alert("프로필 사진을 등록해주세요.");
  //   }

  if (
    emailInput.value === "" ||
    emailInput.value.indexOf("@") === -1 ||
    emailInput.value.indexOf(".") === -1 ||
    emailInput.value.trim() === ""
  ) {
    return alert("이메일을 입력해주세요.");
  }

  if (
    nameInput.value === "" ||
    nameInput.value.trim() === "" ||
    nameInput.value.length < 2 ||
    nameInput.value.length > 10
  ) {
    return alert("이름을 입력해주세요.");
  }

  if (
    passwordInput.value === "" ||
    passwordInput.value.trim() === "" ||
    passwordInput.value.length < 6 ||
    passwordInput.value.length > 15
  ) {
    return alert("비밀번호를 입력해주세요.");
  }

  if (
    passwordCheckInput.value === "" ||
    passwordCheckInput.value.trim() === "" ||
    passwordCheckInput.value.length < 6 ||
    passwordCheckInput.value.length > 15
  ) {
    return alert("비밀번호 확인을 입력해주세요.");
  }

  if (passwordInput.value !== passwordCheckInput.value) {
    passwordInput.value = "";
    passwordCheckInput.value = "";
    return alert("비밀번호가 일치하지 않습니다.");
  }

  formData.append("email", emailInput.value);
  formData.append("name", nameInput.value);
  formData.append("career", careerInput.value);
  formData.append("password", passwordInput.value);
  formData.append("passwordCheck", passwordCheckInput.value);

  const data = {
    email: emailInput.value,
    name: nameInput.value,
    career: careerInput.value,
    password: passwordInput.value,
    passwordCheck: passwordCheckInput.value
  };

  const jsonData = await (
    await fetch("http://localhost:3000/auth/petsitters/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
  ).json();

  console.log(jsonData);
  if (jsonData.status === 200) {
    alert(jsonData.message);
    location.href = "petsitter-login.html";
  } else {
    alert(jsonData.message);
    emailInput.value = "";
    nameInput.value = "";
    careerInput.value = "";
    passwordInput.value = "";
    passwordCheckInput.value = "";
  }
});
