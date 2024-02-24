process.on("message", (msg) => {
  console.log(`Received message from parent: ${msg}`);

  if (!process.send) {
    return;
  }
  // Do some work
  process.send(`Hello from worker ${msg}!`);
});
