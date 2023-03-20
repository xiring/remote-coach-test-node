import * as fs from "fs";
import * as path from "path";
import * as handlebars from "handlebars";

export const compileHandlebar = (file: string, data: Object) => {
  const templateFile = fs.readFileSync(
    path.join(__dirname + `/templates/${file}.template.handlebars`),
    "utf-8",
  );
  const template = handlebars.compile(templateFile);

  return template(data);
};
