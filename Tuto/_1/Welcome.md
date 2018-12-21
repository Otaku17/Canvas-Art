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
