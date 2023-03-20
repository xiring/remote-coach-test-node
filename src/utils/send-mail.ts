import sendGrid from "@sendgrid/mail";
import { compileHandlebar } from "@utils/handlebar/handlebar";

interface MailSenderDetail {
  to: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

/**
 *
 * @param details
 */
const sendMail = async (details: MailSenderDetail) => {
  sendGrid.setApiKey(process.env.MAIL_API_KEY);

  const detail: sendGrid.MailDataRequired = {
    from: process.env.MAIL_SENDER,
    to: details.to,
    subject: details.subject,
    html: compileHandlebar(`mail/${details.template}`, details.data),
  };
  // return;
  try {
    const result = await sendGrid.send(detail);
    logger.success("Mail Sent Successfully", result);
  } catch (err) {
    logger.error("Send Mail Error", err);
  }
};

export default sendMail;
