import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImamsComponent } from './imams.component';

describe('ImamsComponent', () => {
  let component: ImamsComponent;
  let fixture: ComponentFixture<ImamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
