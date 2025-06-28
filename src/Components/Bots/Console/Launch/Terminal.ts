import { spawn } from 'child_process';
import readline from 'readline';
import chalk from 'chalk';
import path from 'path';
import os from 'os';
import gradient from 'gradient-string';
import figlet from 'figlet';

interface Command {
	name: string;
	description: string;
	category?: string;
	execute: (args: string[]) => Promise<void>;
}

class Terminal {
	private commands: Map<string, Command>;
	private currentDirectory: string;
	private rl: readline.Interface;
	private isRunning: boolean;
	private commandHistory: string[];
	private historyIndex: number;

	constructor() {
		this.commands = new Map();
		this.currentDirectory = process.cwd();
		this.isRunning = false;
		this.commandHistory = [];
		this.historyIndex = -1;

		this.rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
			prompt: this.getPrompt(),
			historySize: 100,
		});

		this.initializeCommands();
	}

	private getPrompt(): string {
		const username = chalk.bold.magenta(os.userInfo().username);
		const separator = chalk.grey('⟫');
		const folder = chalk.cyan(path.basename(this.currentDirectory));
		const arrow = chalk.bold.green('➜');

		return `${username} ${separator} ${folder} ${arrow} `;
	}

	private initializeCommands(): void {
		this.registerCommand({
			name: 'cd',
			description: 'Change le répertoire courant',
			category: 'Navigation',
			execute: async (args) => {
				const newPath = args[0] || os.homedir();
				const resolvedPath = path.resolve(this.currentDirectory, newPath);

				try {
					process.chdir(resolvedPath);
					this.currentDirectory = process.cwd();
					this.rl.setPrompt(this.getPrompt());
				} catch (error) {
					console.error(this.formatError(`Impossible d'accéder au répertoire: ${(error as any).message}`));
				}
			}
		});

		this.registerCommand({
			name: 'clear',
			description: 'Efface l\'écran',
			category: 'System',
			execute: async () => {
				console.clear();
				this.showWelcomeMessage();
			}
		});

		this.registerCommand({
			name: 'help',
			description: 'Affiche l\'aide',
			category: 'System',
			execute: async () => {
				this.showHelp();
			}
		});

		this.registerCommand({
			name: 'exit',
			description: 'Quitte le terminal',
			category: 'System',
			execute: async () => {
				this.stop();
			}
		});
	}

	private formatError(message: string): string {
		return `${chalk.red('✖')} ${chalk.bold.red('Erreur:')} ${message}`;
	}

	private formatSuccess(message: string): string {
		return `${chalk.green('✔')} ${message}`;
	}

	private formatInfo(message: string): string {
		return `${chalk.blue('ℹ')} ${message}`;
	}

	private showWelcomeMessage(): void {
		console.clear();
		figlet('Clarity Terminal', (err: string, data: string) => {
			if (err) {
				console.log(gradient.fruit.multiline('Clarity Terminal'));
			} else {
				console.log(gradient.morning.multiline(data));
			}
			console.log('\n' + chalk.dim('Version 1.0.0 - Développé avec ♥ par Tsubasa\n'));
			console.log(this.formatInfo('Tapez "help" pour voir la liste des commandes\n'));
		});
	}

	private showHelp(): void {
		console.log(chalk.bold('\n📚 Liste des commandes disponibles:\n'));

		// Grouper les commandes par catégorie
		const categorizedCommands = new Map<string, Command[]>();
		this.commands.forEach(cmd => {
			const category = cmd.category || 'Autre';
			if (!categorizedCommands.has(category)) {
				categorizedCommands.set(category, []);
			}
			categorizedCommands.get(category)!.push(cmd);
		});

		// Afficher les commandes par catégorie
		categorizedCommands.forEach((commands, category) => {
			console.log(chalk.yellow(`\n${category}:`));
			commands.forEach(cmd => {
				console.log(`  ${chalk.green(cmd.name.padEnd(15))} ${chalk.dim(cmd.description)}`);
			});
		});
		console.log('\n');
	}

	public registerCommand(command: Command): void {
		this.commands.set(command.name, command);
	}

	private async executeCommand(input: string): Promise<void> {
		const [commandName, ...args] = input.trim().split(' ');

		if (!commandName) return;

		const command = this.commands.get(commandName);

		if (command) {
			try {
				await command.execute(args);
			} catch (error) {
				console.error(chalk.red(`Erreur lors de l'exécution de ${commandName}: ${(error as any).message}`));
			}
		} else {
			// Si ce n'est pas une commande interne, on l'exécute comme une commande système
			await this.executeSystemCommand(commandName, args);
		}
	}

	private executeSystemCommand(command: string, args: string[]): Promise<void> {
		return new Promise((resolve, reject) => {
			const childProcess = spawn(command, args, {
				stdio: 'inherit',
				shell: true,
				cwd: this.currentDirectory
			});

			childProcess.on('error', (error) => {
				console.error(chalk.red(`Erreur: ${(error as any).message}`));
				resolve();
			});

			childProcess.on('close', (code) => {
				if (code !== 0) {
					console.error(chalk.red(`La commande s'est terminée avec le code ${code}`));
				}
				resolve();
			});
		});
	}

	public start(): void {
		if (this.isRunning) return;

		this.isRunning = true;
		this.showWelcomeMessage();

		this.rl.prompt();

		this.rl.on('line', async (line) => {
			if (!this.isRunning) {
				this.rl.close();
				return;
			}

			const trimmedLine = line.trim();
			if (trimmedLine) {
				this.commandHistory.unshift(trimmedLine);
				await this.executeCommand(trimmedLine);
			}
			if (this.isRunning) {
				this.rl.prompt();
			}
		});

		this.rl.on('SIGINT', () => {
			if (!this.isRunning) return;
			console.log(chalk.yellow('\n\n↪ Pour quitter, tapez "exit" ou pressez Ctrl+D'));
			this.rl.prompt();
		});

		this.rl.on('close', () => {
			this.stop();
		});
	}

	public stop(): void {
		if (!this.isRunning) return;

		this.isRunning = false;
		console.log(gradient.pastel('\n👋 Au revoir!\n'));
		this.rl.close();
		process.exit(0);
	}

	public restart(): void {
		this.stop();
		this.start();
	}

	// Méthode pour ajouter des commandes personnalisées
	public addCustomCommand(name: string, description: string, action: (args: string[]) => Promise<void>): void {
		this.registerCommand({
			name,
			description,
			execute: action
		});
	}
}

export default Terminal;

