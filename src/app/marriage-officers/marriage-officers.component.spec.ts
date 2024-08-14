import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageOfficersComponent } from './marriage-officers.component';

describe('MarriageOfficersComponent', () => {
  let component: MarriageOfficersComponent;
  let fixture: ComponentFixture<MarriageOfficersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarriageOfficersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarriageOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
