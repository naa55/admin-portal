import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GazetteRequestComponent } from './gazette-request.component';

describe('GazetteRequestComponent', () => {
  let component: GazetteRequestComponent;
  let fixture: ComponentFixture<GazetteRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GazetteRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GazetteRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
