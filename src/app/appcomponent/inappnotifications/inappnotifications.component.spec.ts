import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InappnotificationsComponent } from './inappnotifications.component';

describe('InappnotificationsComponent', () => {
  let component: InappnotificationsComponent;
  let fixture: ComponentFixture<InappnotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InappnotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InappnotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
