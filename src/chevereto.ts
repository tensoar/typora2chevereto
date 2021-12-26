import axios, { AxiosResponse } from "axios";
import { existsSync, readFileSync } from "fs";
import * as mimeTypes from "mime-types";
import * as qs from "qs";

import envArgs from "./parse-args";

const logger = console;

axios.defaults.baseURL = `${envArgs.baseUrl}/api/1`;

export default class Chevereto {

    private static async postUpload(data: string): Promise<string> {
        try {
            const resp = await axios.post('upload', qs.stringify({
                key: envArgs.key,
                source: data,
                format: 'json'
            }), {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            });
            const body = resp.data;
            // console.log('body = ', body)
            if (!body) {
                return 'body received is null ...';
            }
            if (!body.status_code || Math.floor(body.status_code / 100) !== 2) {
                return 'status code is incorrect ...';
            }
            return body.image.url;
        } catch (e) {
            logger.error(e);
            return "upload failed ...";
        }
    }

    private static readLocalImageAsBase64(imagePath: string) {
        try {
            const mime = mimeTypes.lookup(imagePath).toString();
            if (!mime || !mime.includes('image')) {
                return null;
            }
            return readFileSync(imagePath).toString("base64");
        } catch (e) {
            logger.error(e);
            return null;
        }
    }

    static async upload(imagePath: string): Promise<string> {
        if (imagePath.startsWith('http')) {
            return this.postUpload(imagePath);
        }
        if (!existsSync(imagePath)) {
            return 'image path does not exist ...';
        }
        const base64Content = this.readLocalImageAsBase64(imagePath);
        if (!base64Content) {
            return 'load image failed ...';
        }
        return this.postUpload(base64Content);
    }
}
