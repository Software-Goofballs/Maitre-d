const { SlashCommandBuilder } = require('@discordjs/builders');
const { getMenu } = require('./../menu-memory/menu.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('menu')
		.setDescription('Get the current plan for dinner'),
	async execute(interaction) {
		const menu = await getMenu();
		let reply = `<@${menu.Owner}> has planned ${menu.Main} for dinner`;

		if (Object.keys(menu.Dishes).length) {
			reply += `\n\nDishes:\n` + Object.keys(menu.Dishes).map(dish => {
				dishStr = dish;
				if (menu.Dishes[dish]) {
					dishStr += ` brought by <@${menu.Dishes[dish]}>`
				}
				return dishStr;
			}).join('\n')
		}
		return interaction.reply(reply);
	},
};
