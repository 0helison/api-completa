import IMailContact from './IMailContact';
import IParseMailTemplate from './IParseMailTemplate';

export default interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}
