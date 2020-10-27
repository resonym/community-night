let page = new Vue({
	el: `#app`,
	data: {
		webhook_uri: `https://discord.com/api/webhooks/770548382548230174/jtrY--rV6aiyPPV1pp1RAw1rLeIo33Kckt-4zJzfp9n54NJQftZtj2QStXvBgOP6TnUY`,
		name: ``,
		hosts: {
			/*
			Bit map:
				00000001 = Among Us (min. 5 players)
				00000010 = TTS
				00000100 = Tabletopia
				00001000 = Fake Artist
				00010000 = Project Winter
				00100000 = Jackbox
				01000000 = MC Java Minigames
				10000000 = Secret Hitler (min. 5 players)
			*/
			alkali: `01111111`,
			ray:    `00111111`,
			max:    `00001111`,
			jb:     `00100000`,
			board:  `10001110`
		},
		game_list: [
			{
				name: `Among Us (Minimum 5 players)`,
				id: `among-us`,
				hosts: [ `alkali`, `ray` ],
				bit: 0,
			},
			{
				name: `Tabletop Simulator`,
				id: `tts`,
				hosts: [ `alkali`, `ray`, `max` ],
				bit: 1,
			},
			{
				name: `Tabletopia`,
				id: `tabletopia`,
				hosts: [ `alkali`, `ray`, `max` ],
				bit: 2,
			},
			{
				name: `Fake Artist Goes To New York`,
				id: `fake-artist`,
				hosts: [ `alkali`, `ray`, `max` ],
				bit: 3
			},
			{
				name: `Project Winter`,
				id: `project-winter`,
				hosts: [ `ray` ],
				bit: 4
			},
			{
				name: `Jackbox`,
				id: `jackbox`,
				hosts: [ `alkali`, `ray` ],
				bit: 5
			},
			{
				name: `Minecraft Minigames (Java Edition -> Windows, Mac, Linux)`,
				id: `mc-minigames`,
				hosts: [ `alkali` ],
				bit: 6
			},
		],
	},
	computed: {
		games() {
			let qs = new URLSearchParams(window.location.search);

			// See if we are just displaying all games
			let all = qs.get(`a`);
			if (all != null) { return this.game_list; };

			let games = [];

			let bits = parseInt(qs.get(`b`), 2);
			let host = qs.get(`h`);

			if (host) {
				bits = parseInt(this.hosts[host], 2);
			}

			for (var game of this.game_list) {
				if (bits & (1 << game.bit)) {
					games.push(game);
				};
			};
			return games;
		},
		hasnt_selected() {
			for (var game of this.game_list) {
				if (game.selected) {
					return false;
				};
			};
			return true;
		},
	},
	methods: {
		submit_form() {
			if (!this.name) {
				alert(`Discord username cannot be left blank`);
				return;
			};

			// create description
			let description = `Username: \`${this.name}\`\nGames:`;
			for (var game of this.game_list) {
				if (game.selected) {
					description += `\n - ${game.name}`;
				};
			};

			axios.post(this.webhook_uri, {
				"embeds": [
					{
						"description": description
					}
				],
				"username": "Community Game Night Submission"
			}).then(() => {
				alert(`Your submission has been recorded successfully!`);
			}).catch(err => {
				alert(`Something went wrong with your submission, please try again.`);
			})
		},
	},
})