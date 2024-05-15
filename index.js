import createThemeToggler from "./services/themeToggle.js";
import createDomains from "./services/createDomains.js";

createThemeToggler();

const response = await fetch("./data/profileData.json").then((response) =>
	response.json()
);

createDomains(response);

const skillsElement = document.getElementById("skills");

const skillsListElement = document.createElement("ul");
skillsListElement.id = "skills-list";

const skillsData = response["SKILLS"];

for (let index = 0; index < skillsData.length; index++) {
	const skillData = skillsData[index].Name;

	const skillElement = document.createElement("li");
	skillElement.className = "skills-list-item";
	skillElement.id = skillData.toLowerCase().replace(" ", "-");

	skillElement.appendChild(document.createTextNode(skillData));
	skillsListElement.appendChild(skillElement);
}

skillsElement.appendChild(skillsListElement);
