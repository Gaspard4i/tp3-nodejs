<img src="images/readme/header.jpg">

## 🎯 Objectifs <!-- omit in toc -->
- Développer un serveur web avec Node.js
- Développer une application fullstack avec JS côté client et serveur
- Apprendre comment installer et utiliser Socket.io

## Sommaire <!-- omit in toc -->
- [A. Préparatifs](#a-préparatifs)
- [B. Premier script Node.js](#b-premier-script-nodejs)
- [C. Debug avec Node \& VSCode](#c-debug-avec-node--vscode)
	- [C.1. Reload auto](#c1-reload-auto)
	- [C.2. Debug dans VSCode](#c2-debug-dans-vscode)
- [D. Créer un serveur web](#d-créer-un-serveur-web)
- [E. Socket.io](#e-socketio)
	- [E.1. Installation](#e1-installation)
	- [E.2. Architecture](#e2-architecture)
	- [E.3. Mise en oeuvre](#e3-mise-en-oeuvre)



## A. Préparatifs

1. **Commencez par faire un fork du TP en vous rendant directement sur https://gitlab.univ-lille.fr/jsae/tp3-nodejs/-/forks/new**

	Pour le `namespace` choisissez de placer le fork dans votre profil utilisateur.\
	Pour `Visibility Level` sélectionnez le **mode "private"**
2. **Ajoutez votre encadrant.e de TP en tant que "reporter"** (`@patricia.everaere-caillier` ou `@thomas.fritsch`)
3. **Ouvrez le dossier du TP dans vscode.**
4. **Installez les dépendances du projet** avec `npm i`
5. ⚠️⚠️⚠️ **Contrairement aux TPs précédents, nous n'allons pas pour le moment compiler de code JS côté front**, nous ne lancerons donc pas `webpack-dev-server` (_la commande `npm start`_) pour nous concentrer dans un premier temps sur le code côté serveur
6. **vérifiez que votre version de Node est bien `23.*.*`** : ouvrez un terminal intégré à vscodium en tapant <kbd>CTRL</kbd>+<kbd>J</kbd> (PC) / <kbd>CMD</kbd>+<kbd>J</kbd> (Mac) et tapez :
	```bash
	node -v
	```
	Si la version affichée dans le terminal n'est pas au moins la 23, suivez les instructions du TP1 du cours de JS pour installer nvm : https://gitlab.univ-lille.fr/js/tp1/-/blob/main/A-preparatifs-linux.md#2-installation-et-configuration-de-node

7. **Récupérez et lisez le pdf du cours** sur moodle : https://moodle.univ-lille.fr/pluginfile.php/4471693/mod_resource/content/0/cours-jsae-2-node-socket.pdf)

	_**En cas de question interpellez votre encadrant.e de TP !**_

## B. Premier script Node.js

<img src="images/readme/header-node.jpg">

**Node est un programme qui permet d'exécuter d'autres programmes développés en JS.** \
La plupart du temps, on se sert de cette possibilité pour développer des serveurs web HTTP (_à la Tomcat/Apache/Nginx/IIS_) -c'est d'ailleurs ce qu'on fera dans la suite de ce TP- mais pour le moment nous allons juste développer un petit programme à exécuter **dans un terminal**.

1. **Pour commencer, créez un dossier `/server` à la racine du TP et ajoutez y un fichier `index.js`**

	> _**NB :** cette étape n'est pas obligatoire (on pourrait mettre notre fichier js n'importe où et le nommer comme on veut) mais créer un dossier à part va nous permettre de bien séparer notre code côté back et notre futur code côté client._

2. **Dans le fichier `server/index.js` ajoutez y l'instruction :**
	```js
	console.log('Think Mark, Think !');
	```
3. **Pour lancer ce script, ouvrez un terminal intégré à VSCode et tapez-y l'instruction :**
	```js
	node server/index.js
	```
	vous devriez voir apparaître dans le terminal le texte :
	```
	Think Mark, Think !
	```
	Facile !
4. **Dans le fichier `package.json` de nos précédents TPs, on a toujours eu une clé `"main"` avec comme valeur `"index.js"`.** On ne s'en est jamais préoccupé jusque là parce qu'elle n'est utile que quand on développe avec Node, c'est donc le moment de l'utiliser :

	La clé ["main" _(doc)_](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#main) permet de renseigner le point d'entrée par défaut de notre projet. L'intérêt c'est que plutôt que de lancer notre script avec la commande `node server/index.js` on pourra le lancer avec la commande `node .`. Node ira lire la clé `"main"` du `package.json` pour savoir quel script lancer.

	**Dans le fichier `package.json` modifiez donc la clé "main" comme ceci :**
	```json
	"main": "server/index.js"
	```
	Une fois le fichier sauvegardé, relancez le script cette fois avec la commande :
	```bash
	node .
	```
	Normalement le message `Think Mark, Think !` s'affiche à nouveau.
5. **Pour simplifier encore un peu le lancement du serveur, on va créer un script `npm run server` pour lancer notre appli node** : en vous appuyant sur le TP [JS / TP2 / A.Preparatifs : A.5 Créer un script de build personnalisé](https://gitlab.univ-lille.fr/js/tp2/-/blob/main/A-preparatifs.md#a5-cr%C3%A9er-un-script-de-build-personnalis%C3%A9) créez dans le fichier package.json un script `"server"` permettant de lancer la commande `node .` en tapant juste `npm run server` (https://docs.npmjs.com/cli/v10/commands/npm-run-script).

	> _**NB :** on pourrait se dire que ce qu'on vient de faire a peu d'intérêt car au final `npm run server` c'est plus "long" à taper que `node .` mais l'avantage d'avoir un "script" npm dans le `package.json` c'est qu'il devient clair pour une personne qui rejoindrait l'équipe de développement que c'est cette commande là qu'il faut lancer pour démarrer le serveur, pas besoin de "deviner" que c'est `node .`._

6. Pour bien **distinguer cette nouvelle commande "server" des précédents scripts de compilation du front**, renommez les scripts `"build"`, `"watch"` et `"start"` en `"client:build"`, `"client:watch"` et `"client:start"`.

## C. Debug avec Node & VSCode

<img src="images/readme/header-vscode-node.jpg">

_**Avant de passer à des exercices plus complexes, et puisqu'on était en train de travailler à la configuration de notre projet, attardons nous 5 minutes sur les outils qui vont nous permettre de débugger plus facilement notre projet.**_

### C.1. Reload auto

**Actuellement, une fois exécuté, notre programme se stoppe immédiatement. Si l'on modifie le code, il faut relancer manuellement notre serveur pour voir le résultat de nos modifications.**

Heureusement, un peu comme ce que l'on faisait avec webpack-dev-server côté front, on a la possibilité avec Node de relancer automatiquement notre application back dès qu'un fichier est modifié.

Avant la version 18 de Node.js on utilisait pour ça un outil appelé `nodemon` (https://nodemon.io/) mais aujourd'hui ce mécanisme est intégré de base dans Node.js et s'utilise avec [le flag `--watch` _(doc)_](https://nodejs.org/api/cli.html#--watch)

1. Dans le fichier `package.json` créez un script npm nommé `"server:watch"` qui lance la même commande que le `npm run server` mais avec le flag `--watch` _**ENTRE**_ `node` et le `.` :
	```
	node --watch .
	```
2. Dans le terminal intégré, lancez maintenant la commande `npm run server:watch` : Le terminal ne vous rend plus la main, et relance l'exécution à chaque fois que vous sauvegardez le fichier `server/index.js` :

	<img src="images/readme/watch.gif" >



### C.2. Debug dans VSCode

Dans les précédents TPs on avait vu que l'on pouvait débugger notre code front sans passer par les devtools du navigateur, directement dans VSCode ce qui nous avait permis de mettre des points d'arrêt directement dans VSCode, d'inspecter les valeurs de nos variables, etc.

**Et bien on peut faire exactement la même chose avec notre appli Node !**

Le principe c'est que, de la même manière qu'on laissait VSCode lancer un navigateur en mode debug pour nous, on va demander à VSCode de lancer notre appli en mode debug tout seul comme un grand.

1. Ouvrez le fichier `.vscode/launch.json` qui contient les configs de debug du front en 2 versions (Chromium et Chrome). Pour rappel il contient normalement ceci :
	```json
	{
		// Use IntelliSense to learn about possible attributes.
		// Hover to view descriptions of existing attributes.
		// For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
		"version": "0.2.0",
		"configurations": [
			{
				"name": "Chromium Debug",
				// config pour chromium...
			},
			{
				"name": "Chrome Debug",
				// config pour chrome...
			},
		]
	}
	```


1. Dans la clé `"configurations"` (_au début, juste avant les trois précédentes_) ajoutez la configuration suivante :
	```json
	{
		"name": "Debug server",
		"type": "node",
		"request": "launch",
		"cwd": "${workspaceFolder}",
		"runtimeExecutable": "npm",
		"runtimeArgs": ["run-script", "server:watch"],
		"skipFiles": [
			"<node_internals>/**"
		],
	}
	```
	> _**NB :** cette configuration est basée sur l'exemple fourni dans la documentation du debug Node dans VScode et permet de lancer notre script custom "npm run dev" : https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_launch-configuration-support-for-npm-and-other-tools ._

2. **Stoppez la commande `npm run server:watch` lancée au point C.1. et lancez le debug du serveur en appuyant sur la touche <kbd>F5</kbd>**

	A partir de cet instant, VSCode va lancer lui même votre serveur en mode [`--inspect` _(doc)_](https://nodejs.org/en/docs/guides/debugging-getting-started/#enable-inspector). Vous allez donc pouvoir voir le `console.log` dans la "Debug Console" de VSCode, placer des points d'arrêt etc.

3. **Pour vérifier si le mode debug fonctionne, modifiez un peu le code de votre fichier `server/index.js` :**

	```js
	const firstName = 'Mark';
	console.log(`Think ${firstName}, Think !`);
	```

	placez un point d'arrêt sur la 2e ligne (celle du `console.log`) puis modifiez la valeur de la constante `firstName` : le programme doit se relancer automatiquement (_grâce à l'option `--watch`_) et le point d'arrêt doit s'activer (_grâce au mode debug que l'on vient de configurer_) :

	<img src="images/readme/debug.gif" >

4. **Pour finir, à l'aide de la propriété** [**`process.argv`** _(doc)_](https://nodejs.org/api/process.html#processargv) **tentez de faire en sorte que l'on puisse passer en paramètre à notre script le nom affiché dans la console.**

	L'idée c'est que plutôt que d'appeler simplement `npm run server:watch`, on puisse lancer notre serveur en ajoutant un paramètre à la fin de la commande, par exemple comme ceci : `npm run server:watch Thomas`.

	> _**Attention :** comme c'est maintenant VSCode qui lance notre serveur on n'appelle plus directement `npm run server:watch`, en revanche on peut dire à VSCode de rajouter un paramètre lorsqu'il lance notre serveur :_
	>
	> _Dans notre fichier `.vscode/launch.json`, ajoutez la valeur que vous souhaitez passer en paramètre dans la clé `"runtimeArgs"`, par exemple :_
	> ```json
	> "runtimeArgs": ["run-script", "server:watch", "Thomas"],
	> ```


## D. Créer un serveur web

**Comme expliqué dans le pdf du cours, il existe plusieurs façons de créer un serveur web mais on va commencer par faire ça avec les fonctions de base de Node.js.**

En fin de TP, s'il vous reste du temps, on utilisera Express pour simplifier le code.

1. **En vous servant du pdf du cours, modifiez votre fichier `server/index.js` pour lancer un serveur http** sur le port 8080 qui affiche le message "Think xxxxx, Think !" (_où `xxxxx` est le paramètre passé au lancement du serveur_) sur la page d'accueil (http://localhost:8080/).

2. **On a vu au chapitre précédent que l'on pouvait passer des valeurs à notre serveur sous la forme de paramètres envoyés dans le terminal. Une autre façon de paramétrer notre serveur est d'utiliser les variables d'environnement.**

	Pour accéder aux variables d'environnement, on utilise la [propriété `process.env` _(doc)_](https://nodejs.org/api/process.html#processenv).

	Essayez par exemple dans votre serveur de logger la variable d'environnement `PATH` ou des variables `HOME` ou `PWD`.

3. **Les variables d'environnement sont pratiques parce qu'elles vont permettre de paramétrer facilement votre application en fonction de la machine sur laquelle elle tourne.**

	Ce sera particulièrement précieux si vous déployez votre application chez un hébergeur : cela vous permettra par exemple de choisir si vous lancez votre site en http (_dev local_) ou en https (_hébergement en ligne_), le nom de domaine de l'application (_localhost en local / monsite.com en ligne_), etc.

	Pour définir une variable d'environnement uniquement dans votre session de debug, vous pouvez ajouter une clé `"env"` dans votre configuration de debug dans le fichier `.vscode/launch.json`. Par exemple pour configurer le port de votre serveur http, ajoutez la clé `"env"` suivante dans la config de debug node dans votre `launch.json` :
	```json
	"env": {
		"PORT": "8080"
	},
	```

	> _**NB :** il est aussi possible de renseigner les variables d'environnement dans un fichier `.env` et de configurer le debug comme indiqué ici : https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_load-environment-variables-from-external-file ._

4. **Stoppez puis relancez votre session de debug, puis modifiez votre fichier `server/index.js` de manière à ne plus avoir de numéro de port en dur mais à le récupérer depuis la variable d'environnement `PORT`.**

	Essayez de faire en sorte d'avoir une valeur par défaut si jamais la variable `PORT` n'est pas renseignée !


## E. Socket.io

<img src="images/readme/header-socket.jpg">

_**Après tous ces préparatifs, nous arrivons maintenant au gros morceau de ce TP : Socket.IO**_

Comme expliqué dans le pdf du cours, [Socket.IO](https://socket.io/) est une bibliothèque qui va simplifier la mise en place d'applications basées sur les websocket (_applications temps réel et communications bidirectionnelles client ⭤ serveur, du genre tableau blanc, chat, jeu en ligne, etc._).

On va l'utiliser pour développer un serveur de chat qui sera utilisé par notre front à la place du BroadcastChannel qu'on avait mis en place dans le TP2.

Vous aurez donc 2 serveurs HTTP à lancer :
- **1 serveur sur le port 8000** avec `webpack-dev-server` pour **servir le front** de votre application (html, css, js) contenu dans le dossier `/client` (_solution du TP2_). Pour rappel ce serveur sert aussi à compiler le code JS front avec webpack et Babel (_utile pour la compatibilité navigateur !_)
- **1 serveur sur le port 8080** avec Socket.IO pour **gérer le back** à savoir la connexion websocket et le "domaine"/"modèle"  (_envoi / réception des messages_)

### E.1. Installation

1. **Commencez par installer Socket.IO dans le TP :**
	```bash
	npm i socket.io socket.io-client
	```

2. **Relancez le serveur de développement de `webpack-dev-server` dans un 2e terminal splitté :**
	```bash
	npm run client:start
	```

	> ⚠️ _**Attention, vous devez bien avoir 2 serveurs qui tournent** : `npm run client:start` et `npm run server:watch` (lancé par la session de debug)_

	> <details><summary>🚧 <em>La commande ne se lance pas ?</em></summary>
	>
	> _Vérifiez que comme demandé au point B.6. vous avez bien renommé les scripts `"build"`, `"watch"` et `"start"` en `"client:build"`, `"client:watch"` et `"client:start"` !_
	> </details>

	Ouvrez votre navigateur sur http://localhost:8000 et vérifiez que votre app JSelegram s'affiche correctement.

3. **Créez un serveur websocket avec Socket.IO dans `server/index.js` :**
	```js
	import { Server as IOServer } from 'socket.io';
	// ...
	const io = new IOServer(httpServer, { cors: true });
	io.on('connection', socket => {
		console.log(`Nouvelle connexion du client ${socket.id}`);
	});
	// ...
	```
	> <details><summary>ℹ️ <em>C'est quoi ce paramètre <code>{ cors: true }</code></em></summary>
	>
	> _Comme on lance notre serveur websocket sur un domaine différent (8080) du serveur qui sert le front (8000) comme c'est notre cas, les navigateurs appliquent la [**Same Origin Policy (mdn)**](https://developer.mozilla.org/fr/docs/Web/Security/Same-origin_policy) dont on avait parlé dans le cours 4 sur AJAX (reprenez le pdf si ce n'est plus clair)._
	>
	> _En ajoutant ce paramètre `cors` on **active le protocole CORS** pour autoriser les connexions au serveur websocket depuis n'importe quel autre domaine (y compris donc http://localhost:8000)_
	>
	> 📖 _Plus d'informations dans la **documentation** ici : https://socket.io/docs/v4/handling-cors/_
	> </details>

4. **Dans le fichier `client/src/main.js` connectez le front au serveur websocket avec le code suivant :**
	```js
	import { io } from 'socket.io-client';
	const socket = io(window.location.hostname + ':8080');
	```

	Ce code suffit à connecter le client au serveur Socket.IO ! Ouvrez plusieurs onglets de votre navigateur sur http://localhost:8000 et regardez dans la Debug Console de VSCode : vous devez en principe voir passer des messages `"Nouvelle connexion du client xxxxxxx"` !

	> <details><summary>ℹ️ <em>Pourquoi on utilise <code>window.location.hostname</code> et pas 'localhost:8080' en dur ?</em></summary>
	>
	> _Effectivement, dans le pdf du cours, on avait le code suivant :_
	> ```js
	> const socket = io('localhost:1337');
	> ```
	> _Dans le code que je vous ai suggéré plus haut, à la place de `"localhost"` on utilise `window.location.hostname` qui est une propriété qui permet de récupérer dynamiquement le nom de domaine courant._
	>
	> _Si vous chargez votre application sur http://localhost:8000, au final les 2 codes fonctionneront de la même manière (puisque `window.location.hostname` retournera `'localhost'`)._
	>
	> _En revanche si on se projette un peu dans votre future SAE, vous aurez besoin d'accéder à votre appli depuis plusieurs machines différentes (pour pouvoir jouer à plusieurs !). Et là ça ne sera pas la même histoire._
	>
	> _Au lieu d'utiliser http://localhost:8000, les joueuses et les joueurs devront utiliser l'adresse IP de votre machine pour accéder au front de votre app (par exemple http://192.168.0.32:8000). Si vous avez mis en dur `io('localhost:8080')` dans votre code, alors personne n'arrivera à se connecter à votre serveur Socket.IO !_ 😢
	>
	> _En utilisant window.location.hostname, votre appli utilisera automatiquement la bonne URL de connexion (`192.168.0.32:8080`) !_ 🥳
	> </details>

5. **Vous pouvez détecter la déconnexion d'un client en ajoutant un écouteur d'événement `'disconnect'` comme ceci :**
	```js
	io.on('connection', socket => {
		console.log(`Nouvelle connexion du client ${socket.id}`);

		socket.on('disconnect', () => {
			console.log(`Déconnexion du client ${socket.id}`);
		})
	});
	```
	Ouvrez et fermez des onglets sur votre site, les messages de connexion/déconnexion doivent s'afficher.

### E.2. Architecture
**Maintenant que Socket.IO est en place, vous allez pouvoir commencer à modifier le chat pour faire en sorte qu'on puisse échanger des messages via Socket.IO et plus via le `BroadcastChannel` ! Mais avant ça posons nous 2 secondes sur l'architecture de notre application.**

Techniquement, on pourrait pour cet exercice se contenter de remplacer les appels aux méthodes de `BroadcastChannel` par des appels aux méthodes de Socket.IO. L'inconvénient c'est qu'on se retrouverait alors avec les mêmes limites qu'on avait jusque là : impossible de récupérer l'historique lorsqu'on se connecte, risque d'incohérence entre la liste des messages affichés dans 2 fenêtres différentes si problème réseau, etc.

Ce que l'on vous propose ici c'est plutôt de **migrer toute la partie "métier" de l'application (le `"ChatRepository"`) côté serveur** ! Avec cette technique c'est le serveur qui va **"centraliser"** la logique métier (_l'historique des messages_) et servir de **"source d'information unique"** (_["Single source of truth"](https://en.wikipedia.org/wiki/Single_source_of_truth)_) pour tous les clients connectés.

1. **Commencez par déplacer les fichiers `client/src/ChatRepository.js` et `client/src/ChatRepository.test.js` dans le dossier `/server/`.**

	Lancez dans un terminal de VSCode vos tests unitaires avec la commande :

	```bash
	npm run test:watch
	```

	> ⚠️ **Cette commande devra rester lancée pendant toute la suite du TP !** Gardez bien un oeil dessus en permanence ! 👀 ⚠️ Il est probable que vous ayez à modifier le `ChatRepository` -et donc les tests- dans la suite du TP.

2. **Dans le code côté client, supprimez l'import et tous les appels à ChatRepository.**

	> ℹ️ _En principe maintenant votre appli front ne fonctionne plus du tout mais elle ne doit remonter aucune erreur._

3. **Dans `server/index.js` instanciez le `ChatRepository` comme vous le faisiez précédemment côté client.**


### E.3. Mise en oeuvre
**Maintenant que les choses sont bien rangées, vous allez pouvoir coder votre serveur websocket.**

Avec Socket.IO, on dispose de plusieurs méthodes pour envoyer des messages du client vers le serveur ou du serveur vers les clients :

**côté client on peut utiliser :**
- [socket.on](https://socket.io/docs/v4/client-api/#socketoneventname-callback) pour **recevoir** des messages depuis le serveur
- [socket.emit](https://socket.io/docs/v4/client-api/#socketemiteventname-args) pour **envoyer** des messages au serveur

**côté serveur on utilise :**
- [io.on](https://socket.io/docs/v4/server-api/#serveroneventname-listener) pour détecter les **nouvelles connexions**
- [io.emit](https://socket.io/docs/v4/server-api/#serveremiteventname-args) pour **envoyer** un message à **tous les clients connectés** (broadcast)
- [socket.on](https://socket.io/docs/v4/server-api/#socketoneventname-callback) pour **recevoir** les messages envoyés **par un client** en particulier
- [socket.emit](https://socket.io/docs/v4/server-api/#socketemiteventname-args) pour **envoyer** un message **à un client** en particulier

**À l'aide de ces différentes méthodes, modifiez le mini chat pour faire en sorte qu'on puisse échanger des messages via Socket.IO et plus via le `BroadcastChannel` :**

1. si on tape un message dans le champ de saisie et qu'on soumet le formulaire, le message est envoyé **à tous les autres clients** connectés
2. quand un client envoie un message, il s'affiche dans l'historique des messages **de tous les clients connectés**
3. quand un nouveau client se connecte, il récupère l'ensemble de **l'historique des messages**

Comme précédemment les messages envoyés par le client lui-même doivent apparaître différemment de ceux des autres clients.


