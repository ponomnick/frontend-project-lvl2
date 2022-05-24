import { Command, program } from "commander";

const genDiff = () => {
    //const programm = new Command()
//console.log('12')
}
    program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .action(genDiff)
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format <type>', 'output format')
    .parse(process.argv);
export default genDiff;