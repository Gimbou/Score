import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { ChartConfiguration, ChartData } from 'chart.js';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { StatsService } from '../../services/stats.service';
import { ApiService } from '../../services/api.service';
import { Stat, StatTable } from '../../models/stat';

import { StatsNumbersComponent } from '../../../../src/app/components/stats-numbers/stats-numbers.component';
import { StatsTableComponent } from '../../../../src/app/components/stats-table/stats-table.component';
import { StatsChartComponent } from '../../../../src/app/components/stats-chart/stats-chart.component';
import { StatsPlayerChartComponent } from '../../../../src/app/components/stats-player-chart/stats-player-chart.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [FontAwesomeModule, StatsNumbersComponent, StatsTableComponent, StatsChartComponent, StatsPlayerChartComponent, LoadingSpinnerComponent],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  numbersData: Stat[] = [];
  tableData: StatTable[] = [];
  chartData: ChartData<'bar'> = { labels: [], datasets: [] };
  playerData: ChartConfiguration['data'] = { labels: [], datasets: [] };

  currentUser: User | null = null;
  showStats: number = 0;
  loadingData: boolean = false;

  faXmark = faXmark;

  typeWinPercentage: string = 'Win-%';
  typeGoals: string = 'Goals';
  typeGPG: string = 'Goals Per Game';

  private _currentUserSubscription: Subscription;

  constructor(private statsService: StatsService, private apiService: ApiService) {
    this._currentUserSubscription = this.apiService.currentUser.subscribe(
      (value) => {
        this.currentUser = value;
        
        if (this.currentUser) {
          this.showStats = 1;
        }
      }
      );
  }
  
  async ngOnInit() {
    this.currentUser = this.apiService.getCurrentUser();
    
    if (this.currentUser) {
      this.loadingData = true;
      this.showStats = 1;
      await this.statsService.generateStats();

      this.numbersData = this.statsService.getNumbers();
      this.tableData = this.statsService.getTable();
      this.chartData = this.statsService.getChart();
      this.playerData = this.statsService.getPlayerChart('Juha');
      this.loadingData = false;
    }
  }
}
