import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalInterface } from '../interfaces/modal.interfaces';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private refreshSubject = new BehaviorSubject<ModalInterface>({
    refresh: false,
  });
  refresh$ = this.refreshSubject.asObservable();

  triggerRefresh(payload: ModalInterface) {
    this.refreshSubject.next(payload);
  }

  clearRefresh() {
    this.refreshSubject.next({ refresh: false }); // o null si cambias a Subject
  }
}
