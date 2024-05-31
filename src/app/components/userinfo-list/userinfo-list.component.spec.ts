import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfoListComponent } from './userinfo-list.component';

describe('UserinfoListComponent', () => {
  let component: UserinfoListComponent;
  let fixture: ComponentFixture<UserinfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserinfoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserinfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
