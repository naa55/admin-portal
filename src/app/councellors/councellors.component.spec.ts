import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncellorsComponent } from './councellors.component';

describe('CouncellorsComponent', () => {
  let component: CouncellorsComponent;
  let fixture: ComponentFixture<CouncellorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouncellorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouncellorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
