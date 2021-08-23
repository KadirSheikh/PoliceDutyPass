import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseBulkComponent } from './choose-bulk.component';

describe('ChooseBulkComponent', () => {
  let component: ChooseBulkComponent;
  let fixture: ComponentFixture<ChooseBulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseBulkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
