process.on("message", (msg) => {
  console.log(`Received message from parent: ${msg}`);

  if (process.send) {
    process.send("Hello from worker!");
  }
});
