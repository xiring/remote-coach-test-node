import { __DEV__ } from "./util-fns";

type ExceptionType = "range" | "error" | "type";

const Exception = (type: ExceptionType = "error", message: string) => {
  let bsMsg = "[BS CALENDER]\n" + message;
  switch (type) {
    case "range":
      return new RangeError(bsMsg);
    case "type":
      return new TypeError(bsMsg);
    default:
      return new Error(bsMsg);
  }
};

export const error = (message: string, type?: ExceptionType) => {
  if (!__DEV__) return;
  if (type) throw Exception(type, message);
};

export const warning = (message: string, type?: ExceptionType) => {
  if (!__DEV__) return;
  console.warn("[BS CALENDER WARN]\n", message);
  if (type) throw Exception(type, message);
};
