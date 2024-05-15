export default function populateContainers(response) {
	const domains = Object.keys(response).sort((a, b) => a.localeCompare(b));

	createDomains(domains);
	createProfile(response.PROFILE);
	createSkills(response.SKILLS);
}

function createDomains(domains) {
	const profileElement = document.getElementById("domains");
	profileElement.innerHTML = "";

	function firstCharToUppercase(text) {
		return text.charAt(0).toUpperCase() + text.substring(1);
	}

	const list = document.createElement("ul");
	list.className = "domains-list";

	domains.forEach((key) => {
		let text = key.toLowerCase();

		if (text.includes("_")) {
			const split = text.split("_");
			text = split[0] + " " + firstCharToUppercase(split[1]);
		}

		text = firstCharToUppercase(text);

		const listItem = document.createElement("li");
		listItem.className = "domains-list-item";
		listItem.id = key.toLowerCase();

		const node = document.createTextNode(text);

		listItem.appendChild(node);

		list.appendChild(listItem);
	});
	profileElement.appendChild(list);
}

function createProfile(profile) {
	const content = document.getElementById("profile-content");
	const list = document.createElement("ul");
	list.id = "profile-list";

	const keys = Object.keys(profile).sort((a, b) => a.localeCompare(b));

	keys.forEach((key) => {
		if (!profile[key]) return;

		const item = document.createElement("li");
		item.id = key.toLowerCase().replace(" ", "-");
		item.innerHTML = key + ": " + profile[key];

		list.appendChild(item);
	});

	content.appendChild(list);
}

function createSkills(skills) {
	const skillsElement = document.getElementById("skills-list");

	const skillsListElement = document.createElement("ul");
	skillsListElement.id = "skills-list";

	for (let index = 0; index < skills.length; index++) {
		const skillData = skills[index].Name;

		const skillElement = document.createElement("li");
		skillElement.className = "skills-list-item";
		skillElement.id = skillData.toLowerCase().replace(" ", "-");

		skillElement.appendChild(document.createTextNode(skillData));
		skillsListElement.appendChild(skillElement);
	}

	skillsElement.appendChild(skillsListElement);
}
