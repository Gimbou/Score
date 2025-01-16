import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ChartData } from 'chart.js';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { StatsService } from '../../services/stats.service';
import { ApiService } from '../../services/api.service';
import { Stat, StatTable, StatGame, StatChartType } from '../../models/stat';
import { Player } from '../../models/player';
import { Season } from '../../models/game';

import { StatsNumbersComponent } from '../../../../src/app/components/stats-numbers/stats-numbers.component';
import { StatsTableComponent } from '../../../../src/app/components/stats-table/stats-table.component';
import { StatsGameComponent } from '../../components/stats-game/stats-game.component';
import { StatsChartComponent } from '../../../../src/app/components/stats-chart/stats-chart.component';
import { StatsPlayerChartComponent } from '../../../../src/app/components/stats-player-chart/stats-player-chart.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { StatsSingleGameComponent } from '../../components/stats-single-game/stats-single-game.component';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    RouterLink,
    FontAwesomeModule,
    StatsNumbersComponent,
    StatsTableComponent,
    StatsGameComponent,
    StatsSingleGameComponent,
    StatsChartComponent,
    StatsPlayerChartComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent implements OnInit {
  seasonsData: Season[] = [];
  numbersData: Stat[] = [];
  tableData: StatTable[] = [];
  gameData: StatGame[] = [];
  chartData: ChartData<'bar'> = { labels: [], datasets: [] };
  playerData: ChartData<
    'line',
    { name: string; goals: number; result: string }[]
  > = {
    datasets: [],
  };
  singleGameData: Player[] = [];

  currentUser: User | null = null;
  showSeasons: boolean = false;
  showStats: boolean = false;
  loadingData: boolean = false;
  showPlayerStats: boolean = false;
  showGameStats: boolean = false;
  userLoggedIn: boolean = false;

  winPercentage = StatChartType.WinPercentage;
  goals = StatChartType.Goals;
  goalsPerGame = StatChartType.GoalsPerGame;

  winPercentageChartSelected = true;
  goalsChartSelected = false;
  gpgChartSelected = false;

  selectedChartType: StatChartType = StatChartType.WinPercentage;

  faXmark = faXmark;

  private _currentUserSubscription: Subscription;

  constructor(
    private statsService: StatsService,
    private apiService: ApiService
  ) {
    this._currentUserSubscription = this.apiService.currentUser.subscribe(
      (value) => {
        this.currentUser = value;

        if (this.currentUser) {
          this.userLoggedIn = true;
        }
      }
    );
  }

  async ngOnInit() {
    this.currentUser = await this.apiService.getCurrentUser();
    await this.getSeasons();
    await this.getStats();
  }

  ngOnDestroy() {
    this._currentUserSubscription.unsubscribe();
  }

  async getSeasons() {
    if (this.currentUser) {
      this.seasonsData = await this.apiService.getSeasons();
    }

    if (this.seasonsData.length) {
      this.showSeasons = true;
    }
  }

  async getStats(seasonIndex: number = 0) {
    if (this.currentUser) {
      this.userLoggedIn = true;
      this.loadingData = true;

      if (seasonIndex > -1 && this.seasonsData.length) {
        if (this.seasonsData[seasonIndex].startDate && !this.seasonsData[seasonIndex].endDate) {
          await this.statsService.generateStats(this.seasonsData[seasonIndex]?.startDate?.toDate());
        } else if (this.seasonsData[seasonIndex].startDate && this.seasonsData[seasonIndex].endDate) {
          await this.statsService.generateStats(this.seasonsData[seasonIndex]?.startDate?.toDate(), this.seasonsData[seasonIndex]?.endDate?.toDate());
        }
      } else {
        await this.statsService.generateStats();
      }

      this.numbersData = this.statsService.getNumbers();
      this.tableData = this.statsService.getTable();
      this.gameData = this.statsService.getGames();
      this.chartData = this.statsService.getChart(StatChartType.WinPercentage);

      if (this.numbersData.length && this.tableData.length) {
        this.showStats = true;
      }

      this.loadingData = false;
    }
  }

  selectSeason(selectedSeason: string) {
    const seasonIndex = this.seasonsData.findIndex(
      (findSeason) => findSeason.name === selectedSeason
    );

    this.getStats(seasonIndex);
    this.showPlayerStats = false;
    this.showGameStats = false;
  }

  changeChart(type: StatChartType) {
    this.chartData = this.statsService.getChart(type);

    if (type === StatChartType.WinPercentage) {
      this.winPercentageChartSelected = true;
      this.goalsChartSelected = false;
      this.gpgChartSelected = false;
      this.selectedChartType = StatChartType.WinPercentage;
    } else if (type === StatChartType.Goals) {
      this.winPercentageChartSelected = false;
      this.goalsChartSelected = true;
      this.gpgChartSelected = false;
      this.selectedChartType = StatChartType.Goals;
    } else if (type === StatChartType.GoalsPerGame) {
      this.winPercentageChartSelected = false;
      this.goalsChartSelected = false;
      this.gpgChartSelected = true;
      this.selectedChartType = StatChartType.GoalsPerGame;
    }
  }

  selectPlayer(player: string) {
    this.playerData = this.statsService.getPlayerChart([player]);
    if (this.playerData.datasets.length) {
      this.showPlayerStats = true;
    } else {
      this.showPlayerStats = false;
    }
  }

  selectGame(game: Date) {
    this.singleGameData = this.statsService.getGame([game]);
    if (this.singleGameData.length) {
      this.showGameStats = true;
    } else {
      this.showGameStats = false;
    }
  }
}
