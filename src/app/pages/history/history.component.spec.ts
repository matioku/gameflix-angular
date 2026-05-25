import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryComponent } from './history.component';
import { HistoryService } from '../../core/services/history.service';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryComponent],
      providers: [
        HistoryService,
        provideHttpClient(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
