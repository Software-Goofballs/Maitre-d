const { SlashCommandBuilder } = require('@discordjs/builders');
const { getMenu, saveMenu } = require('./../menu-memory/menu.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('assign-dish')
		.setDescription('assign a dish to a user')
		.addUserOption(option => option.setName('user').setDescription('Who is bringing the dish>'))
		.addStringOption(option => option.setName('dish').setDescription('Enter a dish')),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const dish = interaction.options.getString('dish');
		let menu = await getMenu();
		
		if (dish == undefined) {
			return interaction.reply(`No dish was provided to sign up for`);
		}
		
		// Only the guy in charge can assign other people dishes
		if (menu.Owner == interaction.user.id || user == undefined || interaction.user.id == user.id) {
			user |= interaction.user;
			menu.Dishes.push({
				Owner: user ? user.id : undefined,
				Food: dish
			});
			await saveMenu(menu);
		} else {
			user |= interaction.user.id;
			return interaction.reply(`You are not authorized to sign <@${user.id}> up to bring ${dish}`);
		}
	},
};
