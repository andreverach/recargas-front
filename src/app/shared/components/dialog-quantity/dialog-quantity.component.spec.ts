import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogQuantityComponent } from './dialog-quantity.component';

describe('DialogQuantityComponent', () => {
  let component: DialogQuantityComponent;
  let fixture: ComponentFixture<DialogQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
