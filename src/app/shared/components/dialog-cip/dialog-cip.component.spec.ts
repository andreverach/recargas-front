import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCipComponent } from './dialog-cip.component';

describe('DialogCipComponent', () => {
  let component: DialogCipComponent;
  let fixture: ComponentFixture<DialogCipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
