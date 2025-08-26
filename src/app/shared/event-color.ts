import { EventColor } from 'calendar-utils';

// Enum pour éviter les strings magiques
export enum ColorName {
  RED = 'red',
  BLUE = 'blue',
  YELLOW = 'yellow',
}

// Définition des couleurs
export const EVENT_COLORS: Record<ColorName, EventColor> = {
  [ColorName.RED]: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  [ColorName.BLUE]: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  [ColorName.YELLOW]: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

export function getRandomColor(): EventColor {
  const values = Object.values(EVENT_COLORS); // tableau des EventColor
  const randomIndex = Math.floor(Math.random() * values.length);
  console.log("randomIndex"+randomIndex);
  return values[randomIndex];
}

export function getRandomColorName(): ColorName {
  const keys = Object.keys(EVENT_COLORS) as ColorName[];
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
}