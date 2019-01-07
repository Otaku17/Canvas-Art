'use strict';
exports.run = async(client, message) => {

    function buffer(data) {
        return axios.get(data, {
            responseType: 'arraybuffer'
        })
        .then((res) => res.data)
        .catch(err => console.log(err));
    }

    async function Badge(data) {
        return new Canvas(300, 150)
        .save()
        .setColor('#181A1C')
        .addRect(0, 0, 300, 150)
        .setColor('#23272A')
        .addRect(0, 0, 20, 150)
        .addBeveledRect(100, 25, 195, 6, 5)
        .addBeveledRect(25, 110, 270, 6, 5)
        .addBeveledImage(await buffer(data.displayAvatarURL({
            format: 'png', 
            size: 512
        })), 15, 25, 80, 80, 6)
        .restore()
        .setColor("white")
        .setTextFont('9pt sans serif')
        .addText(`${client.options.totalShardCount} shard`, 105, 55, 115, 20)
        .addText(`${client.guilds.size} guilds`, 105, 75, 115, 20)
        .addText(`${client.users.size} members`, 105, 95, 115, 20)
        .setTextFont('10.5pt sans serif')
        .setTextAlign('center')
        .addResponsiveText(data.username, 150, 20, 285)
        .addResponsiveText('Add a small text', 150, 138, 250, 100)
        .toBuffer();
    }

    message.channel.send({
        files: [{
            attachment: await Badge(client.user),
            name: "badge.png"
        }]
    });
};

exports.help = {
    name: "badge",
    category: "utility",
    description: "Génére un badge du client.",
    usage: "badge"
};
