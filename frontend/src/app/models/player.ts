export class Player {
  id?: number;
  name: string;
  team?: number;
  goals?: number;
  goalsTime?: [{ id: number; time: Date }];
}
