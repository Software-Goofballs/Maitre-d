const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('update-bot')
		.setDescription('Update the bot after a PR'),
	async execute(interaction) {	
		return interaction.reply("ToDo: Kill the bot and let PM2 pull and restart it");
	},
};
