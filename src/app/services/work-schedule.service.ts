import { Injectable } from '@angular/core';

export interface WorkScheduleDto {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class WorkScheduleService {
  constructor() {}
}