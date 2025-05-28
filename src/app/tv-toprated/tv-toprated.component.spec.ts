import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvTopratedComponent } from './tv-toprated.component';

describe('TvTopratedComponent', () => {
  let component: TvTopratedComponent;
  let fixture: ComponentFixture<TvTopratedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvTopratedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvTopratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
