const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('plan')
		.setDescription('Plan that we are going to eat')
		.addStringOption(option => option.setName('main').setDescription('Enter the main course')),
	async execute(interaction) {	
		return interaction.reply("Unimplemented");
	},
};
