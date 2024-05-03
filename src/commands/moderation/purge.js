const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Purge the channel")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of messages to delete")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
    ) {
      return await interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }

    const amount = interaction.options.getInteger("amount");
    if (amount < 1 || amount > 100) {
      return await interaction.reply({
        content: "The amount must be between 1 and 100.",
        ephemeral: true,
      });
    }

    try {
      const fetched = await interaction.channel.messages.fetch({
        limit: amount,
      });
      await interaction.channel.bulkDelete(fetched);

      const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(`Purged ${amount} messages.`);
      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error("error:", error);
      await interaction.reply({
        content:
          "There was an error while executing this command! Please persist a developer to fix this problem.",
        ephemeral: true,
      });
    }
  },
};
