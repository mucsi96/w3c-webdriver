const path = require('path');
const { getOptions } = require('loader-utils');
const { Application } = require('typedoc');
const fs = require('fs');
const glob = require('glob');

module.exports = function() {
  const options = getOptions(this);
  const app = new Application(options);
  const sourceDir = path.dirname(this.resourcePath);
  const sourceFiles = glob.sync(path.resolve(sourceDir, '**/*.ts'));


  const result = app.converter.convert([this.resourcePath]);

  if (result.errors && result.errors.length) {
    result.errors.map(error => {
      throw new Error(error.messageText);
    });
  }

  const projectObject = app.serializer.projectToObject(result.project);

  const module = projectObject.children.find(
    ({ originalName }) => originalName.replace(/\//g, path.sep) === this.resourcePath
  );

  if (!module) {
    throw new Error(`${this.resourcePath} entry point not found.`);
  }

  module.flags.isEntrypoint = true;

  fs.writeFileSync(path.resolve(__dirname, '../../typedoc.json'), JSON.stringify(projectObject), 'utf8');

  return `export default ${JSON.stringify(projectObject)}`;
};
