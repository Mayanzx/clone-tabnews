import database from "infra/database";

async function status(req, res) {
  const updatedAt = new Date().toISOString();

  const databaseVersion = await database.query("SHOW server_version;");
  const databaseVersionString = databaseVersion.rows[0].server_version;

  const databaseMaxConnections = await database.query("SHOW max_connections;");
  const maxConnectionsString = databaseMaxConnections.rows[0].max_connections;

  const databaseOpenedConnections = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [process.env.POSTGRES_DB],
  });
  const openedConnectionsString = databaseOpenedConnections.rows[0].count;
  console.log("Opened connections query result:", openedConnectionsString);
  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionString,
        max_connections: parseInt(maxConnectionsString),
        opened_connections: openedConnectionsString,
      },
    },
  });
}

export default status;
