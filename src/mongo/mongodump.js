import { exec } from "child_process";

const padNumber = number => String(number).padStart(2, 0);

const getFormattedDate = () => {
  const date = new Date();

  return [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ]
    .map(padNumber)
    .join("-");
};

const mongodump = ({
  host,
  port,
  database,
  username,
  password,
  authDatabase = "admin",
}) => {
  const directoryPath = getFormattedDate();

  const cmd = [
    "mongodump",
    `--host ${host}`,
    `--port ${port}`,
    `--db ${database}`,
    `--authenticationDatabase ${authDatabase}`,
    `--username "${username}"`,
    `--password "${password}"`,
    `--out ${directoryPath}`,
  ].join(" ");

  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }

      console.log(stdout + stderr);
      resolve({directoryPath});
    });
  });
};

export default mongodump;
