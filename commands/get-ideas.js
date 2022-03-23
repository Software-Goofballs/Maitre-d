const { SlashCommandBuilder } = require('@discordjs/builders');
const { loadOldMenus } = require('./../menu-memory/menu.js');
const fs = require('fs');
const path = require('path');
const memory = path.resolve(__dirname, "./../menu-memory/meal-ideas.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get-ideas')
		.setDescription('Have the bot pitch some meal ideas')
		.addNumberOption(option => option.setName('number-of-ideas').setDescription('How many ideas do you need?'))
		.addNumberOption(option => option.setName('number-of-past-meals-to-skip').setDescription('How many meals in the past do you not want to repeat?')),
	async execute(interaction) {
		const numIdeas = interaction.options.getNumber('number-of-ideas');
		const numToSkip = interaction.options.getNumber('number-of-past-meals-to-skip');
		
		const meals = JSON.parse(fs.readFileSync(memory));
		const oldMenu = await loadOldMenus();
		
		const lastXSessions = oldMenu.map(x => x.Main).slice(0, numIdeas ? numIdeas : 3);
		const shuffled = meals.filter(x => !lastXSessions.includes(x))
			.sort(() => 0.5 - Math.random());
		let selected = shuffled.slice(0, numIdeas ? numIdeas : 3);
		
		return interaction.reply(`How about ${selected.join(" or ")} for dinner?`);
	},
};
