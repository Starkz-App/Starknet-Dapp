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
    title: 'New Listing',
    description: 'A new IP listing "Quantum Computing Algorithm" has been added.',
    time: '2 minutes ago',
    read: false,
    type: 'info',
  },
  {
    id: 2,
    title: 'Offer Received',
    description: 'You have received an offer for your "AI-powered Image Recognition" listing.',
    time: '1 hour ago',
    read: false,
    type: 'success',
  },
  {
    id: 3,
    title: 'Listing Expiring Soon',
    description: 'Your listing "Novel Drug Delivery System" will expire in 24 hours.',
    time: '5 hours ago',
    read: true,
    type: 'warning',
  },
  {
    id: 4,
    title: 'Payment Received',
    description: 'Payment of $50,000 has been received for your recent sale.',
    time: '1 day ago',
    read: true,
    type: 'success',
  },
  {
    id: 5,
    title: 'System Maintenance',
    description: 'The platform will undergo maintenance in 48 hours. Please save your work.',
    time: '2 days ago',
    read: true,
    type: 'info',
  },
];
