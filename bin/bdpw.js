#!/usr/bin/env node

const program = require("commander");

program
  .version(require("../package").version)
  .usage("<command> [options]")
  .command("serve", "start dev server")
  .command("build", "build for production");

program.parse(process.argv);
