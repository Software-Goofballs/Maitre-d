const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cancel')
		.setDescription('Cancel the next meal'),
	async execute(interaction) {	
		return interaction.reply("Unimplemented");
	},
};
