const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server."),
  async execute(interaction) {
    console.log('Interaction:', interaction);
    if (!interaction || !interaction.options) {
      console.error("Interaction or interaction options are undefined.");
      return;
    }

    const guild = interaction.guild;

    // Calculate various server information
    const memberCount = guild.memberCount;
    const textChannels = guild.channels.cache.filter(
      (channel) => channel.type === "TextChannel"
    ).size;
    const voiceChannels = guild.channels.cache.filter(
      (channel) => channel.type === "VoiceChannel"
    ).size;
    const createdTimestamp = guild.createdTimestamp;
    const createdAt = new Date(createdTimestamp).toLocaleString();

    const serverEmbed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle(`Server Information for ${guild.name}`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        {
          name: "Server Name",
          value: guild.name,
          inline: true,
        },
        {
          name: "Server ID",
          value: guild.id,
          inline: true,
        },
        {
          name: "Text Channel Count",
          value: textChannels.toString(),
          inline: true,
        },
        {
          name: "Voice Channel Count",
          value: voiceChannels.toString(),
          inline: true,
        },
        {
          name: "Created At",
          value: createdAt,
          inline: true,
        }
      );

    await interaction.reply({
      embeds: [serverEmbed],
      ephemeral: true,
    });
  },
};
