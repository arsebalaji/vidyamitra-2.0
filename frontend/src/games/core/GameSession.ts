export interface GameSession {
  id: string;
  profileId: string;
  gameId: string;
  startedAt: number;
  finishedAt?: number;
  correct: number;
  attempts: number;
}
