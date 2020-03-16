import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonaComponent } from './dona.component';

describe('DonaComponent', () => {
  let component: DonaComponent;
  let fixture: ComponentFixture<DonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
