import path from "path";
import fs from "fs";

export const listFiles = (directoryPath) =>
  new Promise(resolve => {
    const list = [];
    let dirCtr = 1;
    let itemCtr = 0;

    getFiles(directoryPath);

    function getFiles(directory) {
      fs.readdir(directory, (err, items) => {
        dirCtr--;
        itemCtr += items.length;
        items.forEach(item => {
          const fullPath = path.join(directory, item);
          fs.stat(fullPath, (err, stat) => {
            itemCtr--;
            if (stat.isFile()) {
              list.push(fullPath);
            } else if (stat.isDirectory()) {
              dirCtr++;
              getFiles(fullPath);
            }
            if (dirCtr === 0 && itemCtr === 0) {
              resolve(list);
            }
          });
        });
      });
    }
  });
