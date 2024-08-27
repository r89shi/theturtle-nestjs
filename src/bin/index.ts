#!/usr/bin/env node

import { text } from '../shared/libs/prompts';
import { Mkdir } from '../shared/libs/mkdir';
import { IJsonRoot, IJsonRootContent } from '../shared/types/nestjs';

console.clear();
const mkdir = new Mkdir();

async function init() {
  const resource = await text({ message: 'What is the resource name?' });

  createMainFolder(resource.idText);
}

async function createMainFolder(name: string) {
  const folderName = spinalCase(name);
  const dirs = [''];

  if (await checkIfFolderExist(folderName, dirs)) {
    console.log('Folder already exists');
    return;
  }

  await mkdir.createFolder({
    folderName,
    dirs
  });

  if (await checkIfFolderExist(folderName, dirs)) {
    console.log('Folder was created');
    await createFolderContent(name, dirs);
  }
}

async function createFolderContent(name: string, dirs: string[]) {
  const folderName = spinalCase(name);
  const subDir = [...dirs, folderName];

  const nestStr: IJsonRoot = JSON.parse(
    await mkdir.readFile({
      fileName: 'nestjs.json',
      dirs: ['database']
    })
  );

  nestStr.root.forEach(async (line) => {
    if (!!line.name) {
      await mkdir.createFolder({
        folderName: line.name,
        dirs: subDir
      });

      if (!!line.sub) {
        line.sub.forEach(async (sub) => {
          const subInternal = [...subDir, line.name];
          createFiles(name, folderName, subInternal, sub);
        });
      }
    }

    createFiles(name, folderName, subDir, line);
  });
}

async function createFiles(
  name: string,
  folderName: string,
  subDir: string[],
  line: IJsonRootContent
) {
  if (!!line.files) {
    line.files.forEach(async (file) => {
      const prefix = !!file.prefix ? `${file.prefix}-` : '';
      const fileName = `${prefix}${folderName}.${file.sufix}.${file.ext}`;
      await await mkdir.createFile({
        fileName,
        dirs: subDir,
        content: file.content
          .join('\n')
          .replace(/\$\{1\}/g, firstLetterUpper(name))
          .replace(/\$\{2\}/g, folderName)
          .replace(/\$\{3\}/g, firstLetterLower(name))
      });
    });
  }
}

async function checkIfFolderExist(folderName: string, dirs: string[]) {
  const folderExist = await mkdir.folderExist({
    folderName,
    dirs
  });

  return folderExist;
}

function spinalCase(str) {
  let lowercase = str.trim();
  let regEx = /\W+|(?=[A-Z])|_/g;
  let result = lowercase.split(regEx).join('-').toLowerCase();

  return result;
}

function firstLetterUpper(name: string): string {
  const resName = name.replace(name[0], name[0].toUpperCase());
  return resName;
}

function firstLetterLower(name: string): string {
  const resName = name.replace(name[0], name[0].toLowerCase());
  return resName;
}

init();
