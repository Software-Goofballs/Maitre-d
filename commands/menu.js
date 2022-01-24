const { SlashCommandBuilder } = require('@discordjs/builders');
const { getMenu } = require('./../menu-memory/menu.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('menu')
		.setDescription('Get the current plan for dinner'),
	async execute(interaction) {
		const menu = await getMenu();
		let reply = `<@${menu.Owner}> has planned ${menu.Main} for dinner`;
		if (menu.Dishes.length) {
			reply += `\n\nDishes:\n` + menu.Dishes.map(dish => {
				dishStr = dish.Food;
				if (dish.Owner) {
					dishStr += ` brought by <@${dish.Owner}>`
				}
			}).join('\n')
		}
		return interaction.reply(reply);
	},
};
