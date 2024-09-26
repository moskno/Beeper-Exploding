import jsonfile from 'jsonfile';
import{Beeper} from '../models/types';

const DB_FILE_PATH = process.env.DB_FILE_PATH || './data/db.json';

export const writeUserToJsonFile = async (beepers: Beeper[]): Promise<void> => {
    await jsonfile.writeFile(DB_FILE_PATH, beepers);
  };
  
  export const readFromJsonFile = async (): Promise<Beeper[]> => {
    const beepers: Beeper[] = await jsonfile.readFile(DB_FILE_PATH);
    return beepers;
  };