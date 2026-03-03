const { exec } = require("node:child_process");

function checkPostres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      setTimeout(checkPostres, 250);
      return;
    }
    console.log("Postgres está pronto!");
  }
}

checkPostres();
