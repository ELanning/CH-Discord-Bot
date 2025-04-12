const { EmbedBuilder } = require('discord.js');

const defaultDlEmbed = new EmbedBuilder()
	.setColor(0x4e4e4e)
	.setTitle('Dragonlord:')
	.addFields(
		{ name: 'Bubbaguh(180)', value: 'unset', inline: true },
		{ name: 'Grendel(170)', value: 'unset', inline: true },
		{ name: 'Norman(165)', value: 'unset', inline: true },
		{ name: 'Derpy(160)', value: 'unset', inline: true },
	);

const defaultEdlEmbed = new EmbedBuilder()
	.setColor(0x4e4e4e)
	.setTitle('Exalted Dragonlord:')
	.addFields(
		{ name: 'Doggy(180)', value: 'unset', inline: true },
		{ name: 'MrPickles(190)', value: 'unset', inline: true },
		{ name: 'Guh(195)', value: 'unset', inline: true },
		{ name: 'Ratrat(200)', value: 'unset', inline: true },
		{ name: 'MissPickles(205)', value: 'unset', inline: true },
		{ name: 'Sleepy(210)', value: 'unset', inline: true },
		{ name: 'MissPringles(215)', value: 'unset', inline: true },
	);

const defaultHeliEmbed = new EmbedBuilder()
	.setColor(0x4e4e4e)
	.setTitle('Heliants:')
	.addFields(
		{ name: 'Heli(prot)', value: 'unset', inline: true },
		{ name: 'Heli(hall)', value: 'unset', inline: true },
		{ name: 'Heli(eye)', value: 'unset', inline: true },
		{ name: 'Heli(gele)', value: 'unset', inline: true },
	);

const defaultEgEmbed = new EmbedBuilder()
	.setColor(0x4e4e4e)
	.setTitle('End Game:')
	.setDescription('Timers for when spawn windows open:')
	.addFields(
		{ name: 'Mocha', value: 'unset', inline: true },
		{ name: 'Latte', value: 'unset', inline: true },
		{ name: 'Kuromi', value: 'unset', inline: true },
		{ name: 'Pompompurin', value: 'unset', inline: true },
		{ name: 'Kanye', value: 'unset', inline: true },
		{ name: 'BigYOSHI', value: 'unset', inline: true },
		{ name: 'MrPlantPlant', value: 'unset', inline: true },
		{ name: 'Milo', value: 'unset', inline: true },
	);


let embedMessage = null;
let dlEmbed = null;
let edlEmbed = null;
let heliEmbed = null;
let egEmebed = null;

const createEmbeds = async (channel) => {
	await channel.messages.fetch({ limit: 1 }).then(messages => {
		if (messages.size > 0) {
			messages.forEach(msg => {
				embedMessage = msg;
				dlEmbed = msg.embeds[0];
				edlEmbed = msg.embeds[1];
				heliEmbed = msg.embeds[2];
				egEmebed = msg.embeds[3];
			});

			channel.send({ embeds: [dlEmbed, edlEmbed, heliEmbed, egEmebed] })
		}
		else {
			channel.send({ embeds: [defaultDlEmbed, defaultEdlEmbed, defaultHeliEmbed, defaultEgEmbed] })
		}
	});
};

const editEmbeds = async (channel, bossName, newTime) => {
	// Fetch and set the embeds if they are currently null
	await channel.messages.fetch({ limit: 1 }).then(messages => {

		messages.forEach(msg => {
			embedMessage = msg;
			dlEmbed = msg.embeds[0];
			edlEmbed = msg.embeds[1];
			heliEmbed = msg.embeds[2];
			egEmebed = msg.embeds[3];
		});

		embedMessage.embeds.forEach(embed => {
			let bossField = embed.fields.find(field => field.name === `${bossName}`)
			if (bossField) {
				bossField.value = `<t:${newTime}:R>`;
			}
		})
		embedMessage.edit({ embeds: [dlEmbed, edlEmbed, heliEmbed, egEmebed] })
	})
}

const clearEmbeds = async (channel) => {
	await channel.messages.fetch({ limit: 1 }).then(messages => {

		messages.forEach(msg => {
			embedMessage = msg;
			dlEmbed = msg.embeds[0];
			edlEmbed = msg.embeds[1];
			heliEmbed = msg.embeds[2];
			egEmebed = msg.embeds[3];
		});

		embedMessage.embeds.forEach(embed => {
			embed.fields.forEach(field => {
				field.value = 'unset';
			})
		});

		embedMessage.edit({ embeds: [dlEmbed, edlEmbed, heliEmbed, egEmebed] })
	})
}

const clearSingleEmbed = async (channel, bossName) => {
	await channel.messages.fetch({ limit: 1 }).then(messages => {

		messages.forEach(msg => {
			embedMessage = msg;
			dlEmbed = msg.embeds[0];
			edlEmbed = msg.embeds[1];
			heliEmbed = msg.embeds[2];
			egEmebed = msg.embeds[3];
		});

		embedMessage.embeds.forEach(embed => {
			let bossField = embed.fields.find(field => field.name === `${bossName}`)
			if (bossField) {
				bossField.value = `unset`;
			}
		})
		embedMessage.edit({ embeds: [dlEmbed, edlEmbed, heliEmbed, egEmebed] })
	})
}

module.exports = { createEmbeds, editEmbeds, clearEmbeds, clearSingleEmbed };