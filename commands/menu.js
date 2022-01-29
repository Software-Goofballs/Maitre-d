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
				if (menu.Dishes[dish].Quantity) {
					dishStr += ` (${menu.Dishes[dish].Quantity})`
				}
				if (menu.Dishes[dish].Owner) {
					dishStr += ` brought by <@${menu.Dishes[dish].Owner}>`
				}
				return dishStr;
			}).join('\n')
		}
		return interaction.reply(reply);
	},
};
