const userName = document.getElementById("username");
const searchBtn = document.getElementById("search-btn");
const profile = document.getElementById("profile");

searchBtn.addEventListener("click", () => {
  const query = userName.value.trim();
  if (query === "") {
    profile.textContent = "Type a user name!";
    return; // Stop execution if empty
  }
  getUser(query);
});

async function getUser(userId) {
  profile.textContent = "Loading...";

  try {
    const response = await fetch(`https://api.github.com/users/${userId}`);

    if (!response.ok) {
      throw Error("User not found!");
    }

    const data = await response.json();

    // Use innerHTML so that <img> and <h2> tags can be rendered:
    profile.innerHTML = `
  <img src="${data.avatar_url}" alt="Profile Pic">
  <h2>${data.name || data.login}</h2>
  <p>📁 Public Repos: ${data.public_repos}</p>
`;
  } catch (err) {
    profile.textContent = err.message;
  }
}
