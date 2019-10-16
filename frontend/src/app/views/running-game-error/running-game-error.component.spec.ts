import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningGameErrorComponent } from './running-game-error.component';

describe('RunningGameErrorComponent', () => {
  let component: RunningGameErrorComponent;
  let fixture: ComponentFixture<RunningGameErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunningGameErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningGameErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
