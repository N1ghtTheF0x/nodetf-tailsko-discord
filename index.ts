import TClient from "./src/client";

const client = new TClient()

client.login()

process.on("beforeExit",() => client.destroy())