import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomantaitionMovieComponent } from './recomantaition-movie.component';

describe('RecomantaitionMovieComponent', () => {
  let component: RecomantaitionMovieComponent;
  let fixture: ComponentFixture<RecomantaitionMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomantaitionMovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecomantaitionMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
