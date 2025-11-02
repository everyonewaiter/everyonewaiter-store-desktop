import dotenv from "dotenv";
import path from "path";
import { generateApi, RawRouteInfo, RouteNameInfo } from "swagger-typescript-api";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.VITE_API_BASE_URL
    : process.env.VITE_API_PROD_URL;

const URI = {
  OWNER: "1.%20Owner",
  DEVICE: "2.%20Device",
};

const projectRoot = path.resolve(__dirname, "../../..");

const actionVerbs = [
  "sign",
  "verify",
  "send",
  "renew",
  "move",
  "apply",
  "complete",
  "cancel",
  "approve",
  "reject",
  "resend",
  "submit",
  "confirm",
  "delete",
  "remove",
  "clear",
];

function toPascalCase(str: string): string {
  const words = str.split(/[-_/]/).filter(Boolean);
  if (words.length === 0) return str;

  return words
    .map((word) => {
      const normalized = word.toLowerCase();
      return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    })
    .join("");
}

function generateMethodName(route: string, method: string): string | null {
  const methodLower = method.toLowerCase();
  const pathStr = route.toLowerCase();

  const allSegments = route.split("/").filter((s) => s && !s.startsWith("v") && !s.match(/^\d+$/));

  const lastSegment = allSegments[allSegments.length - 1];
  const isLastSegmentParam =
    lastSegment && lastSegment.startsWith("{") && lastSegment.endsWith("}");

  const cleanSegments = allSegments.filter((s) => !s.startsWith("{") && !s.endsWith("}"));

  if (cleanSegments.length === 0) return null;

  let methodPrefix: string;
  if (methodLower === "put" || methodLower === "patch") {
    methodPrefix = "update";
  } else if (methodLower === "post") {
    const lastSegment = cleanSegments[cleanSegments.length - 1];
    const lastSegmentLower = lastSegment.toLowerCase();

    const isLastSegmentAction = actionVerbs.some((verb) => lastSegmentLower.includes(verb));
    const isLastSegmentPlural = lastSegmentLower.endsWith("s") && lastSegmentLower.length > 3;

    if (isLastSegmentAction && !isLastSegmentPlural) {
      const lastSegmentWords = lastSegment.split("-");
      const firstWord = lastSegmentWords[0].toLowerCase();
      const isActionFirst = actionVerbs.some(
        (verb) => firstWord === verb || firstWord.startsWith(verb)
      );

      if (isActionFirst && lastSegmentWords.length > 1) {
        const restOfLastSegment = lastSegmentWords.slice(1).join("-");
        const restSegments = cleanSegments.slice(0, -1);
        const restPart =
          restSegments.length > 0
            ? toPascalCase(restSegments.join("-")) + toPascalCase(restOfLastSegment)
            : toPascalCase(restOfLastSegment);
        return `${firstWord}${restPart}`;
      }

      const restSegments = cleanSegments.slice(0, -1);
      const restPart = restSegments.length > 0 ? toPascalCase(restSegments.join("-")) : "";
      return `${lastSegment}${restPart}`;
    }

    const hasActionVerb = actionVerbs.some((verb) => pathStr.includes(verb));

    if (hasActionVerb) {
      return toPascalCase(cleanSegments.join("-"));
    }

    methodPrefix = "add";
  } else {
    methodPrefix = methodLower;
  }

  const baseName = `${methodPrefix}${toPascalCase(cleanSegments.join("-"))}`;

  if (isLastSegmentParam && methodLower === "get") {
    return `${baseName}ById`;
  }

  return baseName;
}

const handleCreateRouteName = (routeNameInfo: RouteNameInfo, rawRouteInfo: RawRouteInfo) => {
  const generatedName = generateMethodName(rawRouteInfo.route, rawRouteInfo.method);

  if (generatedName) {
    return {
      ...routeNameInfo,
      usage: generatedName,
      original: generatedName,
    };
  }

  return routeNameInfo;
};

(async () => {
  Object.keys(URI).forEach(async (key) => {
    const keyword = key.toLowerCase();

    await generateApi({
      url: `${BASE_URL}/documents.json/${URI[key]}`,
      output: path.resolve(projectRoot, `src/renderer/src/api/${keyword}`),
      extractRequestBody: true,
      extractResponseBody: true,
      extractResponseError: true,
      httpClientType: "axios",
      apiClassName: `${toPascalCase(keyword)}Api`,
      modular: true,
      hooks: {
        onCreateRouteName: handleCreateRouteName,
      },
    });
  });
})();
