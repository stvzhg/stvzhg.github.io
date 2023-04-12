/* 
Copied from https://github.com/derekkedziora/jekyll-demo/blob/master/scripts/mode-switcher.js
https://github.com/derekkedziora/jekyll-demo
Creative Commons Attribution 4.0 International License
*/

let theme = sessionStorage.getItem('theme');
const isDarkMode = () => 
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;


const iconSun = "/assets/img/sun.svg";
const iconMoon = "/assets/img/moon.svg";

function changeIconImgSrc(src) {
	document.getElementById("theme-toggle-img").src = src;
	document.getElementById("theme-toggle-img--mobile").src = src;
}

function modeSwitcher() {
	let theme = sessionStorage.getItem('theme');
	if (theme === "dark") {
		document.documentElement.setAttribute('data-theme', 'light');
		sessionStorage.setItem('theme', 'light');
		changeIconImgSrc(iconSun);
	} else  {
		document.documentElement.setAttribute('data-theme', 'dark');
		sessionStorage.setItem('theme', 'dark');
		changeIconImgSrc(iconMoon);
	}
}

function modeInit() {
	if (isDarkMode) {
		document.documentElement.setAttribute('data-theme', 'dark');
		sessionStorage.setItem('theme', 'dark');
		changeIconImgSrc(iconMoon);
	} else {
		document.documentElement.setAttribute('data-theme', 'light');
		sessionStorage.setItem('theme', 'light');
		changeIconImgSrc(iconSun);
	}
}

modeInit();