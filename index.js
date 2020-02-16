const { Client, RichEmbed, Collection } = require('discord.js');
const Discord = require('discord.js');
const client = new Client();
const math = require('mathjs');
const http = require('http')

const dotenv = require('dotenv');
dotenv.config();

const token = process.env.BOT_TOKEN;


client.login(token);

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World!');
  res.end();
}).listen(process.env.PORT || 6000);

function statisztika() {
  let myGuild = client.guilds.get('676410094715535401')
  let members = myGuild.members;
  let tier3Count = 0;
  let tier2Count = 0;
  let tier1Count = 0;
  let bemelegitoCount = 0;
  let cupCount = 0;
  members.forEach(member => {
    member.roles.forEach(role => {
      if (role.name === 'Tier 3')
        tier3Count++
      if (role.name === 'Tier 2')
        tier2Count++
      if (role.name === 'Tier 1')
        tier1Count++
      if (role.name === 'bemelegitő')
        bemelegitoCount++
      if (role.name === 'cup player')
        cupCount++
    })
  })

  let memberCount = myGuild.memberCount
  console.log(memberCount);
  myGuild.channels.forEach(channel => console.log(channel.id))
  let memberCountChannel = myGuild.channels.get('677236905926197258');
  memberCountChannel.setName('Tagok: ' + memberCount)
    .then(result => console.log(' '))
    .catch(error => console.log(error));

  const szoveg = 'botSzobatagok' + tier3Count
  console.log('botSzobatagok' + tier3Count)
  let botSzoba = myGuild.channels.get('677237327466070094');
  botSzoba.setName('Tier3: ' + tier3Count)
    .then(result => console.log(' '))
    .catch(error => console.log(error));

  let tier2Szoba = myGuild.channels.get('677237773366722570');
  tier2Szoba.setName('Tier2: ' + tier2Count)
    .then(result => console.log(' '))
    .catch(error => console.log(error));

  let tier1Szoba = myGuild.channels.get('677238068625014815');
  tier1Szoba.setName('Tier1: ' + tier1Count)
    .then(result => console.log(' '))
    .catch(error => console.log(error));

  let bemelegitok = myGuild.channels.get('677882333185179648');
  bemelegitok.setName('Bemelegítők: ' + bemelegitoCount)
    .then(result => console.log(' '))
    .catch(error => console.log(error));

    let cup = myGuild.channels.get('678583005521903659');
  cup.setName('Cup: ' + cupCount)
}

client.on('ready', () => {
  statisztika()
  console.log(`Logged in as ${client.user.tag}!`)
  Erastatisztika()
})

client.on('message', message => {
  if (message.content === 'xhow to embedx') {
    const embed = new RichEmbed()
      .setTitle('1.Mindenki egyenrangú, mindenkit ugyan úgy kezelünk. Bárki aki nem a tudása legjava alapján játszik, fölöslegesen griefeli el másik játékát vagy ész nélkül W-zik az figyelmeztetés nélkül kitiltásban részesül, amit nem fogunk feloldani.')
      .setColor(0xFF0000);
    const embed2 = new RichEmbed()
      .setTitle('2. Aki szidja a másikat chaten, vagy privátban az rögtön kap egy "warning" rolet ami egy hétig lesz rajtad. Ha ez idő alatt ez még egyszer előfordul, ugyan úgy ban a következménye.')
      .setColor(0xFF0000);
    const embed3 = new RichEmbed()
      .setTitle('3. A szerveren nem híresztelhettek semmilyen öncélú dolgot. Se twittert, twitchet, csapatot, klánt, SEMMIT. Ha ezt megszeged, ugyan úgy "Warning" rolet kapsz.')
      .setColor(0xFF0000);
    const embed4 = new RichEmbed()
      .setTitle('4. A szabályok nem ismerete nem mentesít a következmények alól!')
      .setColor(0xFF0000);
    const embed5 = new RichEmbed()
      .setTitle('5.Akit streamsnipeon kapnak, azt bannolni fogjuk.')
      .setColor(0xFF0000);
    const embed6 = new RichEmbed()
      .setTitle('6.A kód leakelése bármilyen felületen tilos. Aki leakeli, búcsúzik a szervertől.')
      .setColor(0xFF0000);
    const embed7 = new RichEmbed()
      .setTitle('7.Feljebb jutott tierekben, ha valaki duót vált és a duótársa alacsonyabb tierben játszik, akkor az alacsonyabb szinten lévő tieren kell folytatni a játékokat.')
      .setColor(0xFF0000);
    const embed8 = new RichEmbed()
      .setTitle('8.Játékosok, akik jelentkeztek a versenyekre, csak magyar duótárssal vehetnek részt.')
      .setColor(0xFF0000);




    message.channel.send(embed);
    message.channel.send(embed2);
    message.channel.send(embed3);
    message.channel.send(embed4);
    message.channel.send(embed5);
    message.channel.send(embed6);
    message.channel.send(embed7);
    message.channel.send(embed8);


  }
  if (message.content === 'Era a legjobb!') {
    message.reply('Jogi!')
  }
  if (message.content === 'Sweet a legjobb!') {
    message.reply('Jogi!')
  }
  if (message.content === 'Acél a legjobb!') {
    message.reply('Jogi!')
  }
  if (message.content === 'XD?') {
    message.reply('XD!')
  }
  if (message.content === 'jogi?') {
    message.reply('jogi!')
  }
  if (message.content === 'jogi ?') {
    message.reply('jogi!')
  }
  if (message.content.substring(0, 5) === '!calc') {

    let muvelet = message.content.substring(6, message.content.length);
    let resp
    try {
      resp = math.evaluate(muvelet)
    } catch (e) {
      console.log(e.message)
      return message.channel.send('Please enter a valid calculation.')

    }
    message.channel.send(resp.toString())
  }
})

client.on('guildMemberAdd', member => {
  console.log('valaki belep')
  Tagokat_szamlal('676410094715535401', '677236905926197258')
  Tagokat_szamlal('678202121237299211', '678213669364170764')
});


client.on('guildMemberRemove', member => {
  Tagokat_szamlal('676410094715535401', '677236905926197258')
  Tagokat_szamlal('678202121237299211', '678213669364170764')
});

client.on('guildMemberUpdate', member => {
  console.log('valaki updatel')

  statisztika()
  Erastatisztika()
});

client.on('guildMemberAdd', member => {
  console.log('valaki belep')


  if (member.guild.id === '678202121237299211') {
    console.log('xd ' + member.displayName + ' belepett a ' + member.guild.name + ' szerverre')
    member.sendMessage('https://cdn.discordapp.com/attachments/481589429895561216/677971430821986305/unknown.png szeretlek ' + member.displayName)
  }

  //const channel = member.guild.channels.find(ch => ch.name === 'welcome1');
  //if (!channel) return;
  //channel.send(`Welcome to the server, ${member}`);

})

const Tagokat_szamlal = (serverId, roomId) => {
  let myGuild = client.guilds.get(serverId);
  let memberCount = myGuild.memberCount
  let memberCountChannel = myGuild.channels.get(roomId);
  memberCountChannel.setName('Tagok: ' + memberCount)
    .then(result => console.log(' '))
    .catch(error => console.log(error));
}

const Erastatisztika = function () {
  let myGuild = client.guilds.get('678202121237299211')
  let members = myGuild.members;
  let susuCount = 0;
  members.forEach(member => {
    console.log(member.displayName)
    member.roles.forEach(role => {
      console.log(role.name) 
      if (role.name === 'Süsü')
        susuCount++

    })


  })
  let memberCount = myGuild.memberCount
  let tagok = myGuild.channels.get('678213669364170764');
  tagok.setName('Tagok: ' + memberCount);

  let susuk = myGuild.channels.get('678240102954041354');
  susuk.setName('Süsük: ' + susuCount);
}