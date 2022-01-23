const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volunteer')
		.setDescription('Volunteer yourself for dinner'),
	async execute(interaction) {	
		return interaction.reply(`ToDo: <@${interaction.user.id}> has volunteerer to be in charge of dinner`);
	},
};
