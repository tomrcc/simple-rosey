# Astro Simple Rosey 

https://rosey.app/docs/

This is a demo for how to use Rosey as a replacement for i18n. It is intended to work much the same as i18n. Rosey reads from a JSON file of translations keys for each locale, with an original phrase and a translation. It uses these to create a multilingual site. You are responsible for creating these locale JSON files. An example of a more complete workflow, where translatable data files are generated automatically for translators to enter translations in CloudCannon, and then generated into the locales files mentioned above, can be found [here](https://github.com/CloudCannon/rcc).

To migrate from i18n to Rosey, see this [guide](https://cloudcannon.com/documentation/guides/rosey-migration-guide/migrating-to-rosey/).

1. Tag your html content for translation
2. Run `npx rosey generate --source dist` (where dist is the output build dir)
3. Create locales files from the base.json
4. Add translations to those locales files
5. Run `npx rosey build --source dist`

A starting point for developers looking to build a website with Astro, using Bookshop components in CloudCannon.

Create your own copy, and start creating your own components to use in the CloudCannon CMS. Build components using `.jsx` or `.astro` files.

To try to cut down on setup time this starter template includes some commonly used [features](#features) in CloudCannon.

This template is aimed at helping developers build sites quickly, rather than providing editors with a fully built editable site. If you are an editor looking for an already built template, have a look at [CloudCannon's templates page](https://cloudcannon.com/templates/).

[See a demo version of this site](https://tiny-jackal.cloudvent.net/).

## Getting Started

To start using this template, go to the [GitHub repository](https://github.com/CloudCannon/astro-starter/), and click `Use this template` to make your own copy.

### Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

### Local Development

1. Clone the repository
2. Run `npm install`
3. Run `npm start`
