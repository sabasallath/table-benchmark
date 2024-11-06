import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRawComponent } from './table-raw.component';

describe('TableRawComponent', () => {
  let component: TableRawComponent;
  let fixture: ComponentFixture<TableRawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableRawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableRawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
