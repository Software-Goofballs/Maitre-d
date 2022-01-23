const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mia')
		.setDescription('Decree that you will skip the next meal'),
	async execute(interaction) {	
		return interaction.reply(`ToDo: <@${interaction.user.id}> will not be eating dinner this week`);
	},
};
