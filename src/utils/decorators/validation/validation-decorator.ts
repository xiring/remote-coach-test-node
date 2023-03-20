import { registerDecorator, ValidationDecoratorOptions } from "class-validator";

export const createValidationDecorator = ({
  validator,
  options,
  name,
}: Omit<ValidationDecoratorOptions, "propertyName" | "target">) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: name,
      target: object.constructor,
      propertyName: propertyName,
      options,
      validator,
    });
  };
};
