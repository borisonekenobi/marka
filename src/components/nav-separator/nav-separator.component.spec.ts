import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSeparatorComponent } from './nav-separator.component';

describe('NavSeparatorComponent', () => {
  let component: NavSeparatorComponent;
  let fixture: ComponentFixture<NavSeparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavSeparatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavSeparatorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
