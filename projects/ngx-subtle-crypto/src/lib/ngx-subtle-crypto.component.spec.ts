import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSubtleCryptoComponent } from './ngx-subtle-crypto.component';

describe('NgxSubtleCryptoComponent', () => {
  let component: NgxSubtleCryptoComponent;
  let fixture: ComponentFixture<NgxSubtleCryptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSubtleCryptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSubtleCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
