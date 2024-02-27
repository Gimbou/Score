import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsPlayerChartComponent } from './stats-player-chart.component';

describe('StatsPlayerChartComponent', () => {
  let component: StatsPlayerChartComponent;
  let fixture: ComponentFixture<StatsPlayerChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsPlayerChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatsPlayerChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
