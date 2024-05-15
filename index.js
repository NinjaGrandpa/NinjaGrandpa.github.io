function calculateSettingAsThemeString({
	localStorageTheme,
	systemSettingDark
}) {
	if (localStorageTheme !== null) {
		return localStorageTheme;
	}

	if (systemSettingDark.matches) {
		return "dark";
	}

	return "light";
}

const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = calculateSettingAsThemeString({
	localStorageTheme,
	systemSettingDark
});

const button = document.querySelector("[data-theme-toggle]");

button.addEventListener("click", () => {
	const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

	document.querySelector("html").setAttribute("data-theme", newTheme);

	localStorage.setItem("theme", newTheme);

	currentThemeSetting = newTheme;
});

const response = await fetch("./profileData.json").then((response) =>
	response.json()
);

createDomains();

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

function createDomains() {
	const keys = Object.keys(response).sort((a, b) => a.localeCompare(b));

	const profileElement = document.getElementById("profile");
	profileElement.innerHTML = "";

	function firstCharToUppercase(text) {
		return text.charAt(0).toUpperCase() + text.substring(1);
	}

	const list = document.createElement("ul");
	list.className = "profile-list";

	keys.forEach((key) => {
		let text = key.toLowerCase();

		if (text.includes("_")) {
			const split = text.split("_");
			text = split[0] + " " + firstCharToUppercase(split[1]);
		}

		text = firstCharToUppercase(text);

		const listItem = document.createElement("li");
		listItem.className = "profile-list-item";
		listItem.id = key.toLowerCase();

		const node = document.createTextNode(text);

		listItem.appendChild(node);

		list.appendChild(listItem);
	});
	profileElement.appendChild(list);
}
