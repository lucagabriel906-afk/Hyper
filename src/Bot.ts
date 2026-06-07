// No seu arquivo bot.ts
client.on('messageCreate', async (message) => {
    // 1. O bot não responde a si mesmo
    if (message.author.bot) return;

    // 2. Verifica se a mensagem começa com '!'
    if (message.content.startsWith('!')) {
        const args = message.content.slice(1).split(/ +/);
        const command = args.shift()?.toLowerCase();

        // 3. Lógica dos comandos
        if (command === 'ping') {
            message.reply('Pong! 🏓');
        }

        if (command === 'ajuda') {
            message.reply('Meus comandos são: !ping, !ajuda, !info');
        }
        
        if (command === 'info') {
            message.reply('Sou um bot criado para gerenciar este servidor!');
        }
    }
});

