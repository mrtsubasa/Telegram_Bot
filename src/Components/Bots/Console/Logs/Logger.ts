import chalk from 'chalk';
import { format } from 'date-fns';

export class Logger {
	private static instance: Logger;

	private constructor() { }

	public static getInstance(): Logger {
		if (!Logger.instance) {
			Logger.instance = new Logger();
		}
		return Logger.instance;
	}

	private getTimestamp(): string {
		return chalk.dim(`[${format(new Date(), 'HH:mm:ss')}]`);
	}

	public success(message: string, category?: string): void {
		const prefix = chalk.green('✔ SUCCESS');
		const cat = category ? chalk.green(`[${category}]`) : '';
		console.log(`${this.getTimestamp()} ${prefix} ${cat} ${message}`);
	}

	public error(message: string, category?: string): void {
		const prefix = chalk.red('✖ ERROR');
		const cat = category ? chalk.red(`[${category}]`) : '';
		console.log(`${this.getTimestamp()} ${prefix} ${cat} ${message}`);
	}

	public warning(message: string, category?: string): void {
		const prefix = chalk.yellow('⚠ WARNING');
		const cat = category ? chalk.yellow(`[${category}]`) : '';
		console.log(`${this.getTimestamp()} ${prefix} ${cat} ${message}`);
	}

	public info(message: string, category?: string): void {
		const prefix = chalk.blue('ℹ INFO');
		const cat = category ? chalk.blue(`[${category}]`) : '';
		console.log(`${this.getTimestamp()} ${prefix} ${cat} ${message}`);
	}

	public debug(message: string, category?: string): void {
		const prefix = chalk.magenta('🔍 DEBUG');
		const cat = category ? chalk.magenta(`[${category}]`) : '';
		console.log(`${this.getTimestamp()} ${prefix} ${cat} ${message}`);
	}

	public system(message: string, category?: string): void {
		const prefix = chalk.cyan('⚙ SYSTEM');
		const cat = category ? chalk.cyan(`[${category}]`) : '';
		console.log(`${this.getTimestamp()} ${prefix} ${cat} ${message}`);
	}
	public network(message: string, category?: string): void {
		const prefix = chalk.cyan('🌐 NETWORK');
		const cat = category ? chalk.cyan(`[${category}]`) : '';
		console.log(`${this.getTimestamp()} ${prefix} ${cat} ${message}`);
	}

	public security(message: string, category?: string): void {
		const prefix = chalk.red('🔒 SECURITY');
		const cat = category ? chalk.red(`[${category}]`) : '';
		console.log(`${this.getTimestamp()} ${prefix} ${cat} ${message}`);
	}

	public database(message: string, category?: string): void {
		const prefix = chalk.blue('💾 DATABASE');
		const cat = category ? chalk.blue(`[${category}]`) : '';
		console.log(`${this.getTimestamp()} ${prefix} ${cat} ${message}`);
	}

	public performance(message: string, category?: string): void {
		const prefix = chalk.yellow('⚡ PERFORMANCE');
		const cat = category ? chalk.yellow(`[${category}]`) : '';
		console.log(`${this.getTimestamp()} ${prefix} ${cat} ${message}`);
	}

	public api(message: string, category?: string): void {
		const prefix = chalk.magenta('🔌 API');
		const cat = category ? chalk.magenta(`[${category}]`) : '';
		console.log(`${this.getTimestamp()} ${prefix} ${cat} ${message}`);
	}

	public user(message: string, category?: string): void {
		const prefix = chalk.green('👤 USER');
		const cat = category ? chalk.green(`[${category}]`) : '';
		console.log(`${this.getTimestamp()} ${prefix} ${cat} ${message}`);
	}

	public file(message: string, category?: string): void {
		const prefix = chalk.blue('📁 FILE');
		const cat = category ? chalk.blue(`[${category}]`) : '';
		console.log(`${this.getTimestamp()} ${prefix} ${cat} ${message}`);
	}

	public task(message: string, category?: string): void {
		const prefix = chalk.cyan('🔄 TASK');
		const cat = category ? chalk.cyan(`[${category}]`) : '';
		console.log(`${this.getTimestamp()} ${prefix} ${cat} ${message}`);
	}

	public showStatus(data: {
		version: string,
		osInfo: string,
		uptime: number,
		memory: number,
		currentDirectory: string,
		commandsCount: number
	}): void {
		console.log(chalk.bold('\n📊 Status du Système\n'));

		// En-tête
		this.system(`Terminal Pro ${data.version}`);

		// Informations système
		this.info(`OS: ${data.osInfo}`, 'System');
		this.info(`Uptime: ${Math.floor(data.uptime / 60)} minutes`, 'System');
		this.info(`Mémoire libre: ${Math.floor(data.memory / 1024 / 1024)}MB`, 'Memory');

		// État des services (exemple)
		this.success('Database: Connected', 'Services');
		this.success('API: Running', 'Services');
		this.warning('Cache: 75% utilisé', 'Services');

		// Statistiques
		this.info(`Commandes exécutées: ${data.commandsCount}`, 'Stats');
		this.info(`Répertoire actuel: ${data.currentDirectory}`, 'Stats');

		console.log('\n');
	}

	public showAllExamples(): void {
		console.log(chalk.bold('\n📋 Démonstration des différents types de logs:\n'));

		// Logs existants
		this.success('Opération réussie!');
		this.error('Erreur critique!');
		this.warning('Attention!');
		this.info('Information');
		this.debug('Debug message');
		this.system('Message système');

		// Nouveaux logs
		this.network('Connexion établie');
		this.security('Accès autorisé');
		this.database('Query exécutée');
		this.performance('Temps de réponse: 42ms');
		this.api('API Request');
		this.user('Utilisateur connecté');
		this.file('Fichier créé');
		this.task('Tâche en cours');

		console.log(chalk.dim('\nUtilisez "log <type>" pour voir plus d\'exemples de chaque type'));
		console.log(chalk.dim('Types disponibles: success, error, warning, info, debug, system,'));
		console.log(chalk.dim('network, security, database, performance, api, user, file, task\n'));
	}
	public showTypeExamples(type: string): void {
		switch (type.toLowerCase()) {
			case 'success':
				this.success('Opération réussie!');
				this.success('Fichier créé avec succès', 'FileSystem');
				this.success('Configuration sauvegardée', 'Config');
				break;

			case 'error':
				this.error('Erreur critique!');
				this.error('Fichier non trouvé', 'FileSystem');
				this.error('Connection refusée', 'Network');
				break;

			case 'warning':
				this.warning('Attention!');
				this.warning('Espace disque faible', 'System');
				this.warning('Version obsolète', 'Update');
				break;

			case 'info':
				this.info('Information');
				this.info('Synchronisation en cours', 'Sync');
				this.info('Cache mis à jour', 'Cache');
				break;

			case 'debug':
				this.debug('Variable x = 42');
				this.debug('Loading component...', 'UI');
				this.debug('API response received', 'Network');
				break;

			case 'system':
				this.system('Démarrage du système');
				this.system('Service démarré', 'Service');
				this.system('Maintenance programmée', 'Admin');
				break;

			case 'network':
				this.network('Connexion établie');
				this.network('Requête HTTP envoyée', 'Request');
				this.network('Réponse reçue (200 OK)', 'Response');
				break;

			case 'security':
				this.security('Tentative de connexion', 'Auth');
				this.security('Token expiré', 'JWT');
				this.security('Accès refusé', 'Permissions');
				break;

			case 'database':
				this.database('Connexion établie', 'MySQL');
				this.database('Query exécutée', 'Query');
				this.database('Cache mis à jour', 'Cache');
				break;

			case 'performance':
				this.performance('Temps de réponse: 42ms', 'API');
				this.performance('Utilisation CPU: 75%', 'System');
				this.performance('Mémoire: 512MB utilisés', 'Memory');
				break;

			case 'api':
				this.api('GET /users', 'Request');
				this.api('POST /data', 'Request');
				this.api('Rate limit: 980/1000', 'Limits');
				break;

			case 'user':
				this.user('Connexion réussie', 'Auth');
				this.user('Profil mis à jour', 'Profile');
				this.user('Session expirée', 'Session');
				break;

			case 'file':
				this.file('Fichier créé: config.json', 'Create');
				this.file('Lecture: data.txt', 'Read');
				this.file('Suppression: temp.tmp', 'Delete');
				break;

			case 'task':
				this.task('Démarrage de la tâche', 'Backup');
				this.task('Progression: 50%', 'Progress');
				this.task('Tâche terminée', 'Complete');
				break;

			default:
				this.showAllExamples();
		}
	}
}

export default Logger;