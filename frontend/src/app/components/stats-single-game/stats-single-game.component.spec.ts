import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsSingleGameComponent } from './stats-single-game.component';

describe('StatsSingleGameComponent', () => {
  let component: StatsSingleGameComponent;
  let fixture: ComponentFixture<StatsSingleGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsSingleGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatsSingleGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
