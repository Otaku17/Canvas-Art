'use strict';

const Canvas = require('canvas');
const axios = require('axios');

exports.run = async(client, message) => {

    function buffer(data) {
        return axios.get(data, {
            responseType: 'arraybuffer'
        })
        .then((res) => res.data)
        .catch(err => console.log(err));
    }

    function responsiveText(canvas, text) {
        const SizeCtx = canvas.getContext('2d');
        let fontSize = 18;
        do {
            SizeCtx.font = `bold ${fontSize -= 2}pt sans serif`;
        } while (SizeCtx.measureText(text).width > canvas.width - 15);
        return SizeCtx.font;
    }
    
    async function Welcome(data) {
        const canvas = Canvas.createCanvas(400, 200);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#303030';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = responsiveText(canvas, `Welcome to ${data.tag}`);//responsive text
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(`Welcome to ${data.tag}`, 200, 184);
        ctx.beginPath();
        ctx.arc(195, 84, 68, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(126, 15, 140, 140);
        ctx.beginPath();
        ctx.arc(195, 84, 64, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(await Canvas.loadImage(await buffer(data.displayAvatarURL)), 131, 20, 128, 128);
        return canvas.toBuffer();
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
