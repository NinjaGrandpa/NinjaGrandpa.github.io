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

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("LinkedIn-Version", "202312");
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Cookie", "lidc=\"b=VB08:s=V:r=V:a=V:p=V:g=5045:u=899:x=1:i=1715781943:t=1715867589:v=2:sig=AQFYYlmJdcGaKA6dev1BKm0PVFHYF2cq\"; bcookie=\"v=2&909be48a-e8a5-41c3-80cb-00e8a3eef304\"; li_gc=MTswOzE3MTU3NjM1MjU7MjswMjFFBsulZUqE0Tk5bg4Oa0KGc+IP1EMevuxv5Wnn4fOCzg==");

	const options = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow"
	}

	fetch("https://api.linkedin.com/rest/memberSnapshotData?q=criteria", options)
		.then((response) => response.text())
		.then((result) => {
			document.getElementById("profile-text").innerHTML = result ?? "No Data";
		})
		.catch((error) => console.error(error))
});


