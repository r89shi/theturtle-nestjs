import prompts from 'prompts';

export type TRes<T extends string> = Promise<prompts.Answers<T>>;

export interface IText {
  message: string;
}

export interface IConfirm extends IText {}

interface IChoices {
  title: string;
  description: string;
  value: string;
}

export interface IPicker extends IText {
  choices: IChoices[];
}
