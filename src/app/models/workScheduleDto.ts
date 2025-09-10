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

// Calcul de la semaine courante
function getCurrentWeek(): number {
  const now = new Date();
  const oneJan = new Date(now.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((now.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
  return Math.ceil((numberOfDays + oneJan.getDay() + 1) / 7);
}

// Générer des données de test
export const testWorkScheduleDtos: WorkScheduleDto[] = [
  {
    id: '1',
    startTime: '09:00',
    endTime: '12:00',
    day: 'Monday',
    employeeID: '1',
    weekNumber: getCurrentWeek(),
    yearNumber: 2025
  },
  {
    id: '2',
    startTime: '13:00',
    endTime: '17:00',
    day: 'Monday',
    employeeID: '1',
    weekNumber: getCurrentWeek(),
    yearNumber: 2025
  },
  {
    id: '3',
    startTime: '08:30',
    endTime: '12:30',
    day: 'Tuesday',
    employeeID: '1',
    weekNumber: getCurrentWeek(),
    yearNumber: 2025
  },
  {
    id: '4',
    startTime: '14:00',
    endTime: '18:00',
    day: 'Wednesday',
    employeeID: '1',
    weekNumber: getCurrentWeek(),
    yearNumber: 2025
  },
  {
    id: '5',
    startTime: '08:00',
    endTime: '12:00',
    day: 'Friday',
    employeeID: '1',
    weekNumber: getCurrentWeek(),
    yearNumber: 2025
  },
  {
    id: '6',
    startTime: '14:00',
    endTime: '15:00',
    day: 'Friday',
    employeeID: '1',
    weekNumber: getCurrentWeek(),
    yearNumber: 2025
  },
  {
    id: '8',
    startTime: '16:00',
    endTime: '18:00',
    day: 'Friday',
    employeeID: '1',
    weekNumber: getCurrentWeek(),
    yearNumber: 2025
  },
  {
    id: '9',
    startTime: '14:00',
    endTime: '18:00',
    day: 'Saturday',
    employeeID: '1',
    weekNumber: getCurrentWeek(),
    yearNumber: 2025
  },
  {
    id: '11',
    startTime: '10:00',
    endTime: '12:00',
    day: 'Monday',
    employeeID: '2',
    weekNumber: getCurrentWeek(),
    yearNumber: 2025
  },
  {
    id: '12',
    startTime: '13:00',
    endTime: '15:00',
    day: 'Monday',
    employeeID: '2',
    weekNumber: getCurrentWeek(),
    yearNumber: 2025
  },
  {
    id: '13',
    startTime: '16:30',
    endTime: '18:30',
    day: 'Tuesday',
    employeeID: '2',
    weekNumber: getCurrentWeek(),
    yearNumber: 2025
  },
  {
    id: '14',
    startTime: '09:00',
    endTime: '12:00',
    day: 'Wednesday',
    employeeID: '2',
    weekNumber: getCurrentWeek(),
    yearNumber: 2025
  },
  {
    id: '15',
    startTime: '08:00',
    endTime: '15:00',
    day: 'Friday',
    employeeID: '2',
    weekNumber: getCurrentWeek(),
    yearNumber: 2025
  },
  {
    id: '16',
    startTime: '16:00',
    endTime: '17:00',
    day: 'Friday',
    employeeID: '2',
    weekNumber: getCurrentWeek(),
    yearNumber: 2025
  }
];