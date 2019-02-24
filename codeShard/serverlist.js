"use strict";

module.exports.run = async(client, message) => {
    (async function() {
        let p0 = 0;
        let p1 = 10;
        const data = await message.channel.send(client.guilds.sort((a,b)=>b.memberCount-a.memberCount).map(r=>r).map((r, i) => `[${i + 1}] • Name: \`${r.name.toString()}\`\nUsers: \`${r.memberCount}\``).slice(0, 10).join('\n'));
        await data.react("⬅");
        await data.react("➡");
        await data.react("❌");
        const data_res = data.createReactionCollector((reaction, user) => user.id === message.author.id);
        data_res.on("collect", async(reaction) => {
            if (reaction.emoji.name === "⬅") {
                p0 = p0-10;
                p1 = p1-10;
                if(p0 < 0) { return data.delete(); }
                if(p0 === undefined || p1 === undefined) { return data.delete(); }
                data.edit(client.guilds.sort((a,b)=>b.memberCount-a.memberCount).map(r=>r).map((r, i) => `[${i + 1}] • Name: \`${r.name.toString()}\`\nUsers: \`${r.memberCount}\``).slice(p0, p1).join('\n'));
            }
            if (reaction.emoji.name === "➡") {
                p0 = p0+10;
                p1 = p1+10;
                if(p1 > client.guilds.size + 10) { return data.delete(); }
                if(p0 === undefined || p1 === undefined) { return data.delete(); }
                data.edit(client.guilds.sort((a,b)=>b.memberCount-a.memberCount).map(r=>r).map((r, i) => `[${i + 1}] • Name: \`${r.name.toString()}\`\nUsers: \`${r.memberCount}\``).slice(p0, p1).join('\n'));
            }
            if (reaction.emoji.name === "❌") { return data.delete(data); }
            await reaction.remove(message.author.id);
        })
    }())
}
