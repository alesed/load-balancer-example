import { ChildProcess, fork } from "child_process";
import { Server } from "./server";
import { cpus } from "os";

class LoadBalancer {
  constructor() {
    const workers = this.createWorkers(cpus().length);
    this.startServer(workers);
  }

  private createWorkers(numberOfWorkers: number): ChildProcess[] {
    const workers: ChildProcess[] = [];
    for (let i = 0; i < numberOfWorkers; i++) {
      workers.push(this.createWorker());
    }
    return workers;
  }

  private createWorker(): ChildProcess {
    return fork("./src/worker.ts", [], {
      execArgv: ["-r", "ts-node/register"],
    });
  }

  private startServer(workers: ChildProcess[]): void {
    new Server(3000, workers);
  }
}

new LoadBalancer();
