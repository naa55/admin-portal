import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseLawComponent } from './case-law.component';

describe('CaseLawComponent', () => {
  let component: CaseLawComponent;
  let fixture: ComponentFixture<CaseLawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseLawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
