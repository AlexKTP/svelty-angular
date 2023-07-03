import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';



import { CreateformComponent } from './createform.component';
import { DatePipe } from '@angular/common';

describe('CreateformComponent', () => {
  let component: CreateformComponent;
  let fixture: ComponentFixture<CreateformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateformComponent],
      providers: [DatePipe],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(CreateformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
