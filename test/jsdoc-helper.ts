/**
 * Parses a file and returns the JSDoc-comments as JSON
 * @param filePath Path to a .js file
 */
export async function parseFile(filePath: string): Promise<TDoclet[]> {
    return new Promise((resolve, reject) => {
        var parser = require('jsdoc3-parser');
        parser(filePath, function (error: Error | null, ast: any) {
            if (error) {
                reject(error);
            } else {
                resolve(ast);
            }
        });
    });
}