import { Command, program } from "commander";

const genDiff = () => {
    const programm = new Command()
    program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    program.parse();
}
export default genDiff;