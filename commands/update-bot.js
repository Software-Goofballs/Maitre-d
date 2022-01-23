const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('update-bot')
		.setDescription('U[date the bot after a PR'),
	async execute(interaction) {	
		return interaction.reply("Unimplemented");
	},
};
