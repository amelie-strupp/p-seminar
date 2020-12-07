# LateinPSeminar
This was the product of a school project. Located here is the source code for the [website](https://lateinpseminar-4df67.web.app/contents)
## Prerequisites
### Required
[Node.js](https://nodejs.org/en/download/),  especially `npm`

### Optional
[git](https://git-scm.com/downloads) or the official [GitHub CLI](https://cli.github.com/)

## Local installation
To get a local version of this repository running, execute the following commands in your command line.
For git:
```
git clone https://github.com/amelie-strupp/p-seminar.git
cd p-seminar
npm install @angular/cli
```

For the official GitHub:
```
gh repo clone amelie-strupp/p-seminar
cd p-seminar
npm install @angular/cli
```

If you don't want to use any of the GitHub command line interfaces, you can get a local copy of the repository by using the button with the download icon at the top of the main page to download the code as a ZIP file. Then unzip it and navigate to this folder in your command line using the `cd` command like shown in the following block by substituting your individual path.
```
cd your/local/folder
npm install @angular/cli
```

## Development server

To view a live compilation of the code use `ng serve --open`, which displays the output in your default browser. Changes in the source code automatically trigger a recompile.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

To create HTML files from the Angular project to be able to serve them with a standard html server run `ng build`, to create production-ready files use the `--prod` flag after (`ng build --prod`). Output will by default be stored in the `dist` folder. With the `--output-path` flag and a relative path behind it, one can change the location of the files.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Format of language files
Words are encoded as XML-tags with attributes:
-Word (`<w>`)
  -"pos" -> grammar 
  -"notation" -> translation
-Linebreak (`<lb>`) -> line number
-Sentence (`<s>`)
-Clause (`<cl>`)
  -"type='hs'" -> main clause
  -"type='ns'" -> subclause
-Punctuation (`<pc>`)
