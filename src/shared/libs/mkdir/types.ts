export interface IFile {
  fileName: string;
  dirs?: string[];
}

export interface IFileCreate extends IFile {
  content: string;
}

export interface IFolder {
  folderName: string;
  dirs?: string[];
}

export interface IClass {
  processDir: string;
  folderExist: (props: IFolder) => Promise<boolean>;
  createFolder: (props: IFolder) => Promise<void>;
  deleteFolder: (props: IFolder) => Promise<void>;
  lsFolder: (props: IFolder) => Promise<string[]>;

  fileExist: (props: IFile) => Promise<boolean>;
  createFile: (props: IFileCreate) => Promise<void>;
  deleteFile: (props: IFile) => Promise<void>;
  readFile: (props: IFile) => Promise<string>;
}
