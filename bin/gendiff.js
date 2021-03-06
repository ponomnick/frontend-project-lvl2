#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

// console.log(genDiff(file1.json, fil2.json))

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.opts().format));
  })
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .parse(process.argv);
