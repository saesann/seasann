// Compile Command
import { readdir } from 'fs/promises';
import { handleCssFile } from '../utils/handleCssFiles';
import { getNameWithNoExt } from '../utils/getNameWithNoExt';
import { handleFile } from '../utils/handleFile';
import chalk from 'chalk';

export async function compile() {
    const files = await readdir('./posts');
    files.forEach(async (element) => {
        console.log(chalk.blue(`Compiling ${element}...\n`));
        await handleFile(element);
        console.log(chalk.green(`Compiled ${element}!\n`));
        const nameWithNoExt = await getNameWithNoExt(element);
        const cssFiles = await readdir('./css');
        cssFiles.forEach(async (cssElement) => {
            const cssNameWithNoExt = await getNameWithNoExt(cssElement);
            if (cssNameWithNoExt == nameWithNoExt) {
                console.log(
                    chalk.blue(`Compiling and injecting ${cssElement}...\n`)
                );
                handleCssFile(cssElement);
                console.log(
                    chalk.green(`Compiled and injected ${cssElement}!\n`)
                );
            } else {
                console.log(
                    `No corresponding ${cssElement} found for ${element}`
                );
            }
        });
    });
}
