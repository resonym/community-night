let page = new Vue({
	el: `#app`,
	data: {
		webhook_uri: `https://discord.com/api/webhooks/770548382548230174/jtrY--rV6aiyPPV1pp1RAw1rLeIo33Kckt-4zJzfp9n54NJQftZtj2QStXvBgOP6TnUY`,
		submitted: false,
		name: ``,
		hosts: {
			alkali: {
				games: [ `mc-minigames`, `new-game` ],
				categories: [
					`tabletop`, `jackbox`, `social-deduction`
				],
				hide: {
					games: [ `viticulture`, `project-winter` ],
					categories: []
				},
			},
			ray: {
				games: [ `viticulture` ],
				categories: [ `social-deduction`, `suggest` ],
				hide: {
					games: [],
					categories: [ `resonym` ]
				},
			},
			max: {
				games: [ `bananagrams`, `free-board-game-suggest` ],
				categories: [ `tts`, `social-deduction` ],
				hide: {
					games: [ `fake-artist` ],
					categories: [ `resonym` ]
				},
			}
		},
		game_list: [
			{
				name: `Among Us`,
				id: `among-us`,
				min_players: 5,
				categories: [
					`social-deduction`, `video`
				],
				extra: [
					{ type: `note`, value: `<i>This game is paid when on a PC, you should purchase and download it before the community game night if you are wanting to participate.<br><a href="https://store.steampowered.com/app/945360/Among_Us/" target=_blank rel=noopener>Purchase on Steam</a></i>`},
					{ type: `note`, value: `<i>You can get this game for free (with ads) on the Apple App Store and Google Play Store:<br><a href="https://apps.apple.com/us/app/among-us/id1351168404" target=_blank rel=noopener>Get on Apple App Store</a><br><a href="https://play.google.com/store/apps/details?id=com.innersloth.spacemafia&hl=en_CA&gl=US" target=_blank rel=noopener>Get on Google Play Store</a></i>` }
				],
				selected: false,
			},
			{
				name: `Fake Artist Goes To New York`,
				id: `fake-artist`,
				categories: [
					`tabletop`, `social-deduction`, `drawing`
				],
				selected: false,
			},
			{
				name: `Project Winter`,
				id: `project-winter`,
				categories: [
					`video`, `social-deduction`,
				],
				min_players: 5,
				extra: [
					{ type: `note`, value: `<i>This game is paid, you should purchase and download it before the community game night if you are wanting to participate.<br><a href="https://store.steampowered.com/app/774861/Project_Winter/" target=_blank rel=noopener>Purchase on Steam</a></i>` }
				],
				selected: false,
			},
			{
				name: `Jackbox`,
				id: `jackbox`,
				categories: [
					`jackbox`, `video`
				],
				selected: false,
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
				selected: false,
			},
			{
				// Hosted on https://www.playbananagrams.com
				name: `Bananagrams`,
				id: `bananagrams`,
				categories: [
					`tabletop`,
				],
				selected: false,
			},
			{
				// Hosted on https://longwave.web.app
				name: `Wavelength`,
				id: `wavelength`,
				categories: [
					`tabletop`
				],
				selected: false,
				extra: [
					{ type: `note`, value: `Gameplay of Wavelength can be previewed <a href="https://www.youtube.com/watch?v=pS-XT-5R26Q" target="_blank" rel="noopener">on YouTube</a>` }
				]
			},
			{
				// Hosted on https://colonist.io
				name: `Settlers of Catan`,
				id: `settlers-of-catan`,
				categories: [
					`tabletop`
				],
				selected: false,
			},
			{
				name: `Monarch (Tabletop Simulator)`,
				id: `monarch`,
				categories: [
					`tabletop`, `tts`, `resonym`
				],
				extra: [
					{ type: `note`, value: `<i>This game only has support for 4 players, if more than 4 players, we will split into groups of 2-4 people.</i>` },
					{ type: `note`, value: `<i>This game is paid, you should purchase and download it before the community game night if you are wanting to participate.<br><a href="https://store.steampowered.com/app/286160/Tabletop_Simulator/" target=_blank rel=noopener>Purchase on Steam</a></i>` }
				],
				selected: false,
			},
			{
				name: `Mechanica (Tabletop Simulator)`,
				id: `mechanica`,
				categories: [
					`tabletop`, `tts`, `resonym`
				],
				extra: [
					{ type: `note`, value: `<i>This game only has support for 4 players, if more than 4 players, we will split into groups of 2-4 people.</i>` },
					{ type: `note`, value: `<i>This game is paid, you should purchase and download it before the community game night if you are wanting to participate.<br><a href="https://store.steampowered.com/app/286160/Tabletop_Simulator/" target=_blank rel=noopener>Purchase on Steam</a></i>` }
				],
				selected: false,
			},
			{
				name: `Surrealist Dinner Party (Tabletop Simulator / Tabletopia)`,
				id: `surrealist`,
				categories: [
					`tabletop`, `tts`, `tabletopia`, `resonym`
				],
				extra: [
					{ type: `note`, value: `<i>This game only has support for 4 players, if more than 4 players, we will split into groups of 2-4 people.</i>` },
					{ type: `note`, value: `<i>Tabletop Simulator is paid. You do not need Tabletop Simulator to participate because Tabletopia is free and we will use that if people don't own Tabletop Simulator.<br><a href="https://store.steampowered.com/app/286160/Tabletop_Simulator/" target=_blank rel=noopener>Purchase on Steam</a></i>` }
				],
				selected: false,
			},
			{
				name: `Viticulture (Tabletopia)`,
				id: `viticulture`,
				categories: [
					`tabletop`, `tabletopia`
				],
				extra: [],
				selected: false,
			},
			{
				name: `Tabletop Simulator (Suggest Game)`,
				id: `tts`,
				categories: [
					`tabletop`, `suggest`, `tts`
				],
				extra: [
					{
						name: `Game Suggestion`,
						type: `text`,
						id: `tts-suggestion`,
						value: ``,
						error: ``,
						validate(game_list) {
							if (this.value.length === 0) {
								this.error = `Error: Cannot leave suggestion blank.`;
								return false;
							};

							this.error = ``;
							return true;
						}
					},
					{ type: `note`, value: `<i>This game is paid, you should purchase and download it before the community game night if you are wanting to participate.<br><a href="https://store.steampowered.com/app/286160/Tabletop_Simulator/" target=_blank rel=noopener>Purchase on Steam</a></i>` }
				],
				selected: false,
			},
			{
				name: `Tabletopia (Suggest Game)`,
				id: `tabletopia`,
				categories: [
					`tabletop`, `suggest`, `tabletopia`
				],
				extra: [
					{
						name: `Game Suggestion`,
						type: `text`,
						id: `tabletopia-suggestion`,
						value: ``,
						error: ``,
						validate(game_list) {
							if (this.value.length === 0) {
								this.error = `Error: Cannot leave suggestion blank.`;
								return false;
							};

							this.error = ``;
							return true;
						}
					},
				],
				selected: false,
			},
			{
				name: `Suggest a New Game!`,
				id: `new-game`,
				categories: [
					`suggest`,
				],
				extra: [
					{
						name: `Suggestion`,
						type: `text`,
						id: `new-game-suggestion`,
						value: ``,
						error: ``,
						validate(game_list) {
							if (this.value.length === 0) {
								this.error = `Error: Cannot leave suggestion blank.`;
								return false;
							};
							this.error = ``;
							return true;
						}
					},
					{ type: `note`, value: `This suggestion box is for future game nights, not the one that this voting document is for. All suggestions are reviewed and considered before being added to the voting list.` },
				],
				selected: false,
			},
			{
				name: `Board Games - Free Options Only (Suggest a Game)`,
				id: `free-board-game-suggest`,
				categories: [
					`suggest`,
				],
				extra: [
					{
						name: `Suggestion`,
						type: `text`,
						id: `new-free-board-game-suggestion`,
						value: ``,
						error: ``,
						validate(game_list) {
							if (this.value.length === 0) {
								this.error = `Error: Cannot leave suggestion blank.`;
								return false;
							};
							this.error = ``;
							return true;
						}
					},
				],
				selected: false,
			},
		],
	},
	computed: {
		games() {
			let qs = new URLSearchParams(window.location.search);

			// See if we are just displaying all games
			if (qs.has(`a`) || qs.has(`view`)) { return this.game_list; };

			let games = [];

			let categories = qs.getAll(`c`).map(x => x.toLowerCase());
			let host = qs.get(`h`);
			let games_qs = qs.getAll(`g`).map(x => x.toLowerCase());
			let hide_games = qs.getAll(`hg`).map(x => x.toLowerCase());
			let hide_categories = qs.getAll(`hc`).map(x => x.toLowerCase());

			host = this.hosts[host];

			host.hide.games.push(...hide_games);
			host.hide.categories.push(...hide_categories);

			// Check each game in the array
			for (var game of this.game_list) {

				// Check the host's alias
				if (host) {
					if (this.show_for_host(host, game)) {
						games.push(game);
						continue;
					};
				};

				// Check categories list
				if (categories) {
					if (this.show_category(categories, game, hide_categories, hide_games)) {
						games.push(game);
						continue;
					};
				};

				// Check individual games list
				if (games_qs) {
					if (this.show_game(games_qs, game, hide_games)) {
						games.push(game);
						continue;
					}
				};
			};
			return games;
		},
		non_featured_games() {
			let features = new URLSearchParams(window.location.search).getAll(`feature`);
			return this.games.filter(game => !features.includes(game.id))
		},
		featured_games() {
			let features = new URLSearchParams(window.location.search).getAll(`feature`);
			return this.games.filter(game => features.includes(game.id))
		},
		hasnt_selected() {
			for (var game of this.game_list) {
				if (game.selected) {
					return false;
				};
			};
			return true;
		},
		view_games() {
			let qs = new URLSearchParams(window.location.search);
			return qs.has(`view`);
		},
		invalid_extra_input() {
			for (var game of this.games) {
				if (game.selected && game.extra) {
					for (var extra of game.extra) {
						if (extra.type !== `note`) {
							if (!extra.validate(extra)) {
								return true;
							};
						};
					};
				};
			};
			return false;
		},
	},
	methods: {
		show_for_host(host, game) {
			return this.show_game(host.games, game, host.hide.games)
				|| this.show_category(host.categories, game, host.hide.categories, host.hide.games);
		},
		show_game(games_list, game, hidden_games) {
			return (games_list.includes(game.id)) && (!hidden_games.includes(game.id))
		},
		show_category(categories, game, hidden_categories, hidden_games) {
			let show = false;

			for (var category of categories) {
				if (game.categories.includes(category)) {
					if (!hidden_games.includes(game.id)) {
						show = true;
						break;
					}
				};
			};

			// Check if the game contains a category that is being hidden
			for (var category of hidden_categories) {
				if (game.categories.includes(category)) {
					return false;
				};
			};

			return show;
		},
		compare_games(a, b) {
			let features =
			console.log(features)

			if (features.includes(a.id)) {
				return -1
			} else if (features.includes(b.id)) {
				return 1
			}else{
				return 0
			};
		},
		select_all() {
			for (var game of this.games) {
				game.selected = true;
			};
		},
		deselect_all() {
			for (var game of this.games) {
				game.selected = false;
			};
		},
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