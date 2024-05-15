import populateContainers from "./services/populateContainers.js";
import createThemeToggler from "./services/themeToggle.js";

createThemeToggler();

const response = await fetch("./data/profileData.json").then((response) =>
	response.json()
);

await populateContainers(response);
