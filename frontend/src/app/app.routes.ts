import { Routes } from '@angular/router';

import { navigationGuard } from './guards/navigation.guard';

import { PlayersComponent } from './views/players/players.component';
import { GameComponent } from './views/game/game.component';
import { GoalsComponent } from './views/goals/goals.component';
import { ResultComponent } from './views/result/result.component';
import { SettingsComponent } from './views/settings/settings.component';
import { LoginComponent } from './views/login/login.component';
import { StatsComponent } from './views/stats/stats.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/players',
    pathMatch: 'full',
  },
  {
    path: 'players',
    component: PlayersComponent,
    canActivate: [navigationGuard],
  },
  {
    path: 'game',
    component: GameComponent,
    canActivate: [navigationGuard],
  },
  {
    path: 'goals',
    component: GoalsComponent,
    canActivate: [navigationGuard],
  },
  {
    path: 'result',
    component: ResultComponent,
    canActivate: [navigationGuard],
  },
  {
    path: 'stats',
    component: StatsComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
