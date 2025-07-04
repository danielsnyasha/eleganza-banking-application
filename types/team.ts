// @/types/team.ts
export interface BankingTeamDTO {
    email: string;
    lastName: string;
    firstName: string;
    id: string;
    userId: string;
    role: string;
    title: string;
    joinedAt: Date;
    avatar: string | null;
    hubId: string | null;
    businessId: string | null;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      imageUrl: string | null;
    };
  }
  