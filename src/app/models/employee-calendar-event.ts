export interface EmployeeCalendarEvent {
  id: string;        
  employeeId: string; 
  title: string;
  week: number;
  year: number;
  startTime: string; 
  endTime: string;    
}