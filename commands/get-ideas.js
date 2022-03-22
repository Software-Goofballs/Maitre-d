const { SlashCommandBuilder } = require('@discordjs/builders');
const { loadOldMenus } = require('./../menu-memory/menu.js');
const memory = path.resolve(__dirname, "./../menu-memory/meal-ideas.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get-ideas')
		.setDescription('Have the bot pitch some meal ideas'),
	async execute(interaction) {
		const meals = JSON.parse(fs.readFileSync(memory));
		const shuffled = meals.sort(() => 0.5 - Math.random());
		let selected = shuffled.slice(0, 3);
		
		return interaction.reply(`How about ${selected.join(" or ")} for dinner?`);
	},
};
