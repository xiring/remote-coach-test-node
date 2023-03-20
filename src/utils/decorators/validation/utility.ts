import { registerDecorator, ValidationOptions } from "class-validator";

export const OneOf = (oneOfArray: Array<string>, validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "MaxStringDate",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: `Must be one of ${oneOfArray.join(", ")}`,
        ...validationOptions,
      },
      validator: {
        validate(value: string) {
          return oneOfArray.includes(value);
        },
      },
    });
  };
};
