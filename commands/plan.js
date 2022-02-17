const { SlashCommandBuilder } = require('@discordjs/builders');
const { getMenu, saveMenu } = require('./../menu-memory/menu.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('plan')
		.setDescription('Plan that we are going to eat')
		.addStringOption(option => option.setName('main').setDescription('Enter the main course')),
	async execute(interaction) {
		const dish = interaction.options.getString('main');
		let menu = await getMenu();
		
		if (menu.Owner == interaction.user.id) {
			menu.Main = dish;
			await saveMenu(menu);
			return interaction.reply(`This week we will be serving ${dish}\nAll hail our reigning food overlord <@${menu.Owner}>`);
		} else if (menu.Owner == '') {
			menu.Owner = interaction.user.id;
			menu.Main = dish;
			await saveMenu(menu);
			return interaction.reply(`<@${menu.Owner}> just volunteered to be in charge of serving ${dish}\nThank you for your service`);
		} else {
			return interaction.reply(`Sorry <@${interaction.user.id}>, <@${menu.Owner}> has already volunteered to be in charge of dinner.\nMaybe next week?`);
		}
	},
};
