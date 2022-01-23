const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Get the current plan for dinner'),
	async execute(interaction) {	
		return interaction.reply("ToDo: Print the plan for dinner");
	},
};
