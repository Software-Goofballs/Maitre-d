const { dayOfPlay } = require("./../config.json");
const fs = require('fs');
const path = require('path');
const memory = path.resolve(__dirname, "memory.json");
const ideas = path.resolve(__dirname, "meal-ideas.json");

const loadMenuData = async () => {
	try {
		return JSON.parse(fs.readFileSync(memory));
	} catch (e) {
		return [];
	}
}

const getNextDayOfWeek = () => {
	var resultDate = new Date();
	resultDate.setDate(resultDate.getDate() + (6 + dayOfPlay - resultDate.getDay()) % 7);
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
				Dishes: {},
				Date: nextDate
			};
		} else {
			return nextMenu;
		}
	},
	async saveMenu(newMenu) {
		let menu = await loadMenuData();
		const lastMenu = menu[0];
		
		if (lastMenu == undefined || lastMenu.Date < newMenu.Date) {
			menu.unshift(newMenu);
		} else {
			menu[0] = newMenu;
		}
		fs.writeFileSync(memory, JSON.stringify(menu, undefined, 4));
		
		// Save off the Menu as ideas for the future
		let oldIdeas = JSON.parse(fs.readFileSync(ideas));
		if (newMenu.Main != "" && !oldIdeas.includes(newMenu.Main)) {
			fs.writeFileSync(ideas, JSON.stringify(oldIdeas, undefined, 4));
		}
	},
	async loadOldMenus() {
		const menu = await loadMenuData();
		var today = new Date();
		today = today.toISOString().split('T')[0];
		return menu.filter(x => x.Date < today);
	}
}
