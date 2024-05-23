import ITemplateVariable from './ITemplateVariable';

export default interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}
