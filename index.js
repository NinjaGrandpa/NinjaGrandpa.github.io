import { token } from "./config.js"

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

window.addEventListener("load", () => {
	fetch("https://api.linkedin.com/rest/memberSnapshotData?q=criteria", {
		method: "GET",
		mode: "cors",	
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`,
			"LinkedIn-Version": 202312
		},
		cache: "default"
	}).then((response) => response.text())
		.catch((error) => console.error(error))
		.finally((data) => {
			document.getElementById("profile-text").innerHTML = data ?? "No Data";
		})

});


