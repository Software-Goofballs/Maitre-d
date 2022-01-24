const { SlashCommandBuilder } = require('@discordjs/builders');
const { getMenu, saveMenu } = require('./../menu-memory/menu.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volunteer')
		.setDescription('Volunteer yourself for dinner'),
	async execute(interaction) {
		let menu = await getMenu();
		if (menu.Owner == "") {
			menu.Owner = interaction.user.id;
			await saveMenu(menu);
			return interaction.reply(`<@${interaction.user.id}> has volunteered to be in charge of dinner`);
		} else {
			return interaction.reply(`Sorry <@${interaction.user.id}>, <@${menu.Owner}> has already volunteered to be in charge of dinner.\nMaybe next week?`);
		}		
	},
};
