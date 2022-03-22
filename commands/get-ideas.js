const { SlashCommandBuilder } = require('@discordjs/builders');
const { loadOldMenus } = require('./../menu-memory/menu.js');
const memory = path.resolve(__dirname, "./../menu-memory/meal-ideas.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get-ideas')
		.setDescription('Have the bot pitch some meal ideas'),
	async execute(interaction) {
		const meals = JSON.parse(fs.readFileSync(memory));
		let randoIdea = meals[Math.floor(Math.random() * meals.length)]
		
		return interaction.reply(`How about ${randoIdea} for dinner?`);
	},
};
