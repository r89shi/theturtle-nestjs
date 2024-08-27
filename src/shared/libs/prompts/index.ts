import prompts from 'prompts';
import { TRes, IText, IConfirm, IPicker } from './types';

export async function text(props: IText): TRes<'idText'> {
  const response = await prompts({
    type: 'text',
    name: 'idText',
    message: props.message
  });

  return response;
}

export async function confirm(props: IConfirm): TRes<'idConfirm'> {
  const response = await prompts({
    type: 'toggle',
    name: 'idConfirm',
    message: props.message,
    initial: false,
    active: 'yes',
    inactive: 'no'
  });

  return response;
}

export async function picker(props: IPicker): TRes<'idPicker'> {
  const response = await prompts({
    type: 'select',
    name: 'idPicker',
    message: props.message,
    choices: props.choices,
    initial: 0
  });

  return response;
}
