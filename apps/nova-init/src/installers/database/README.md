# JSON-basiertes Datenbanksystem

Dieses System verwendet separate JSON-Dateien für jede Datenbank, um Docker-Compose-Konfigurationen und Parameter zu verwalten.

## Struktur

```
docker/
├── mongodb.json
├── postgres.json
├── redis.json
├── mysql.json
├── mariadb.json
├── cassandra.json
├── neo4j.json
├── couchdb.json
├── edgedb.json
├── surrealdb.json
├── yugabytedb.json
└── cockroachdb.json
```

## JSON-Struktur

Jede JSON-Datei folgt dieser Struktur:

```json
{
  "name": "database_name",
  "description": "Database description",
  "image": "docker_image:tag",
  "defaultPort": 1234,
  "internalPort": 1234,
  "parameters": {
    "parameterName": {
      "type": "string|number",
      "default": "default_value",
      "description": "Parameter description"
    }
  },
  "dockerCompose": {
    "version": "3.8",
    "services": {
      "service_name": {
        "image": "docker_image:tag",
        "container_name": "${containerName}",
        "environment": {
          "ENV_VAR": "${parameter}"
        },
        "ports": ["${port}:internal_port"],
        "volumes": ["${volumeName}:/data"]
      }
    },
    "networks": {
      "local": {
        "driver": "bridge",
        "name": "${networkName}"
      }
    },
    "volumes": {
      "${volumeName}": {
        "driver": "local",
        "name": "${volumeName}"
      }
    }
  },
  "connectionInfo": {
    "host": "localhost",
    "port": "${port}",
    "connectionString": "protocol://user:pass@host:port/db"
  }
}
```

## Template-Variablen

Template-Variablen werden mit `${parameterName}` definiert und zur Laufzeit durch die tatsächlichen Werte ersetzt.

### Verfügbare Variablen

- `${containerName}` - Name des Docker-Containers
- `${port}` - Port für die Datenbank
- `${networkName}` - Name des Docker-Netzwerks
- `${volumeName}` - Name des Data-Volumes
- `${database}` - Name der Datenbank (für SQL-Datenbanken)
- `${username}` - Benutzername (für SQL-Datenbanken)
- `${password}` - Passwort (für SQL-Datenbanken)

## Verwendung

### Basis-Verwendung
```bash
nova-init add database --database mongodb
```

### Mit benutzerdefinierten Parametern
```bash
nova-init add database --database postgresql --port 5433 --username myuser --password mypass
```

### Hilfe anzeigen
```bash
nova-init add database --help
nova-init add database --database mongodb --help
```

## Neue Datenbank hinzufügen

1. Erstelle eine neue JSON-Datei in `docker/` mit dem Namen `database_name.json`
2. Definiere alle erforderlichen Parameter
3. Stelle sicher, dass die Docker-Image-Referenz korrekt ist
4. Teste die Konfiguration

## Unterstützte Datenbanken

- **MongoDB** - Document-Store
- **PostgreSQL** - Relationale Datenbank
- **MySQL** - Relationale Datenbank
- **MariaDB** - MySQL-kompatible Datenbank
- **Redis** - In-Memory Key-Value Store
- **Cassandra** - Distributed NoSQL
- **Neo4j** - Graph-Datenbank
- **CouchDB** - Document-Store
- **EdgeDB** - Next-Generation Relational
- **SurrealDB** - Multi-Model Database
- **YugabyteDB** - Distributed SQL
- **CockroachDB** - Distributed SQL

## Vorteile

1. **Modularität** - Jede Datenbank hat ihre eigene Konfigurationsdatei
2. **Wartbarkeit** - Einfache Änderungen ohne Code-Modifikation
3. **Erweiterbarkeit** - Neue Datenbanken durch JSON-Datei hinzufügen
4. **Konsistenz** - Einheitliche Struktur für alle Datenbanken
5. **Dokumentation** - Parameter sind direkt in der Konfiguration dokumentiert
