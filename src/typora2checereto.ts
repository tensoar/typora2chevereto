import * as pLimit from "p-limit";

import Chevereto from "./chevereto";
import envArgs from "./parse-args";

async function bootstrap() {
    const limit = pLimit(10);
    const results = await Promise.all(envArgs.imagePaths.map(imagePath =>
        limit(() => Chevereto.upload(imagePath))
    ));
    console.log("Image URLs:");
    results.forEach(res => console.log(res));
}

bootstrap();
