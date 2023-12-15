const moneyInput = document.querySelector("#money");
const moneyChargeForm = document.querySelector(".moneyChargeForm");
const moneyChargeBtn = document.querySelector(".moneyChargeBtn");

moneyChargeBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const money = moneyInput.value;
  const jsonData = await (
    await fetch("/auth/users/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ money })
    })
  ).json();
  if (jsonData.status === 200) {
    alert(jsonData.message);
    location.href = "user-profile.html";
  } else {
    alert(jsonData.message);
    location.href = "user-profile.html";
  }
});
