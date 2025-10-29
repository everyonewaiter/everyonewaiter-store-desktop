import dotenv from "dotenv";
import path from "path";
import { generateApi } from "swagger-typescript-api";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL = process.env.VITE_API_BASE_URL;

const URI = {
  BASE: "1.%20Owner",
  DEVICE: "2.%20Device",
};

const projectRoot = path.resolve(__dirname, "../../..");

(async () => {
  await generateApi({
    url: `${BASE_URL}/documents.json/${URI.BASE}`,
    output: path.resolve(projectRoot, "src/renderer/src/api/base"),
    extractRequestBody: true,
    extractResponseBody: true,
    extractResponseError: true,
    httpClientType: "axios",
    apiClassName: "BaseApi",
    modular: true,
  });

  await generateApi({
    url: `${BASE_URL}/documents.json/${URI.DEVICE}`,
    output: path.resolve(projectRoot, "src/renderer/src/api/device"),
    extractRequestBody: true,
    extractResponseBody: true,
    extractResponseError: true,
    httpClientType: "axios",
    apiClassName: "DeviceApi",
    modular: true,
  });
})();
