import { ChildProcess } from "child_process";
import express, { Express } from "express";

export class Server {
  private readonly workers: ChildProcess[];
  private currentWorkerIndex: number = 0;

  constructor(port: number = 3000, workers: ChildProcess[]) {
    this.workers = workers;
    this.initialize(port);
  }

  private initialize(port: number): void {
    const app = express();
    this.setEndpoints(app);
    app.listen(port, () => {
      console.log(`Server is running at: 'http://localhost:${port}'`);
    });
  }

  private setEndpoints(app: Express): void {
    app.get("/", (_, res) => {
      const worker = this.assignWorker();
      worker.send("something");
      worker.on("message", (msg: string) => {
        res.send(msg);
        return;
      });
    });
  }

  private assignWorker(): ChildProcess {
    const worker = this.workers[this.currentWorkerIndex];
    // console.log(`get worker on index: ${this.currentWorkerIndex}`);
    this.currentWorkerIndex =
      (this.currentWorkerIndex + 1) % this.workers.length;
    return worker;
  }
}
