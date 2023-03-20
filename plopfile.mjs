/* @type import("plop").Nodejs */
const camelCase = (str) => {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

const pascalCase = (str) => {
  return (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => {
    return chr.toUpperCase();
  });
};

function snakeCase(str) {
  return str && str.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(s => s.toLowerCase())
    .join("_");
}

const kebabCase = string => string
  .replace(/([a-z])([A-Z])/g, "$1-$2")
  .replace(/[\s_]+/g, "-")
  .toLowerCase();

export default function(
  /** @type {import("plop").NodePlopAPI} */
  plop,
) {
  // create your generators here
  plop.setGenerator("core", {
    description: "Create controller, services and others",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Name of the folder",
      },
      {
        type: "confirm",
        name: "isRepositoryRequired",
        message: "Is Repository Required",
      },
    ],
    actions(data) {
      const getAction = (type) => {
        return {
          type: "add",
          path: `src/core/{{kebabCase name}}/{{kebabCase name}}.${type}.ts`,
          templateFile: `plop-templates/${type}.template.hbs`,
        };
      };

      const actions = [getAction("controller"), getAction("dto"), getAction("routes"), getAction("service")];

      if (data.isRepositoryRequired) {
        actions.push(getAction("entity"));
        actions.push(getAction("repository"));
      }
      return actions;
    },
  });

  plop.setHelper("pascalCase", pascalCase);
  plop.setHelper("camelCase", camelCase);
  plop.setHelper("snakeCase", snakeCase);
  plop.setHelper("kebabCase", kebabCase);
  plop.setHelper("lowerCase", (str) => str.toLowerCase());
};
