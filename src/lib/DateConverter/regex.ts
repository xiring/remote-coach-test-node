export const REGEX = {
  DATE_SEPARATOR: new RegExp(/[./-]/),
  DD_MM_YYYY: new RegExp(/^\d{1,2}[./-]\d{1,2}[./-]\d{4}$/),
  YYYY_MM_DD: new RegExp(/^\d{4}[./-]\d{1,2}[./-]\d{1,2}$/),
  FORMAT_DATE: new RegExp(/\[([^\]]+)]|TZ|Y{4}|M{1,4}|D{1,2}|W{1,4}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|AP|ap/g),
};


