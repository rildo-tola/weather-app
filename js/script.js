const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") return;

  console.log("Searching weather for:", city);
});
