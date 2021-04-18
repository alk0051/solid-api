import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";
import { secret } from '../secret';

export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    // replace "secret" with your own credentials
    this.transporter = nodemailer.createTransport(secret);
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    })
  }
}
