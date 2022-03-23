const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');
const memory = path.resolve(__dirname, "./../menu-memory/meal-ideas.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-dinner-idea')
		.setDescription('Add dinner ideas for the bot to pitch')
		.addStringOption(option => option.setName('idea').setDescription('Enter the name of the meal').setRequired(true)),
	async execute(interaction) {
		let meals = JSON.parse(fs.readFileSync(memory));
		let idea = interaction.options.getString('idea');
		meals.push(idea);
		fs.writeFileSync(memory, JSON.stringify(meals, undefined, 4));
		return interaction.reply(`Meal idea added! ${idea}`);
	}
};
