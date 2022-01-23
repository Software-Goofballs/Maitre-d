const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Get the surrent plan for dinner'),
	async execute(interaction) {	
		return interaction.reply("Unimplemented");
	},
};
