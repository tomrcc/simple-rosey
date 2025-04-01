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

  const baseJsonKeys = Object.keys(baseJsonData.keys);
  const existingLocales = Object.keys(localesFilesData);
  // Use the first locale to find the keys currently in locales files - they should all have the same keys to translate
  const existingLocaleKeys = Object.keys(localesFilesData[existingLocales[0]]);

  // Preserve old keys and their translations
  // When adding new keys to be translated use their original phrase as a placeholder so the content isn't empty
  // For each locale, loop through they keys in our base.json and add any new ones to the locale files
  await Promise.all(
    existingLocales.map(async (locale) => {
      const localeFilePath = path.join(localesDirPath, `${locale}.json`);
      const localeFileData = localesFilesData[locale];
      // For each locale go through the base.json keys and add them to write if they're not in there already
      baseJsonKeys.map((baseJsonKey) => {
        if (!existingLocaleKeys.includes(baseJsonKey)) {
          console.log(`Found key ${baseJsonKey} to add to locales!`);
          localeFileData[baseJsonKey] = {
            original: baseJsonData.keys[baseJsonKey].original,
            value: baseJsonData.keys[baseJsonKey].original,
          };
        }
      });

      // For each locale, delete any keys to write in the locales that don't exist in the base.json
      existingLocaleKeys.map((existingKey) => {
        if (!baseJsonKeys.includes(existingKey)) {
          console.log(
            `Key ${existingKey} no longer exists in our base.json - deleting from locales now...`
          );
          delete localeFileData[existingKey];
        }
      });

      const localeDataToWrite = {};
      // Sort the locales file so that it doesn't change randomly each build
      const keysForLocale = Object.keys(localeFileData);
      keysForLocale.sort().map((key) => {
        localeDataToWrite[key] = localeFileData[key];
      });

      // Write back to the locale JSON file with our updated data
      await fs.promises.writeFile(
        localeFilePath,
        JSON.stringify(localeDataToWrite, null, "\t")
      );
      console.log(`Updated locale file at ${localeFilePath}`);
    })
  );
})();
