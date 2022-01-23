const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('voluntell')
		.setDescription('Assign a load balanced dinner planer'),
	async execute(interaction) {	
		return interaction.reply("ToDo: Check the last 2 meals and assign someone who was not those people");
	},
};
