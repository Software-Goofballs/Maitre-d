const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('voluntell')
		.setDescription('Assign a load balanced dinner planer'),
	async execute(interaction) {	
		return interaction.reply("Unimplemented");
	},
};
