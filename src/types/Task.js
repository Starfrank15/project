// Task interface structure (for reference):
// {
//   id: string,
//   title: string,
//   description: string,
//   completed: boolean,
//   priority: 'low' | 'medium' | 'high',
//   dueDate: string,
//   createdAt: string,
//   updatedAt: string
// }

// FilterType: 'all' | 'active' | 'completed'

// TaskStats interface structure:
// {
//   total: number,
//   completed: number,
//   active: number,
//   completionPercentage: number
// }

export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

export const FILTER_TYPES = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};