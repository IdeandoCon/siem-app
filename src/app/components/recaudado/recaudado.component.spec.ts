import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecaudadoComponent } from './recaudado.component';

describe('RecaudadoComponent', () => {
  let component: RecaudadoComponent;
  let fixture: ComponentFixture<RecaudadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecaudadoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecaudadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
