const { Command, CommandoMessage } = require("discord.js-commando");
const { UserNotInVoiceChannel, BotAlreadyInVoiceChannel } = require('../../error.json')

module.exports = class JoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            aliases: ['j'],
            group: 'music',
            memberName: 'join',
            description: 'Ajoute le bot au salon vocal'
        });
    }

    /**
     * 
     * @param {CommandoMessage} message
     * @param {String} query
     */
    async run(message) {
        const voiceChannel = message.member.voice.channel;
        const server = message.client.server;
        console.log(voiceChannel);
        if (!voiceChannel) {
            return message.say(UserNotInVoiceChannel);
        }
        if  (message.client.voice.connections.first()) {
            return message.say(BotAlreadyInVoiceChannel);
        }
        server.currentVideo[voiceChannel.id] = {title: "", url: ""};
        server.queue[voiceChannel.id] = [];
        await voiceChannel.join();
    }
}