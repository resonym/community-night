let page = new Vue({
	el: `#app`,
	data: {
		webhook_uri: `https://discord.com/api/webhooks/770548382548230174/jtrY--rV6aiyPPV1pp1RAw1rLeIo33Kckt-4zJzfp9n54NJQftZtj2QStXvBgOP6TnUY`,
		submitted: false,
		name: ``,
		hosts: {
			alkali: {
				games: [`minecraft`],
				categories: [
					`tabletop`, `jackbox`, `social-deduction`
				],
				hide: []
			},
			ray: {
				games: [],
				categories: [],
				hide: [],
			},
			max: {
				games: [],
				categories: [],
				hide: [],
			}
		},
		game_list: [
			{
				name: `Among Us (Minimum 5 players)`,
				id: `among-us`,
				categories: [
					`social-deduction`, `video`
				],
				extra: [
					{ type: `note`, value: `<i>This game is paid when on a PC, you should purchase and download it before the community game night if you are wanting to participate.<br><a href="https://store.steampowered.com/app/945360/Among_Us/" target=_blank rel=noopener>Purchase on Steam</a></i>`},
					{ type: `note`, value: `<i>You can get this game for free (with ads) on the Apple App Store and Google Play Store:<br><a href="https://apps.apple.com/us/app/among-us/id1351168404" target=_blank rel=noopener>Get on Apple App Store</a><br><a href="https://play.google.com/store/apps/details?id=com.innersloth.spacemafia&hl=en_CA&gl=US" target=_blank rel=noopener>Get on Google Play Store</a></i>` }
				],
			},
			{
				name: `Fake Artist Goes To New York`,
				id: `fake-artist`,
				categories: [
					`tabletop`, `social-deduction`, `drawing`
				],
			},
			{
				name: `Project Winter`,
				id: `project-winter`,
				categories: [
					`video`, `social-deduction`,
				],
				extra: [
					{ type: `note`, value: `<i>This game is paid, you should purchase and download it before the community game night if you are wanting to participate.<br><a href="https://store.steampowered.com/app/774861/Project_Winter/" target=_blank rel=noopener>Purchase on Steam</a></i>` }
				],
			},
			{
				name: `Jackbox`,
				id: `jackbox`,
				categories: [
					`jackbox`, `video`
				],
			},
			{
				name: `Minecraft Minigames (Java Edition)`,
				id: `mc-minigames`,
				categories: [
					`minecraft`, `video`
				],
				extra: [
					{ type: `note`, value: `<i>Minecraft is a paid game, you should purchase and download it before the community game night if you are wanting to participate.<br><a href="https://www.minecraft.net/en-us/get-minecraft" target=_blank rel=noopener>Purchase Directly (Select "Computer" and make sure it's not the Windows 10 edition if you select Windows)</a></i>`},
					{ type: `note`, value: `<i>This is using the Java Edition of Minecraft, if you open the game and do not see "Java Edition" under the title on the main menu, then the version you have is not the Java Edition.</i>` },
				],
			},
			{
				name: `Monarch (Tabletop Simulator)`,
				id: `monarch`,
				categories: [
					`tabletop`, `suggest`, `tts`
				],
				extra: [
					{ type: `note`, value: `<i>This game only has support for 4 players, if more than 4 players, we will split into groups of 2-4 people.</i>` },
					{ type: `note`, value: `<i>This game is paid, you should purchase and download it before the community game night if you are wanting to participate.<br><a href="https://store.steampowered.com/app/286160/Tabletop_Simulator/" target=_blank rel=noopener>Purchase on Steam</a></i>` }
				]
			},
			{
				name: `Mechanica (Tabletop Simulator)`,
				id: `mechanica`,
				categories: [
					`tabletop`, `suggest`, `tts`
				],
				extra: [
					{ type: `note`, value: `<i>This game only has support for 4 players, if more than 4 players, we will split into groups of 2-4 people.</i>` },
					{ type: `note`, value: `<i>This game is paid, you should purchase and download it before the community game night if you are wanting to participate.<br><a href="https://store.steampowered.com/app/286160/Tabletop_Simulator/" target=_blank rel=noopener>Purchase on Steam</a></i>` }
				]
			},
			{
				name: `Surrealist Dinner Party (Tabletop Simulator / Tabletopia)`,
				id: `surrealist`,
				categories: [
					`tabletop`, `suggest`, `tts`, `tabletopia`
				],
				extra: [
					{ type: `note`, value: `<i>This game only has support for 4 players, if more than 4 players, we will split into groups of 2-4 people.</i>` },
					{ type: `note`, value: `<i>Tabletop Simulator is paid. You do not need Tabletop Simulator to participate because Tabletopia is free and we will use that if people don't own Tabletop Simulator.<br><a href="https://store.steampowered.com/app/286160/Tabletop_Simulator/" target=_blank rel=noopener>Purchase on Steam</a></i>` }
				]
			},
			{
				name: `Tabletop Simulator (Suggest Game)`,
				id: `tts`,
				categories: [
					`tabletop`, `suggest`, `tts`
				],
				extra: [
					{ name: `Game Suggestion`, type: `text`, id: `tts-suggestion`, value: `` },
					{ type: `note`, value: `<i>This game is paid, you should purchase and download it before the community game night if you are wanting to participate.<br><a href="https://store.steampowered.com/app/286160/Tabletop_Simulator/" target=_blank rel=noopener>Purchase on Steam</a></i>` }
				]
			},
			{
				name: `Tabletopia (Suggest Game)`,
				id: `tabletopia`,
				categories: [
					`tabletop`, `suggest`, `tabletopia`
				],
				extra: [
					{ name: `Game Suggestion`, type: `text`, id: `tts-suggestion`, value: `` },
				]
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

			let categories = qs.getAll(`c`);
			let host = qs.get(`h`);

			host = this.hosts[host];

			// Check each game in the array
			for (var game of this.game_list) {

				// Ensure that host is defined
				if (host) {

					// Check if the host can run the game
					if (host.games.includes(game.id)) {
						games.push(game);
						continue;
					}

					// Check if the host is not hiding the game from a category
					if (!host.hide.includes(game.id)) {

						// Check if the game is in a category the host can run
						for (var cat of host.categories) {
							if (game.categories.includes(cat)) {
								games.push(game);
								break;
							};
						};
						continue;
					};
				};

				if (categories) {
					for (var cat of categories) {
						if (game.categories.includes(cat)) {
							games.push(game);
							break;
						};
					};
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

					// Extras needed for information
					if (game.extra) {
						description += `\n - ${game.name} (`

						// show all extras
						for (var extra of game.extra) {
							if (extra.type !== `note`) {
								description += `${extra.name}=${extra.value},`;
							};
						};
						// Remove last comma
						description = description.replace(/(,$)|($)/, `)`);
						description = description.replace(/\(\)$/, ``);
					}

					// No extras to show
					else {
						description += `\n - ${game.name}`;
					}
				};
			};

			axios.post(this.webhook_uri, {
				"embeds": [
					{
						"description": description
					}
				],
				"username": "Game Night Submission"
			}).then(() => {
				this.submitted = true;
				alert(`Your submission has been recorded successfully!`);
			}).catch(err => {
				alert(`Something went wrong with your submission, please try again.`);
			})
		},
	},
})