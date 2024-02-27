import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsNumbersComponent } from './stats-numbers.component';

describe('StatsNumbersComponent', () => {
  let component: StatsNumbersComponent;
  let fixture: ComponentFixture<StatsNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsNumbersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatsNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
