const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('assign')
		.setDescription('assign a dish to a user')
		.addUserOption(option => option.setName('user').setDescription('Who ya chirping at?'))
		.addStringOption(option => option.setName('dish').setDescription('Enter a dish or dishes')),
	async execute(interaction) {	
		return interaction.reply("Unimplemented");
	},
};
