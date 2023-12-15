const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

const paintPage = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const keyword = urlParams.get("keyword");
  if (keyword === null) return;
  const jsonData = await (
    await fetch(`http://localhost:3000/petsitters/search?keyword=${keyword}`)
  ).json();
  if (jsonData.status === 200) {
    const sitters = jsonData.data;
    const sittersContainer = document.querySelector(".sitters-container");
    sittersContainer.innerHTML = "";

    sitters.forEach((sitter) => {
      const sitterCard = document.createElement("div");
      sitterCard.classList.add("sitter-card");
      sitterCard.innerHTML = `
      <div class="card" style="width: 18rem ">
        <img
          src="${sitter.Profile.profile}"
          class="card-img-top"
          alt="..."
          style="height: 430px"
        />
        <div class="card-body">
          <span class="card-text petsitter-name">${sitter.name}</span>
          <br />
          <small>
            #${sitter.Profile.tags}
          </small>
        </div>
      </div>
    </div>
        `;
      sittersContainer.appendChild(sitterCard);
    });
  } else {
    alert(jsonData.message);
  }
};

paintPage();
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("searchBtn clicked");
  const searchValue = searchInput.value;
  const jsonData = await (
    await fetch(
      `http://localhost:3000/petsitters/search?keyword=${searchValue}`
    )
  ).json();
  window.location.href = `http://localhost:3000/search.html?keyword=${searchValue}`;
});
