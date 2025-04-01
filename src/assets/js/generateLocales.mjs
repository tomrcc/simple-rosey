import fs from "fs";
import path from "path";

(async function () {
  // Get the base.json data
  const baseJsonPath = path.join("rosey", "base.json");
  const baseJsonBuffer = await fs.promises.readFile(baseJsonPath);
  const baseJsonData = JSON.parse(baseJsonBuffer);

  // Get the existing locale file data
  const localesDirPath = path.join("rosey", "locales");
  const localesFiles = await fs.promises.readdir(localesDirPath);
  const localesFilesData = {};
  // Loop through the locale files and add their data to an obj with the locale as the key
  await Promise.all(
    localesFiles.map(async (localeFile) => {
      const localeFilePath = path.join(localesDirPath, localeFile);
      const localeFileBuffer = await fs.promises.readFile(localeFilePath);
      const localeFileData = JSON.parse(localeFileBuffer);
      const locale = localeFile.replace(".json", "");
      localesFilesData[locale] = localeFileData;
    })
  );

  // Preserve old keys and their translations, while adding new keys to be translated
  const baseJsonKeys = Object.keys(baseJsonData.keys);
  const existingLocales = Object.keys(localesFilesData);
  const existingLocaleKeys = Object.keys(localesFilesData[existingLocales[0]]);

  // Loop through each locale and update our data
  await Promise.all(
    existingLocales.map(async (locale) => {
      const localeFilePath = path.join(localesDirPath, `${locale}.json`);
      const localeFileData = localesFilesData[locale];
      // For each locale go through the base.json keys and add them to write if they're not in there already
      baseJsonKeys.map((baseJsonKey) => {
        if (!existingLocaleKeys.includes(baseJsonKey)) {
          localeFileData[baseJsonKey] = {
            original: baseJsonData.keys[baseJsonKey].original,
            value: baseJsonData.keys[baseJsonKey].original,
          };
        }
      });

      // Similarly, for each locale delete any keys to write in the locales that don't exist in the base.json because they're no longer used
      existingLocaleKeys.map((existingKey) => {
        if (!baseJsonKeys.includes(existingKey)) {
          delete localeFileData[existingKey];
        }
      });

      // Write back to the locale JSON file with our updated data
      await fs.promises.writeFile(
        localeFilePath,
        JSON.stringify(localeFileData, null, "\t")
      );
      console.log(`Update locale file at ${localeFilePath}`);
    })
  );
})();
