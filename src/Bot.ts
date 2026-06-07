import { Client, GatewayIntentBits, PermissionsBitField } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ] 
});

client.once('ready', () => {
    console.log(`Bot online! Logado como: ${client.user?.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith('!')) return;

    const args = message.content.slice(1).split(/ +/);
    const command = args.shift()?.toLowerCase();

    // COMANDO PING
    if (command === 'ping') {
        message.reply('🏓 Pong! O bot está online.');
    }

    // COMANDO BANIR
    if (command === 'ban') {
        if (!message.member?.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.reply('Você não tem permissão!');
        const user = message.mentions.members?.first();
        if (user) {
            await user.ban();
            message.reply(`Usuário ${user.user.tag} foi banido!`);
        } else {
            message.reply('Marque alguém para banir!');
        }
    }

    // COMANDO KICK (EXPULSAR)
    if (command === 'kick') {
        if (!message.member?.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.reply('Você não tem permissão!');
        const user = message.mentions.members?.first();
        if (user) {
            await user.kick();
            message.reply(`Usuário ${user.user.tag} foi expulso!`);
        } else {
            message.reply('Marque alguém para expulsar!');
        }
    }

    // COMANDO LIMPAR CHAT (PURGE)
    if (command === 'limpar') {
        if (!message.member?.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply('Você não tem permissão!');
        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount < 1 || amount > 100) return message.reply('Escolha um número entre 1 e 100.');
        await message.channel.bulkDelete(amount, true);
        message.reply(`Apaguei ${amount} mensagens!`).then(m => setTimeout(() => m.delete(), 3000));
    }

    // COMANDO AVISAR (MUTE/TIMEOUT)
    if (command === 'timeout') {
        const user = message.mentions.members?.first();
        if (user) {
            await user.timeout(60 * 1000, 'Castigo'); // 1 minuto
            message.reply(`${user.user.tag} foi colocado de castigo por 1 minuto!`);
        }
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);


