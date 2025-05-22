const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('configurar')
        .setDescription('Configure a loja do bot')
        .addStringOption(option =>
            option.setName('chave')
                .setDescription('O que deseja configurar (shopName, shopDescription, paymentMethods, products)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('valor')
                .setDescription('Novo valor ou dados separados por vírgula')
                .setRequired(true)),

    async execute(interaction) {
        const chave = interaction.options.getString('chave');
        const valor = interaction.options.getString('valor');

        const config = require('../config.json');

        try {
            if (chave === 'paymentMethods' || chave === 'products') {
                config[chave] = valor.split(',').map(item => item.trim());
            } else {
                config[chave] = valor;
            }

            fs.writeFileSync('./config.json', JSON.stringify(config, null, 4));

            await interaction.reply(`✅ Configuração atualizada: **${chave}** -> **${valor}**`);
        } catch (error) {
            console.error(error);
            await interaction.reply('❌ Erro ao atualizar a configuração.');
        }
    }
};
{
  "token": "MTM3MzQxMjEzNzE1Nzc5MTgwNQ.Gpwght.9UECbNLo1HIGa-ajTUoUogD18QcRfhfFHWzm8s",
  "prefix": "/"
}
