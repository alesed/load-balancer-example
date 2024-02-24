import { fork } from "child_process";

console.log("Hello, world!");

const worker = fork("./src/worker.ts", [], {
  execArgv: ["-r", "ts-node/register"],
});

worker.on("message", (msg) => {
  console.log(`Received message from worker: ${JSON.stringify(msg)}`);
});

worker.send("Hello from index!");
