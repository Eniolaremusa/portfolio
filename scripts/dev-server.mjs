#!/usr/bin/env node
/**
 * Persistent local dev server — survives Cursor agent terminal sessions.
 *
 * Agent-started background shells exit after a few minutes, which kills `npm run dev`
 * started from chat. Run this from your own terminal tab instead:
 *
 *   npm run dev:bg      # start detached on :3000
 *   npm run dev:status  # check if running
 *   npm run dev:stop    # stop
 *
 * Foreground dev (closes when you Ctrl+C): npm run dev
 */
import { spawn, execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, unlinkSync, openSync } from "node:fs";
import { join } from "node:path";

const PORT = 3000;
const ROOT = process.cwd();
const PID_FILE = join(ROOT, ".dev-server.pid");
const LOG_FILE = join(ROOT, ".dev-server.log");

function pidsOnPort(port) {
  try {
    return execSync(`lsof -ti:${port}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .trim()
      .split("\n")
      .filter(Boolean)
      .map(Number);
  } catch {
    return [];
  }
}

function isAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function readPidFile() {
  if (!existsSync(PID_FILE)) return null;
  const pid = Number(readFileSync(PID_FILE, "utf8").trim());
  return Number.isFinite(pid) ? pid : null;
}

function clearPidFile() {
  if (existsSync(PID_FILE)) unlinkSync(PID_FILE);
}

function stop() {
  const pid = readPidFile();
  let stopped = 0;

  if (pid && isAlive(pid)) {
    try {
      process.kill(pid, "SIGTERM");
      console.log(`[dev-server] Stopped PID ${pid}`);
      stopped += 1;
    } catch {
      // Already gone.
    }
  }

  for (const portPid of pidsOnPort(PORT)) {
    if (portPid === process.pid) continue;
    try {
      process.kill(portPid, "SIGTERM");
      console.log(`[dev-server] Stopped PID ${portPid} on port ${PORT}`);
      stopped += 1;
    } catch {
      // Already gone.
    }
  }

  clearPidFile();

  if (stopped === 0) {
    console.log(`[dev-server] No dev server running on port ${PORT}`);
  }
}

function status() {
  const pid = readPidFile();
  const portPids = pidsOnPort(PORT);

  if (portPids.length > 0) {
    console.log(`[dev-server] Running on http://localhost:${PORT}`);
    console.log(`[dev-server] PIDs: ${portPids.join(", ")}`);
    if (existsSync(LOG_FILE)) {
      console.log(`[dev-server] Log: ${LOG_FILE}`);
    }
    return;
  }

  if (pid) clearPidFile();
  console.log(`[dev-server] Not running on port ${PORT}`);
  console.log("[dev-server] Start with: npm run dev:bg");
}

function start() {
  const portPids = pidsOnPort(PORT);
  if (portPids.length > 0) {
    console.log(`[dev-server] Already running on http://localhost:${PORT}`);
    console.log(`[dev-server] PIDs: ${portPids.join(", ")}`);
    return;
  }

  const pid = readPidFile();
  if (pid && isAlive(pid)) {
    console.log(`[dev-server] Already running (PID ${pid})`);
    return;
  }

  clearPidFile();

  const logFd = openSync(LOG_FILE, "a");

  const child = spawn("npm", ["run", "dev"], {
    cwd: ROOT,
    detached: true,
    stdio: ["ignore", logFd, logFd],
    env: { ...process.env, FORCE_COLOR: "0" },
  });

  child.unref();
  writeFileSync(PID_FILE, String(child.pid));

  console.log(`[dev-server] Started detached (PID ${child.pid})`);
  console.log(`[dev-server] Local:  http://localhost:${PORT}`);
  console.log(`[dev-server] Log:    ${LOG_FILE}`);
  console.log("[dev-server] Stop with: npm run dev:stop");
  console.log(
    "[dev-server] Tip: run dev:bg from your terminal tab — not from agent chat — so it stays up.",
  );
}

const command = process.argv[2] ?? "status";

switch (command) {
  case "start":
    start();
    break;
  case "stop":
    stop();
    break;
  case "status":
    status();
    break;
  default:
    console.error("Usage: node scripts/dev-server.mjs <start|stop|status>");
    process.exit(1);
}
