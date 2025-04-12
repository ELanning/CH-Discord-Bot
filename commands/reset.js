const { SlashCommandBuilder } = require('discord.js');
const { editEmbeds } = require('../controllers/manageEmbed.js');
const { createTimer } = require('../controllers/manageAlerts.js');
const { timerChannel, alertChannel, resetChannel } = require('../config.json');
const bosses = require('../bosses.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reset')
        .setDescription('Resets a single bosses timer')
        .addStringOption(option =>
            option.setName('boss')
                .setDescription('The boss timer to reset')
                .setRequired(true)
                .addChoices(
                    { name: 'Bubbaguh(180)', value: 'Bubbaguh(180)' },
                    { name: 'Grendel(170)', value: 'Grendel(170)' },
                    { name: 'Norman(165)', value: 'Norman(165)' },
                    { name: 'Derpy(160)', value: 'Derpy(160)' },
                    { name: 'Doggy(180)', value: 'Doggy(180)' },
                    { name: 'MrPickles(190)', value: 'MrPickles(190)' },
                    { name: 'Guh(195)', value: 'Guh(195)' },
                    { name: 'Ratrat(200)', value: 'Ratrat(200)' },
                    { name: 'MissPickles(205)', value: 'MissPickles(205)' },
                    { name: 'Sleepy(210)', value: 'Sleepy(210)' },
                    { name: 'MissPringles(215)', value: 'MissPringles(215)' },
                    { name: 'Heli(prot)', value: 'Heli(prot)' },
                    { name: 'Heli(hall)', value: 'Heli(hall)' },
                    { name: 'Heli(eye)', value: 'Heli(eye)' },
                    { name: 'Heli(gele)', value: 'Heli(gele)' },
                    { name: 'Mocha', value: 'Mocha' },
                    { name: 'Latte', value: 'Latte' },
                    { name: 'Kuromi', value: 'Kuromi' },
                    { name: 'Pompompurin', value: 'Pompompurin' },
                    { name: 'Kanye', value: 'Kanye' },
                    { name: 'BigYOSHI', value: 'BigYOSHI' },
                    { name: 'MrPlantPlant', value: 'MrPlantPlant' },
                    { name: 'Milo', value: 'Milo' },
                )),
    async execute(interaction) {
        if (interaction.channelId == resetChannel) {
            let bossName = interaction.options.getString('boss');

            let unixBossTime = Math.floor(Date.now() / 1000) + (bosses[bossName][0] * 60);

            editEmbeds(interaction.client.channels.cache.get(timerChannel), bossName, unixBossTime);
            createTimer(interaction.client.channels.cache.get(alertChannel), bossName, bosses[bossName][0] * (60 * 1000));

            await interaction.reply(`${bossName} timer reset!`);
            console.log(`CommandLogger: ${interaction.commandName}: ${bossName}, run by ${interaction.user.username} in ${interaction.channelId} at ${interaction.createdAt}`);
        }
        else {
            await interaction.deferReply({ ephemeral: true })
            await interaction.deleteReply();
        }
    }
};