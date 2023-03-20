import { ValidationError } from "class-validator";

export const getValidationError = (errors: ValidationError[]) => {
  let valErrors: { [key: string]: Array<string> } = {};

  for (const error of errors) {
    if (error.children.length) getValidationError(error.children);
    else {
      let valError: Array<string> = [];
      const errorConstraints = error.constraints;
      for (const constraint in errorConstraints) valError.push(errorConstraints[constraint]);
      valErrors = { ...valErrors, [error.property]: valError.reverse() } as any;
    }
  }
  return valErrors;
};
