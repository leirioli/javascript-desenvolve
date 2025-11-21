let likedUsers = [];
const nameInput = document.getElementById("nameInput");
const likeButton = document.getElementById("likeButton");
const likesDisplay = document.getElementById("likesDisplay");
const errorMessage = document.getElementById("errorMessage");
const errorSpan = errorMessage.querySelector("span");

function isUserLiked(name) {
  const lowerCaseName = name.trim().toLowerCase();
  return likedUsers.some((user) => user.toLowerCase() === lowerCaseName);
}

function updateLikesDisplay() {
  const count = likedUsers.length;
  let displayText = "";

  if (count === 0) {
    displayText = "Ninguém curtiu ainda. Seja o primeiro!";
  } else if (count === 1) {
    displayText = `${likedUsers[0]} curtiu isso.`;
  } else if (count === 2) {
    displayText = `${likedUsers[0]} e ${likedUsers[1]} curtiram isso.`;
  } else {
    const othersCount = count - 2;
    displayText = `${likedUsers[0]}, ${likedUsers[1]} e mais ${othersCount} pessoas curtiram isso.`;
  }
  likesDisplay.textContent = displayText;
}

likeButton.addEventListener("click", () => {
  const name = nameInput.value.trim();

  if (!name) {
    errorSpan.textContent = "Por favor, digite seu nome para curtir.";
    errorMessage.classList.remove("hidden");
    nameInput.focus();
    return;
  }

  if (isUserLiked(name)) {
    errorSpan.textContent = `Você já curtiu, ${name}!`;
    errorMessage.classList.remove("hidden");
    nameInput.focus();
    return;
  }

  likedUsers.push(name);
  updateLikesDisplay();
  nameInput.value = "";
  errorMessage.classList.add("hidden");
});

updateLikesDisplay(); // Chamada inicial
