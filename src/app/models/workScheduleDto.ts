import { WorkSchedule } from "../components/work-schedule/work-schedule-list.component";

export interface WorkScheduleDto {
  id?: string;       // facultatif si créé côté backend
  startTime: string; // ex: "09:00"
  endTime: string;   // ex: "17:00"
  day: string;       // ex: "Monday"
  employeeID: string;
  weekNumber: number;
  yearNumber: number;
}

// --- Conversion WorkSchedule (4 inputs) -> DTO ---
export function mapScheduleToDto(
  schedule: WorkSchedule, 
  employeeId: string, 
  weekNumber: number, 
  yearNumber: number
): WorkScheduleDto[] {
  const payload: WorkScheduleDto[] = [];

  for (const day of Object.keys(schedule)) {
    schedule[day].forEach(slot => {
      const startTime = `${slot.startHour.toString().padStart(2,'0')}:${slot.startMinute.toString().padStart(2,'0')}`;
      const endTime = `${slot.endHour.toString().padStart(2,'0')}:${slot.endMinute.toString().padStart(2,'0')}`;
      
      payload.push({
        id: undefined,
        startTime,
        endTime,
        day,
        employeeID: employeeId,
        weekNumber,
        yearNumber
      });
    });
  }

  return payload;
}

// --- Conversion DTO -> WorkSchedule (4 inputs) ---
export function mapDtoToSchedule(dtos: WorkScheduleDto[]): WorkSchedule {
  const schedule: WorkSchedule = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  };

  dtos.forEach(dto => {
    if (!schedule[dto.day]) schedule[dto.day] = [];

    const [startHour, startMinute] = dto.startTime.split(':').map(Number);
    const [endHour, endMinute] = dto.endTime.split(':').map(Number);

    schedule[dto.day].push({ 
      startHour, 
      startMinute, 
      endHour, 
      endMinute 
    });
  });

  return schedule;
}