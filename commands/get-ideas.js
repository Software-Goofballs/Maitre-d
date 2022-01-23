const { SlashCommandBuilder } = require('@discordjs/builders');

const meals = [
	"Mexican",
	"Pizza",
	"Chili",
	"Nachos",
	"Pulled Pork",
	"Breakfast"
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get-ideas')
		.setDescription('Have the bot pitch some meal ideas'),
	async execute(interaction) {
		let randoIdea = meals[Math.floor(Math.random() * meals.length)]
		
		return interaction.reply(`How about ${randoIdea} for dinner?`);
	},
};