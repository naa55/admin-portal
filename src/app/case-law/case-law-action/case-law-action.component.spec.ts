import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseLawActionComponent } from './case-law-action.component';

describe('CaseLawComponent', () => {
  let component: CaseLawActionComponent;
  let fixture: ComponentFixture<CaseLawActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseLawActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseLawActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
