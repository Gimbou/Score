export class Player {
  id?: number;
  name!: string;
  selected: boolean = true;
  team?: number;
  goals?: number;
  goalsTime?: [{ id: number; time: Date }];
}
