import minimist from 'minimist';
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import { createDockerCompose, getAvailableDatabases } from '../database/docker-compose.js';

export default async function addDatabase(argv) {
  try {
    const args = minimist(argv);
    let database = args.database;
    let folderName = args.folder || 'database';
    let options = {};

    if (!database) {
      // Interaktives Menü
      const availableDatabases = getAvailableDatabases();
      const { selectedDatabase } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedDatabase',
          message: chalk.cyan('Select a database:'),
          choices: availableDatabases.map(db => ({
            name: `${db.name} (${db.description})`,
            value: db.value
          }))
        }
      ]);
      database = selectedDatabase;

      // Dynamische Felder je nach Datenbank
      if (database === 'mongodb') {
        const answers = await inquirer.prompt([
          { type: 'input', name: 'containerName', message: 'Container Name:', default: 'mongodb' },
          { type: 'input', name: 'database', message: 'Initial Database Name:', default: 'local' },
          { type: 'input', name: 'username', message: 'Root Username:', default: 'admin' },
          { type: 'password', name: 'password', message: 'Root Password:', default: 'password123' },
          { type: 'input', name: 'port', message: 'Port:', default: 27017 },
          { type: 'input', name: 'networkName', message: 'Network Name:', default: 'local_dbs_network' },
          { type: 'input', name: 'configVolume', message: 'Config Volume Name:', default: 'mongodb_config' },
          { type: 'input', name: 'dataVolume', message: 'Data Volume Name:', default: 'mongodb_data' }
        ]);
        options = answers;
      } else if (database === 'postgres') {
        const answers = await inquirer.prompt([
          { type: 'input', name: 'containerName', message: 'Container Name:', default: 'pgsql_db' },
          { type: 'input', name: 'database', message: 'Database Name:', default: 'local' },
          { type: 'input', name: 'username', message: 'User Name:', default: 'admin' },
          { type: 'password', name: 'password', message: 'User Password:', default: 'password123' },
          { type: 'input', name: 'port', message: 'Port:', default: 5432 },
          { type: 'input', name: 'networkName', message: 'Network Name:', default: 'local_dbs_network' },
          { type: 'input', name: 'volumeName', message: 'Volume Name:', default: 'pgsql_db_data' }
        ]);
        options = answers;
      } else if (database === 'mysql') {
        const answers = await inquirer.prompt([
          { type: 'input', name: 'containerName', message: 'Container Name:', default: 'mysql_db' },
          { type: 'password', name: 'rootPassword', message: 'Root Password:', default: 'password123' },
          { type: 'input', name: 'database', message: 'Database Name:', default: 'local' },
          { type: 'input', name: 'username', message: 'User Name:', default: 'admin' },
          { type: 'password', name: 'password', message: 'User Password:', default: 'password123' },
          { type: 'input', name: 'port', message: 'Port:', default: 3306 },
          { type: 'input', name: 'networkName', message: 'Network Name:', default: 'local_dbs_network' },
          { type: 'input', name: 'volumeName', message: 'Volume Name:', default: 'mysql_db_data' }
        ]);
        options = answers;
      } else if (database === 'redis') {
        const answers = await inquirer.prompt([
          { type: 'input', name: 'containerName', message: 'Container Name:', default: 'redis_db' },
          { type: 'input', name: 'port', message: 'Port:', default: 6379 },
          { type: 'input', name: 'networkName', message: 'Network Name:', default: 'local_dbs_network' },
          { type: 'input', name: 'volumeName', message: 'Volume Name:', default: 'redis_db_data' }
        ]);
        options = answers;
      } else if (database === 'cassandra') {
        const answers = await inquirer.prompt([
          { type: 'input', name: 'port', message: 'Cassandra Port:', default: 9042 },
          { type: 'input', name: 'containerName', message: 'Container Name:', default: 'cassandra' },
          { type: 'input', name: 'networkName', message: 'Network Name:', default: 'local_dbs_network' },
          { type: 'input', name: 'volumeName', message: 'Volume Name:', default: 'cassandra_db_data' }
        ]);
        options = answers;
      } else if (database === 'cockroachdb') {
        const answers = await inquirer.prompt([
          { type: 'input', name: 'dbPort', message: 'DB Port:', default: 26257 },
          { type: 'input', name: 'uiPort', message: 'UI Port:', default: 8080 },
          { type: 'input', name: 'containerName', message: 'Container Name:', default: 'cockroachdb' },
          { type: 'input', name: 'networkName', message: 'Network Name:', default: 'local_dbs_network' },
          { type: 'input', name: 'volumeName', message: 'Volume Name:', default: 'cockroachdb_data' }
        ]);
        options = answers;
      } else if (database === 'couchdb') {
        const answers = await inquirer.prompt([
          { type: 'input', name: 'username', message: 'CouchDB Username:', default: 'admin' },
          { type: 'password', name: 'password', message: 'CouchDB Password:', default: 'password123' },
          { type: 'input', name: 'port', message: 'Port:', default: 5984 },
          { type: 'input', name: 'containerName', message: 'Container Name:', default: 'couchdb' },
          { type: 'input', name: 'networkName', message: 'Network Name:', default: 'local_dbs_network' },
          { type: 'input', name: 'volumeName', message: 'Volume Name:', default: 'couchdb_data' }
        ]);
        options = answers;
      } else if (database === 'edgedb') {
        const answers = await inquirer.prompt([
          { type: 'input', name: 'containerName', message: 'Container Name:', default: 'edgedb' },
          { type: 'password', name: 'rootPassword', message: 'Root Password:', default: 'password123' },
          { type: 'input', name: 'port', message: 'Port:', default: 5656 },
          { type: 'input', name: 'networkName', message: 'Network Name:', default: 'local_dbs_network' },
          { type: 'input', name: 'dataVolume', message: 'Data Volume Name:', default: 'edgedb_data' },
          { type: 'input', name: 'schemaVolume', message: 'Schema Volume Name:', default: 'edgedb_schema' }
        ]);
        options = answers;
      } else if (database === 'mariadb') {
        const answers = await inquirer.prompt([
          { type: 'input', name: 'containerName', message: 'Container Name:', default: 'mariadb' },
          { type: 'password', name: 'rootPassword', message: 'Root Password:', default: 'password123' },
          { type: 'input', name: 'database', message: 'Database Name:', default: 'mydatabase' },
          { type: 'input', name: 'username', message: 'User Name:', default: 'admin' },
          { type: 'password', name: 'password', message: 'User Password:', default: 'password123' },
          { type: 'input', name: 'port', message: 'Port:', default: 3306 },
          { type: 'input', name: 'networkName', message: 'Network Name:', default: 'local_dbs_network' },
          { type: 'input', name: 'volumeName', message: 'Volume Name:', default: 'mariadb_data' }
        ]);
        options = answers;
      } else if (database === 'neo4j') {
        const answers = await inquirer.prompt([
          { type: 'input', name: 'containerName', message: 'Container Name:', default: 'neo4j_db' },
          { type: 'input', name: 'httpPort', message: 'HTTP Port:', default: 7474 },
          { type: 'input', name: 'boltPort', message: 'Bolt Port:', default: 7687 },
          { type: 'input', name: 'networkName', message: 'Network Name:', default: 'local_dbs_network' },
          { type: 'input', name: 'dataVolume', message: 'Data Volume Name:', default: 'neo4j_db_data' },
          { type: 'input', name: 'logsVolume', message: 'Logs Volume Name:', default: 'neo4j_db_logs' }
        ]);
        options = answers;
      } else if (database === 'surrealdb') {
        const answers = await inquirer.prompt([
          { type: 'input', name: 'containerName', message: 'Container Name:', default: 'surrealdb' },
          { type: 'input', name: 'username', message: 'Username:', default: 'admin' },
          { type: 'password', name: 'password', message: 'Password:', default: 'password123' },
          { type: 'input', name: 'port', message: 'Port:', default: 8000 },
          { type: 'input', name: 'networkName', message: 'Network Name:', default: 'local_dbs_network' },
          { type: 'input', name: 'volumeName', message: 'Volume Name:', default: 'surrealdb_data' }
        ]);
        options = answers;
      } else if (database === 'yugabytedb') {
        const answers = await inquirer.prompt([
          { type: 'input', name: 'containerName', message: 'Container Name:', default: 'yugabytedb' },
          { type: 'input', name: 'ysqlPort', message: 'YSQL Port:', default: 5433 },
          { type: 'input', name: 'ycqlPort', message: 'YCQL Port:', default: 9042 },
          { type: 'input', name: 'masterPort', message: 'Admin UI Port (Host):', default: 7001 },
          { type: 'input', name: 'tserverPort', message: 'TServer UI Port (Host):', default: 9000 },
          { type: 'input', name: 'networkName', message: 'Network Name:', default: 'local_dbs_network' },
          { type: 'input', name: 'volumeName', message: 'Volume Name:', default: 'yugabytedb_data' }
        ]);
        options = answers;
      }
    } else {
      // CLI-Parameter auswerten
      if (database === 'mongodb') {
        options.containerName = args.containerName || 'mongodb';
        options.database = args.database || 'local';
        options.username = args.username || 'admin';
        options.password = args.password || 'password123';
        options.port = args.port || 27017;
        options.networkName = args.networkName || 'local_dbs_network';
        options.configVolume = args.configVolume || 'mongodb_config';
        options.dataVolume = args.dataVolume || 'mongodb_data';
      } else if (database === 'postgres') {
        options.containerName = args.containerName || 'pgsql_db';
        options.database = args.database || 'local';
        options.username = args.username || 'admin';
        options.password = args.password || 'password123';
        options.port = args.port || 5432;
        options.networkName = args.networkName || 'local_dbs_network';
        options.volumeName = args.volumeName || 'pgsql_db_data';
      } else if (database === 'mysql') {
        options.containerName = args.containerName || 'mysql_db';
        options.rootPassword = args.rootPassword || 'password123';
        options.database = args.database || 'local';
        options.username = args.username || 'admin';
        options.password = args.password || 'password123';
        options.port = args.port || 3306;
        options.networkName = args.networkName || 'local_dbs_network';
        options.volumeName = args.volumeName || 'mysql_db_data';
      } else if (database === 'redis') {
        options.containerName = args.containerName || 'redis_db';
        options.port = args.port || 6379;
        options.networkName = args.networkName || 'local_dbs_network';
        options.volumeName = args.volumeName || 'redis_db_data';
      } else if (database === 'cassandra') {
        options.port = args.port || 9042;
        options.containerName = args.containerName || 'cassandra';
        options.networkName = args.networkName || 'local_dbs_network';
        options.volumeName = args.volumeName || 'cassandra_db_data';
      } else if (database === 'cockroachdb') {
        options.dbPort = args.dbPort || 26257;
        options.uiPort = args.uiPort || 8080;
        options.containerName = args.containerName || 'cockroachdb';
        options.networkName = args.networkName || 'local_dbs_network';
        options.volumeName = args.volumeName || 'cockroachdb_data';
      } else if (database === 'couchdb') {
        options.username = args.username || 'admin';
        options.password = args.password || 'password123';
        options.port = args.port || 5984;
        options.containerName = args.containerName || 'couchdb';
        options.networkName = args.networkName || 'local_dbs_network';
        options.volumeName = args.volumeName || 'couchdb_data';
      } else if (database === 'edgedb') {
        options.containerName = args.containerName || 'edgedb';
        options.rootPassword = args.rootPassword || 'password123';
        options.port = args.port || 5656;
        options.networkName = args.networkName || 'local_dbs_network';
        options.dataVolume = args.dataVolume || 'edgedb_data';
        options.schemaVolume = args.schemaVolume || 'edgedb_schema';
      } else if (database === 'mariadb') {
        options.containerName = args.containerName || 'mariadb';
        options.rootPassword = args.rootPassword || 'password123';
        options.database = args.database || 'mydatabase';
        options.username = args.username || 'admin';
        options.password = args.password || 'password123';
        options.port = args.port || 3306;
        options.networkName = args.networkName || 'local_dbs_network';
        options.volumeName = args.volumeName || 'mariadb_data';
      } else if (database === 'neo4j') {
        options.containerName = args.containerName || 'neo4j_db';
        options.httpPort = args.httpPort || 7474;
        options.boltPort = args.boltPort || 7687;
        options.networkName = args.networkName || 'local_dbs_network';
        options.dataVolume = args.dataVolume || 'neo4j_db_data';
        options.logsVolume = args.logsVolume || 'neo4j_db_logs';
      } else if (database === 'surrealdb') {
        options.containerName = args.containerName || 'surrealdb';
        options.username = args.username || 'admin';
        options.password = args.password || 'password123';
        options.port = args.port || 8000;
        options.networkName = args.networkName || 'local_dbs_network';
        options.volumeName = args.volumeName || 'surrealdb_data';
      } else if (database === 'yugabytedb') {
        options.containerName = args.containerName || 'yugabytedb';
        options.ysqlPort = args.ysqlPort || 5433;
        options.ycqlPort = args.ycqlPort || 9042;
        options.masterPort = args.masterPort || 7001;
        options.tserverPort = args.tserverPort || 9000;
        options.networkName = args.networkName || 'local_dbs_network';
        options.volumeName = args.volumeName || 'yugabytedb_data';
      }
    }

    const targetPath = path.join(process.cwd(), folderName);
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }
    await createDockerCompose(targetPath, database, options);
  } catch (error) {
    console.log(chalk.bold.red('\n╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.red('║') + chalk.bold.white(' ❌ Error during database setup:') + chalk.bold.red('                            ║'));
    console.log(chalk.bold.red('╚════════════════════════════════════════════════════════════╝'));
    console.error(error);
    process.exit(1);
  }
} 