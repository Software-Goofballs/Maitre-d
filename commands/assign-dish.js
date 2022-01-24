const { SlashCommandBuilder } = require('@discordjs/builders');
const { getMenu, saveMenu } = require('./../menu-memory/menu.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('assign-dish')
		.setDescription('assign a dish to a user')
		.addUserOption(option => option.setName('user').setDescription('Who is bringing the dish>'))
		.addStringOption(option => option.setName('dish').setDescription('Enter a dish')),
	async execute(interaction) {
		let user = interaction.options.getUser('user');
		const dish = interaction.options.getString('dish');
		let menu = await getMenu();
		
		if (dish == undefined) {
			return interaction.reply(`No dish was provided to sign up for`);
		}
		
		if (menu.Dishes[dish] != undefined && menu.Dishes[dish] != "") {
			return interaction.reply(`${dish} is already being brought by <@${menu.Dishes[dish]}>`)
		}
		
		// Only the guy in charge can assign other people dishes
		if (menu.Owner == interaction.user.id || user == undefined || interaction.user.id == user.id) {
			if (user == undefined && menu.Owner != interaction.user.id) {
				user = interaction.user;
			}
			menu.Dishes[dish] = user == undefined ? "" : user.id
			await saveMenu(menu);
			return interaction.reply(`Added ${dish} to menu`)
		} else {
			return interaction.reply(`You are not authorized to sign <@${user.id}> up to bring ${dish}`);
		}
	},
};
