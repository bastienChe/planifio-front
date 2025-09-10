import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { WorkSchedule, WorkSlot } from '../components/work-schedule/work-schedule-list.component';
import { mapDtoToSchedule, mapScheduleToDto, testWorkScheduleDtos, WorkScheduleDto } from '../models/workScheduleDto';
@Injectable({ providedIn: 'root' })
export class WorkScheduleService {

  // ⚡ Initialisation avec des données de test
  private fakeDb: WorkScheduleDto[] = [...testWorkScheduleDtos];

  constructor() {
  }

  /**
   * Sauvegarde un planning côté "backend"
   */
  saveSchedule(
    schedule: any,
    employeeId: string,
    weekNumber: number,
    yearNumber: number
  ): Observable<WorkScheduleDto[]> {
    const dtos = mapScheduleToDto(schedule, employeeId, weekNumber, yearNumber);

    // Simule un insert/remplacement dans une "DB"
    this.fakeDb = this.fakeDb.filter(
      dto =>
        !(dto.employeeID === employeeId && dto.weekNumber === weekNumber && dto.yearNumber === yearNumber)
    );
    this.fakeDb.push(...dtos);

    console.log('💾 Sauvegarde fake backend:', this.fakeDb);

    return of(dtos).pipe(delay(500));
  }

  /**
   * Charge un planning depuis le "backend"
   */
  loadSchedule(employeeId: string, weekNumber: number, yearNumber: number): Observable<any> {
    console.log('DB content=', this.fakeDb);
    const dtos = this.fakeDb.filter(
      dto => dto.employeeID === employeeId && dto.weekNumber === weekNumber && dto.yearNumber === yearNumber
    );

    console.log('📥 Chargement fake backend:', dtos);

    return of(mapDtoToSchedule(dtos)).pipe(delay(500));
  }

  /**
   * Retourne tout le contenu de la fakeDb (debug)
   */
  getAll(): Observable<WorkScheduleDto[]> {
    return of(this.fakeDb).pipe(delay(200));
  }
  
}