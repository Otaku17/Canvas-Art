# Badge

Le rendu final du tutoriel

[![welcomeImg](https://cdn.discordapp.com/attachments/528933009072717825/531814577642536961/badge-canvas.png)](https://github.com/Otaku17/canvas-center/blob/master/Tuto/_2/badge.js)


Bon, maintenant que vous avez vu ce que vous allez créer, vous allez installer `canvas`, `canvas-constructor` et `axios`:
```
npm install --s axios
npm install --s canvas
npm install --s canvas-constructor
```
### Le code de base

Une fois que vous avez installé les modules plus haut vous allez créer un fichier `badge.js`que nous allons compléter avec le code plus bas:

```js
'use strict';
exports.run = async(client, message) => {
  // Votre code.
};
exports.help = {
    name: "badge",
    category: "utility",
    description: "Génére un badge du client.",
    usage: "badge"
};
```

### Les modules requis

En dessous de la ligne `'use strict'` vous allez venir ajouter deux `const`:

```js
const { Canvas } = require('canvas-constructor');
const axios = require('axios');
```

### Les fonctions
Nous allons faire une `fonction` avec le module `axios` pour pouvoir récupérer le buffer64 d'une URL, vous pouvez placer cette fonction à la place de `//Votre code`:

```js
function buffer(data) {
    return axios.get(data, {
        responseType: 'arraybuffer'
    })
    .then((res) => res.data)
    .catch(err => console.log(err));
}
```

Ensuite nous allons construire une `fonction asynchrone` en dessous de la fonction `buffer`.

```js
async function Badge(data) {
    //le code canvas  
}
```
Logiquement votre code devrait ressembler à ça si vous avez tout suivi:

```js
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

    async function Badge(data) {
        //le code canvas  
    }

};
exports.help = {
    name: "badge",
    category: "utility",
    description: "Génére un badge du client.",
    usage: "badge"
};
```

### Le code Canvas

C'est surement la partie que vous attendiez tous, nous allons créer notre `badge`.
Dans la fonction `Badge` vous allez venir remplacer `//le code canvas` par le code qui va suivre.

On va créer le template de l'image, avec les valeures `300, 150`. Cela signifie largeur et hauteur donc `300 de largeur` & `150 de hauteur`.

```js
return new Canvas(350, 150)
```

En dessous, nous allons venir définir un bloc d'information entouré par les fonctions `save()` & `restore()`:

```js
.save() //Début de la création du bloc.
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
.restore() //Fin de la création du bloc
```
PS: `.addBeveledImage(buffer, X, Y, Largeur, Hauteur, Radius)`

En dessous du bloc nous allons ajouter quelques lignes

```js
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
```

Nous allons vérifier, si vous suivez toujours, si c'est le cas votre code doit ressembler à ça:
```js
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

};

eexports.help = {
    name: "badge",
    category: "utility",
    description: "Génére un badge du client.",
    usage: "badge"
};
```

### L'envoie de l'image

Voici la dernière partie "l'envoie de l'image", juste en dessous de ceci:
```js
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
```
Nous allons ajouter ce petit bloc de ligne:
```js
message.channel.send({
    files: [{
        attachment: await Badge(message.author),
        name: "badge.png"
    }]
});
```
Et c'est terminé :3

Rendu final du code:
```js
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
```

