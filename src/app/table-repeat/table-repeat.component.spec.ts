import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRepeatComponent } from './table-repeat.component';

describe('TableRepeatComponent', () => {
  let component: TableRepeatComponent;
  let fixture: ComponentFixture<TableRepeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableRepeatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableRepeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
