import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyLawyerComponent } from './family-lawyer.component';

describe('FamilyLawyerComponent', () => {
  let component: FamilyLawyerComponent;
  let fixture: ComponentFixture<FamilyLawyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyLawyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
