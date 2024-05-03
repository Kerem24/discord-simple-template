const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  cooldown: 2,
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to get information about.")
        .setRequired(false)
    ),
  async execute(interaction) {
    let theUser = interaction.options.getUser("user");
    if (!theUser) {
      theUser = interaction.user;
    } else {
      theUser = await interaction.client.users.fetch(theUser);
    }

    const member = await interaction.guild.members.fetch(theUser);
    const roles = member.roles.cache.map((role) => `<@&${role.id}>`).join(", ");

    const embed = new EmbedBuilder()
      .setTitle(`${theUser.username}'s info`)
      .setColor("Green")
      .setImage(theUser.displayAvatarURL({ dynamic: true, size: 256 }))
      .addFields(
        {
          name: "Username",
          value: theUser.username,
          inline: true,
        },
        {
          name: "ID",
          value: theUser.id,
          inline: true,
        },
        {
          name: "Roles",
          value: roles || "None",
          inline: true,
        }
      );
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
