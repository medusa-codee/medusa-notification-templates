#!/usr/bin/env node

/**
 * Watch script for automatic yalc push
 * Similar to how Medusa handles plugin development
 */

const chokidar = require("chokidar");
const { execFile } = require("child_process");
const path = require("path");
const fs = require("fs");

// Find yalc binary
let yalcBin;
try {
  const yalcPath = require.resolve("yalc");
  yalcBin = path.join(path.dirname(yalcPath), "yalc.js");
  
  // Check if yalc.js exists, if not try yalc binary directly
  if (!fs.existsSync(yalcBin)) {
    yalcBin = path.join(path.dirname(yalcPath), "bin", "yalc.js");
  }
  
  if (!fs.existsSync(yalcBin)) {
    // Fallback to npx yalc
    yalcBin = "npx";
  }
} catch (error) {
  console.warn("⚠️  Could not find yalc in node_modules, using npx");
  yalcBin = "npx";
}

let isBusy = false;

/**
 * Publishes the build output to yalc registry and updates installations
 * Exactly like Medusa handles plugin development - simple and straightforward
 */
function publishChanges() {
  /**
   * Here we avoid multiple publish calls when the filesystem is
   * changed too quickly. This might result in stale content in
   * some edge cases. However, not preventing multiple publishes
   * at the same time will result in race conditions and the old
   * output might appear in the published package.
   */
  if (isBusy) {
    return;
  }
  isBusy = true;

  /**
   * Yalc is meant to be used as a binary and not as a long-lived module import.
   * Therefore we execute it like a command to get desired outcome.
   * Otherwise, yalc behaves flaky.
   */
  // Use 'publish --push --no-scripts' like Medusa does
  // --no-scripts prevents npm scripts from running, which can cause double restarts
  const args = yalcBin === "npx" 
    ? ["yalc", "publish", "--push", "--no-scripts"]
    : ["publish", "--push", "--no-scripts"];

  execFile(
    yalcBin,
    args,
    {
      cwd: process.cwd(),
    },
    (error, stdout, stderr) => {
      isBusy = false;
      if (error) {
        console.error("❌ Error publishing to yalc:", error.message);
        return;
      }
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.error(stderr);
      }
      console.log("✅ Changes published to yalc");
    }
  );
}

// Watch dist folder for changes
// Wait a bit for initial build to complete
setTimeout(() => {
  const watcher = chokidar.watch("dist/**/*", {
    ignoreInitial: true, // Ignore initial files to avoid multiple publishes
    persistent: true,
    ignorePermissionErrors: true,
    awaitWriteFinish: {
      stabilityThreshold: 500, // Wait 500ms for file to stabilize (handles .js + .d.ts compilation)
      pollInterval: 100,
    },
  });

  watcher
    .on("ready", () => {
      console.log("👀 Watching dist/ for changes...");
      // Wait a bit before initial publish to ensure dist is ready
      setTimeout(() => {
        console.log("📦 Initial publish to yalc...");
        publishChanges();
      }, 2000); // Wait 2 seconds to ensure tsc --watch is done
    })
    .on("add", (filePath) => {
      // Ignore .d.ts files - they're always generated with .js files
      if (filePath.endsWith('.d.ts')) {
        return;
      }
      console.log(`➕ File added: ${filePath}`);
      publishChanges();
    })
    .on("change", (filePath) => {
      // Ignore .d.ts files - they're always generated with .js files
      if (filePath.endsWith('.d.ts')) {
        return;
      }
      console.log(`🔄 File changed: ${filePath}`);
      publishChanges();
    })
    .on("unlink", (filePath) => {
      console.log(`🗑️  File removed: ${filePath}`);
      publishChanges();
    })
    .on("error", (error) => {
      console.error("❌ Watcher error:", error);
    });

  // Handle graceful shutdown
  process.on("SIGINT", () => {
    console.log("\n👋 Stopping watcher...");
    watcher.close();
    process.exit(0);
  });

  process.on("SIGTERM", () => {
    console.log("\n👋 Stopping watcher...");
    watcher.close();
    process.exit(0);
  });
}, 1000); // Wait 1 second for initial build to start

