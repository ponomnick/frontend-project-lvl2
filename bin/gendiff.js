#!/usr/bin/env node
import genDiff from '../src/index.js'
import { Command, program } from "commander";

//console.log(genDiff(file1.json, fil2.json))

program
.description('Compares two configuration files and shows a difference.')
.version('1.0.0')
.action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2))
})
.arguments('<filepath1> <filepath2>')
.option('-f, --format <type>', 'output format')
.parse(process.argv);