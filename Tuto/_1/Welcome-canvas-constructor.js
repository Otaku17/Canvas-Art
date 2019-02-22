'use strict';

const { Canvas } = require('canvas-constructor');
const axios = require('axios');

exports.run = async(client, message) => {

    function buffer(data) {
        return axios.get(data, {
            responseType: 'arraybuffer'
        })
        .then((res) => res.data)
        .catch(err => console.log(err));
    }

    async function Welcome(data) {
        return new Canvas(400, 200)
        .save()
        .setColor('#303030') 
        .addRect(0, 0, 400, 200)
        .setColor('white') 
        .addCircle(195, 84, 68) 
        .addRoundImage(await buffer(data.displayAvatarURL), 131, 20, 128, 128, 64)
        .restore()
        .setColor('white')
        .setTextAlign("center")
        .setTextFont("bold 16pt sans serif ")
        .addResponsiveText(`Welcome to ${data.tag}`, 200, 184, 375)
        .toBuffer();
    }
    
    message.channel.send({
        files: [{
            attachment: await Welcome(message.author),
            name: "welcome.png"
        }]
    });
};

exports.help = {
  name: "welcome",
  category: "utility",
  description: "Génére votre welcome.",
  usage: "welcome"
};
