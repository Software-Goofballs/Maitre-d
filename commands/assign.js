const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('assign')
		.setDescription('assign a dish to a user')
		.addUserOption(option => option.setName('user').setDescription('Who ya chirping at?'))
		.addStringOption(option => option.setName('dish').setDescription('Enter a dish or dishes')),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const dish = interaction.options.getString('dish');
		return interaction.reply(`ToDo Assign <@${user.id}> to bring ${dish}`);
	},
};
