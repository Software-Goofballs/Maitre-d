const { SlashCommandBuilder } = require('@discordjs/builders');
const { getMenu, saveMenu } = require('./../menu-memory/menu.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('assign-dish')
		.setDescription('assign a dish to a user')
		.addStringOption(option => option.setName('dish').setDescription('Enter a dish').setRequired(true))
		.addUserOption(option => option.setName('user').setDescription('Who is bringing the dish?'))
		.addStringOption(option => option.setName('quantity').setDescription('How many?'))
		.addBooleanOption(option => option.setName('delete').setDescription('Delete this dish')),
	async execute(interaction) {
		let user = interaction.options.getUser('user');
		const dish = interaction.options.getString('dish');
		const quantity = interaction.options.getString('quantity');
		const deleteDish = interaction.options.getBoolean('delete');
		let menu = await getMenu();
		
		let reply = [];
		
		if (deleteDish) {
			let newDish = menu.Dishes[dish];
			if (menu.Owner == interaction.user.id || newDish.Owner == undefined || (user != undefined && newDish.Owner == user.id)) {
				delete menu.Dishes[dish];
				await saveMenu(menu);
				reply.push(`${dish} removed from menu`)
			} else {
				reply.push(`You cannot remove ${dish} from menu`)
			}
		} else {
			// Deep copy the dish if it exists or just make an empty one
			let newDish = menu.Dishes[dish] ? JSON.parse(JSON.stringify(menu.Dishes[dish])) : undefined;
			if (newDish == undefined) {
				newDish = {};
				reply.push(`Added ${dish} to the menu`)
			}
			
			// Assigning user and if it is self or done by owner
			if (user != undefined) {
				if (menu.Owner == interaction.user.id || interaction.user.id == user.id) {
					newDish.Owner = user.id;
					reply.push(`<@${user.id}> assigned to bring ${dish}`)
				} else {
					reply.push("You cannot assign other people dishes")
				}
			}
			
			// Assigning quantity and it is unowned, my dish, or done by owner
			if (quantity != undefined) {
				if (menu.Owner == interaction.user.id || newDish.Owner == undefined || newDish.Owner == user.id) {
					newDish.Quantity = quantity;
					reply.push(`Quantity of ${dish} set to ${quantity}`)
				} else {
					reply.push("You cannot assign change the quantity of ${dish}")
				}
			}
			
			menu.Dishes[dish] = newDish;
			await saveMenu(menu);
		}
		
		return interaction.reply(reply.join('\n'));
	},
};
