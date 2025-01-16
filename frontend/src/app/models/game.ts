import { Timestamp } from 'firebase/firestore/lite';
import { Player } from './player';

export class Game {
  score?: [number, number];
  players?: Player[];
  startTime?: Date;
  endTime?: Date;
  uploaded?: boolean;
  uploadedBy?: string;
}

export class Season {
  startDate?: Timestamp;
  endDate?: Timestamp;
  name?: string = '';
}
