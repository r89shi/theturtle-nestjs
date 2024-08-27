export interface IJsonRoot {
  root: IJsonRootContent[];
}

export interface IJsonRootContent {
  name: string;
  sub?: IJsonRootContent[];
  files?: IFiles[];
}

export interface IFiles {
  sufix: string;
  prefix: string;
  ext: string;
  content: string[];
}
