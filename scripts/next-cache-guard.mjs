#!/usr/bin/env node
/**
 * Prevents corrupted .next caches when dev and production builds run together.
 * Root cause: next dev (Turbopack) and `next build` share .next — concurrent writes
 * leave missing manifest files and 500 Internal Server Error on all routes.
 */
import { execSync } from "node:child_process";
import { rmSync } from "node:fs";

const DEV_PORTS = [3000, 3001, 3456];

function killDevServers() {
  let stopped = 0;

  for (const port of DEV_PORTS) {
    let pids = [];

    try {
      pids = execSync(`lsof -ti:${port}`, {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      })
        .trim()
        .split("\n")
        .filter(Boolean);
    } catch {
      continue;
    }

    for (const pid of pids) {
      try {
        process.kill(Number(pid), "SIGTERM");
        console.log(`[next-cache-guard] Stopped PID ${pid} on port ${port}`);
        stopped += 1;
      } catch {
        // Process may already be gone.
      }
    }
  }

  if (stopped > 0) {
    execSync("sleep 0.5");
  }
}

function cleanNextCache() {
  rmSync(".next", { recursive: true, force: true });
  console.log("[next-cache-guard] Cleared .next cache");
}

const command = process.argv[2];

switch (command) {
  case "prepare-build":
    killDevServers();
    cleanNextCache();
    break;
  case "prepare-dev":
    killDevServers();
    cleanNextCache();
    break;
  case "kill-dev":
    killDevServers();
    break;
  case "clean":
    cleanNextCache();
    break;
  default:
    console.error(
      "Usage: node scripts/next-cache-guard.mjs <prepare-build|prepare-dev|kill-dev|clean>",
    );
    process.exit(1);
}
