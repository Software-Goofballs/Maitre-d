const { dayOfPlay } = require("./../config.json");
const fs = require('fs');
const path = require('path');
const memory = path.resolve(__dirname, "memory.json");

const loadMenuData = async () => {
	try {
		return JSON.parse(fs.readFileSync(memory));
	} catch {
		return [];
	}
}

const getNextDayOfWeek = () => {
	var resultDate = new Date();
	resultDate.setDate(resultDate.getDate() + (7 + dayOfPlay - resultDate.getDay()) % 7);
	return resultDate.toISOString().split('T')[0];
}

module.exports = { 
	async getMenu() {
		const menu = await loadMenuData();
		const nextMenu = menu[0];
		var today = new Date();
		today = today.toISOString().split('T')[0];
		
		if (nextMenu == undefined || nextMenu.Date < today) {
			nextDate = getNextDayOfWeek();
			return {
				Owner: "",
				Main: "",
				Dishes: [],
				Date: nextDate
			};
		} else {
			return nextMenu;
		}
	},
	async saveMenu(newMenu) {
		let menu;
		try {
			menu = JSON.Parse(fs.readFileSync(path.resolve(__dirname, "memory.json")));
		} catch {
			menu = [];
		}
		const lastMenu = menu[0];
		
		if (lastMenu == undefined || lastMenu.Date < newMenu.Date) {
			menu.shift(newMenu);
		} else {
			menu[0] = newMenu;
		}
		fs.writeFileSync(JSON.stringify(menu, undefined, 4), memory);
	}
}
