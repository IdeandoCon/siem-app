import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GastadoComponent } from './gastado.component';

describe('GastadoComponent', () => {
  let component: GastadoComponent;
  let fixture: ComponentFixture<GastadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastadoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GastadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
