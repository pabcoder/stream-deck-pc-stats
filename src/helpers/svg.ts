import { readFileSync, fstat, promises } from "fs";

const createSVG = (percentage: number): string => {
  const imageFileName: string = percentage >= 10
    ? percentage.toString().substr(0, percentage.toString().length - 1) + '0'
    : '10';

  const img = readFileSync(`./imgs/percentages/${imageFileName}.png`, { encoding: 'base64' });
  
  return `data:image/png;base64,${img}`;
}

export default createSVG;