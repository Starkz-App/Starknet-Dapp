export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: 'Starknet Winter Hackathon',
    description: 'Here comes a new challenger!',
    time: 'January 10th, 2025',
    read: false,
    type: 'info',
  },
  {
    id: 2,
    title: 'Open-source Repo',
    description: 'Github repository "Starknet-Dapp" created.',
    time: 'January 10th, 2025',
    read: false,
    type: 'success',
  },
  {
    id: 5,
    title: 'Start your engines',
    description: 'The platform is under active development.',
    time: 'January 10th, 2025',
    read: true,
    type: 'success',
  },
];

