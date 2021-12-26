import { validateSync } from "class-validator";
import * as parse from "minimist";
import * as _ from "lodash";

import { EnvArgs } from "./types";

const logger = console;

const argsParsed = parse(process.argv.slice(2));

const envArgs = new EnvArgs();
const baseUrl = argsParsed.baseUrl as string;
envArgs.baseUrl = baseUrl && baseUrl.endsWith('/') ? baseUrl.substring(baseUrl.length - 1) : baseUrl;
envArgs.key = argsParsed.key;
envArgs.imagePaths = argsParsed._ || [];

const errors = validateSync(envArgs);
if (errors.length) {
    errors.forEach(err => _.mapValues(err.constraints, v => console.log(v)));
    logger.error("validate failed, the parameter is incorrect ...");
    process.exit(1);
}

export default envArgs;
