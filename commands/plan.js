const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('plan')
		.setDescription('Plan that we are going to eat')
		.addStringOption(option => option.setName('main').setDescription('Enter the main course')),
	async execute(interaction) {
		const dish = interaction.options.getString('main');
		return interaction.reply("ToDo: The main dish will be ${dish}");
	},
};
