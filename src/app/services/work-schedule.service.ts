import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { WorkSchedule, WorkSlot } from '../components/work-schedule/work-schedule-list.component';
import { mapDtoToSchedule, mapScheduleToDto, WorkScheduleDto } from '../models/workScheduleDto';

@Injectable({
  providedIn: 'root'
})
export class WorkScheduleService {

  // ⚡ Faux stockage en mémoire (remplace la DB)
  private fakeDb: WorkScheduleDto[] = [];

  constructor() {}

  /**
   * Sauvegarde un planning côté "backend"
   */
  saveSchedule(
    schedule: WorkSchedule,
    employeeId: string,
    weekNumber: number,
    yearNumber: number
  ): Observable<WorkScheduleDto[]> {
    const dtos = mapScheduleToDto(schedule, employeeId, weekNumber, yearNumber);

    // Simule un insert/remplacement dans une "DB"
    this.fakeDb = this.fakeDb.filter(dto => !(dto.employeeID === employeeId && dto.weekNumber === weekNumber && dto.yearNumber === yearNumber));
    this.fakeDb.push(...dtos);

    console.log('💾 Sauvegarde fake backend:', this.fakeDb);

    // Retourne les données sauvegardées avec un petit délai
    return of(dtos).pipe(delay(500));
  }

  /**
   * Charge un planning depuis le "backend"
   */
  loadSchedule(employeeId: string, weekNumber: number, yearNumber: number): Observable<WorkSchedule> {
    const dtos = this.fakeDb.filter(dto => dto.employeeID === employeeId && dto.weekNumber === weekNumber && dto.yearNumber === yearNumber);

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
