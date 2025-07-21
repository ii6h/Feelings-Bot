const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// ✏️ عدّل هنا:
const TARGET_CHANNEL_ID = '1396597892252307456'; //الشات  ID 
const CUSTOM_EMOJI_ID = '1396598971354447923';   //الإيموجي المخصص ID 

client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  // 🟣 حالة البوت: Streaming + مشغول
  client.user.setPresence({
    activities: [{
      name: 'رٌوح',
      type: 1, // Streaming
      url: 'https://twitch.tv/fakechannel' // لازم تحط رابط تويتش (حتى لو وهمي)
    }],
    status: 'dnd', // "dnd" = مشغول
  });
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || message.channel.id !== TARGET_CHANNEL_ID) return;

  try {
    const avatarURL = message.author.displayAvatarURL({ extension: 'png', size: 128 });

    const sentAt = new Date(message.createdTimestamp);
    const formattedTimestamp = sentAt.toLocaleString('en-GB', {
      timeZone: 'Asia/Riyadh',
      hour12: true,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', ' |');

    const embed = new EmbedBuilder()
      .setDescription(message.content || '[محتوى فارغ]')
      .setAuthor({
        name: message.member?.displayName || message.author.username,
      })
      .setThumbnail(avatarURL)
      .setFooter({ text: `📅 ${formattedTimestamp}` })
      .setColor(0x000000); // أسود

    const sentMessage = await message.channel.send({ embeds: [embed] });

    const emoji = client.emojis.cache.get(CUSTOM_EMOJI_ID);
    if (emoji) {
      await sentMessage.react(emoji);
    }

    await message.delete();
  } catch (err) {
    console.error('❌ خطأ أثناء المعالجة:', err);
  }
});

// 🔐 شغّل البوت بتوكنك هنا:
client.login('توكن البوت هنا');
