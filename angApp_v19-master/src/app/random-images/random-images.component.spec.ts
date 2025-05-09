import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomImagesComponent } from './random-images.component';

describe('RandomImagesComponent', () => {
  let component: RandomImagesComponent;
  let fixture: ComponentFixture<RandomImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
