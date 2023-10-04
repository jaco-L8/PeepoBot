const { REST, Routes } = require('discord.js');
const { clientId, guildIdA, guildIdB, token } = require('./config.json');
const fs = require('fs');
const path = require('path');

const commandsA = [];
const commandsB = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			if (folder === 'boys') {
				// Only add the command to the list if it's in the 'boys' folder
				commandsB.push(command.data.toJSON());
			} else {
				// Add all other commands to the list
				commandsA.push(command.data.toJSON());
			}
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		if (commandsA.length > 0) {
			console.log(`Started refreshing ${commandsA.length} application (/) commands for guildIdA.`);

			// The put method is used to fully refresh all commands in the guild with the current set
			const dataA = await rest.put(
				Routes.applicationGuildCommands(clientId, guildIdA),
				{ body: commandsA },
			);

			console.log(`Successfully reloaded ${dataA.length} application (/) commands for guildIdA.`);
		}

		if (commandsB.length > 0) {
			console.log(`Started refreshing ${commandsB.length} application (/) commands for guildIdB.`);

			// The put method is used to fully refresh all commands in the guild with the current set
			const dataB = await rest.put(
				Routes.applicationGuildCommands(clientId, guildIdB),
				{ body: commandsB },
			);

			console.log(`Successfully reloaded ${dataB.length} application (/) commands for guildIdB.`);
		}
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();