export interface DashboardStatistics {
  totalSwaps: number;
  pendingSwaps: number;
  acceptedSwaps: number;
  completedSwaps: number;
}

export interface Reputation {
  trustScore: number;
  totalReviews: number;
  averageRating: number;
}

export interface NotificationSender {
  _id: string;
  name: string;
  avatar?: string;
}

export interface Notification {
  _id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  sender?: NotificationSender;
}

export interface DashboardUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  trustScore: number;
}

export interface DashboardData {
  user: DashboardUser;
  statistics: DashboardStatistics;
  reputation: Reputation;
  recentNotifications: Notification[];
}