export default function createDomains(response) {
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
