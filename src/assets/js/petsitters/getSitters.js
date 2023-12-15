const getPetSitters = async () => {
  const jsonData = await (
    await fetch("http://localhost:3000/petsitters/")
  ).json();

  console.log(jsonData.data);
  if (jsonData.status === 200) {
    const sitters = jsonData.data;
    const sittersContainer = document.querySelector(".sitters-container");
    sittersContainer.innerHTML = "";

    sitters.forEach((sitter) => {
      console.log(sitter);
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
getPetSitters();
