import { registerDecorator, ValidationOptions } from "class-validator";
import { isAfter, isBefore, isEqual } from "date-fns";
import { formatDate } from "@utils/date";

export const MinStringDate = (date: Date | string, validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "MinStringDate",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: `Date Must not be smaller than ${formatDate(date)}`,
        ...validationOptions,
      },
      validator: {
        validate(value: string) {
          return (
            isEqual(new Date(value), new Date(date)) || isAfter(new Date(value), new Date(date))
          );
        },
      },
    });
  };
};

export const MaxStringDate = (date: Date | string, validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "MaxStringDate",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: `Date Must not be greater than ${formatDate(date)}`,
        ...validationOptions,
      },
      validator: {
        validate(value: string) {
          return (
            isEqual(new Date(value), new Date(date)) || isBefore(new Date(value), new Date(date))
          );
        },
      },
    });
  };
};
