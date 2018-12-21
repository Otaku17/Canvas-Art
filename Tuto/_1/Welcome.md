# Welcome

Le rendu final du tutoriel

[![welcomeImg](https://media.discordapp.net/attachments/524920628730527744/524945116004089866/Welcome.png)](https://github.com/Otaku17/canvas-center/blob/master/Tuto/_1/welcome.js)


Bon, maintenant que vous avez vu ce que vous allez créer, vous allez installer `canvas`, `canvas-constructor` et `axios`.
```
npm install --s axios
npm install --s canvas
nmp install --s canvas-constructor
```
### Le code de base

Une fois que vous avez installé les modules plus haut vous allez créé un fichier `welcome.js`que nous allons compléter avec le code plus bas.

```js
'use strict';
exports.run = async(client, message) => {
  // Votre code.
};
exports.help = {
  name: "welcome",
  category: "utility",
  description: "Génére votre welcome.",
  usage: "welcome"
};
```

### Les modules requis

En dessous de la ligne `'use strict'` vous allez venir ajoutée deux `const`.

```js
const { Canvas } = require('canvas-constructor');
const axios = require('axios');
```

### Les fonctions
Nous allons faire une `fonction` avec le module `axios` pour pouvoir récupérer le buffer64 d'une URL, vous pouvais placer cette fonction à la place de `//Votre code`.

```js
function buffer(data) {
    return axios.get(data, {
        responseType: 'arraybuffer'
    })
    .then((res) => res.data)
    .catch(err => console.log(err));
}
```

Ensuite nous allons construire une `fonction asynchrone` en dessous de le fonction `buffer`.

```js
async function Welcome(data) {
    //le code canvas  
}
```
Logiquement votre code devrait ressembler à ça  si vous avez tout suivi.

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

    async function Welcome(data) {
        //le code canvas  
    }

};
exports.help = {
  name: "welcome",
  category: "utility",
  description: "Génére votre welcome.",
  usage: "welcome"
};
```

### Le code Canvas

C'est surement la partie que vous attendiez tous, nous allons créés notre `welcome`.
Dans la fonction `Welcome` vous allez venir remplacer `//le code canvas` par le code qui va suivre.

On va créé le template de l'image, avec les valeurs `400, 200`. Cela signifie largeur et hauteur donc `400 de largeur` & `200 de hauteur`.

```js
return new Canvas(400, 200)
```

En dessous nous allons venir définir un bloc d'information entourée par les fonctions `save()` & `restore()`

```js
.save() //Début de la création du bloc.
.setColor('#303030') //Nous allons définir une coleur dans le bloc
.addRect(0, 0, 400, 200) //Celà va nous crée un rectangle de 400, 200 avec la couleur '#303030'
.setColor('white') //Ici on vient définir la couleur blanche pour le cercle qui se trouve derrière l'avatar
.addCircle(195, 84, 68) //On crée un cercle blanc à 195px sur l'axe X et 84px sur l'axe Y avec une taille de raduis de 68px
.addRoundImage(await buffer(data.displayAvatarURL), 131, 20, 128, 128, 64) //On ajoute l'avatar de l'user
.restore() //Fin de la création du bloc
.setColor('white') //On définie une nouvelle fois la color "white" en dehor du block pour la police du texte
.setTextAlign("center") //On vient centré le texte au centre de l'image
.setTextFont("bold 16pt sans serif ") //On définie une police (Pas de soucis cette police et compatible tout OS)
.addResponsiveText(`Welcome to ${data.tag}`, 200, 184, 375, 20) //On ajoute un petit text responsive pour évite les débordement
.toBuffer(); //On déclare la fin de la toile
```
PS: `.addRoundImage(X, Y, Largeur, Hauteur, Radius)`

On va vérifier si vous suivez toujours, si c'est le cas votre code toi ressembler à ça.
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
        .addResponsiveText(`Welcome to ${data.tag}`, 200, 184, 375, 20)
        .toBuffer();
    }

};

exports.help = {
  name: "welcome",
  category: "utility",
  description: "Génére votre welcome.",
  usage: "welcome"
};
```

### L'envoie de l'image

Voici la dernière partie l'envoie de l'image, juste en dessous de 
```js
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
    .addResponsiveText(`Welcome to ${data.tag}`, 200, 184, 375, 20)
    .toBuffer();
}
```
Nous allons ajouter se petit bloc de ligne
```js
message.channel.send({
    files: [{
        attachment: await Welcome(message.author),
        name: "welcome.png"
    }]
});
```
Et c'est terminer :3

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
        .addResponsiveText(`Welcome to ${data.tag}`, 200, 184, 375, 20)
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
```
