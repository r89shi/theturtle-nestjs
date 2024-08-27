import fs from 'fs';
import path from 'path';
import { IClass, IFile, IFileCreate, IFolder } from './types';
import { AMBIENT } from '../../constants/ambient';

export class Mkdir implements IClass {
  processDir: string;

  constructor() {
    this.processDir = process.cwd();
  }

  async folderExist(props: IFolder): Promise<boolean> {
    const dir = !props.dirs
      ? path.join(this.processDir, props.folderName)
      : path.join(this.processDir, ...props.dirs, props.folderName);

    return await fs.existsSync(dir);
  }

  async createFolder(props: IFolder): Promise<void> {
    const dir = !props.dirs
      ? path.join(this.processDir, props.folderName)
      : path.join(this.processDir, ...props.dirs, props.folderName);

    await fs.mkdirSync(dir);
  }

  async deleteFolder(props: IFolder): Promise<void> {
    const dir = !props.dirs
      ? path.join(this.processDir, props.folderName)
      : path.join(this.processDir, ...props.dirs, props.folderName);

    await fs.rmdirSync(dir);
  }

  async fileExist(props: IFile): Promise<boolean> {
    const dir = !props.dirs
      ? path.join(this.processDir, props.fileName)
      : path.join(this.processDir, ...props.dirs, props.fileName);

    return await fs.existsSync(dir);
  }

  async lsFolder(props: IFolder): Promise<string[]> {
    // Local
    if (AMBIENT === 'dev') {
      const dir = !props.dirs
        ? path.join(this.processDir, props.folderName)
        : path.join(this.processDir, ...props.dirs, props.folderName);

      return await fs.readdirSync(dir);
    } else {
      const dir = !props.dirs
        ? path.join(__dirname, '../', props.folderName)
        : path.join(__dirname, '../', ...props.dirs, props.folderName);

      return await fs.readdirSync(dir);
    }

    return [];
  }

  async createFile(props: IFileCreate): Promise<void> {
    const dir = !props.dirs
      ? path.join(this.processDir, props.fileName)
      : path.join(this.processDir, ...props.dirs, props.fileName);

    await fs.writeFileSync(dir, props.content);
  }

  async deleteFile(props: IFile): Promise<void> {
    const dir = !props.dirs
      ? path.join(this.processDir, props.fileName)
      : path.join(this.processDir, ...props.dirs, props.fileName);

    await fs.rmSync(dir);
  }

  async readFile(props: IFile): Promise<string> {
    // Local
    if (AMBIENT === 'dev') {
      const dir = !props.dirs
        ? path.join(this.processDir, props.fileName)
        : path.join(this.processDir, ...props.dirs, props.fileName);

      console.log(dir);

      return await fs.readFileSync(dir, { encoding: 'utf8', flag: 'r' });
    } else {
      const dir = !props.dirs
        ? path.join(__dirname, '../', props.fileName)
        : path.join(__dirname, '../', ...props.dirs, props.fileName);

      return await fs.readFileSync(dir, { encoding: 'utf8', flag: 'r' });
    }

    return '';
  }
}
