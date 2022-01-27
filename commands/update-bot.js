const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('update-bot')
		.setDescription('Update the bot after a PR'),
	async execute(interaction) {	
		await interaction.reply("Bot updating, please wait...");
		await process.exit();
	},
};
