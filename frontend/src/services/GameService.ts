import appConfig from '../config/appConfig';
import { TGameRound } from '../common/types';

class GameService {
  public static async start(userId: string): Promise<TGameRound> {
    const params = new URLSearchParams({ userId });
    const response = await fetch(
      `${appConfig.backendUrl}/game/start?${params}`,
      {
        method: 'POST',
      },
    );
    return response.json();
  }

  public static async getRound(userId: string): Promise<TGameRound> {
    const params = new URLSearchParams({ userId });
    const response = await fetch(
      `${appConfig.backendUrl}/game/round?${params}`,
    );
    return response.json();
  }

  public static async attempt(
    userId: string,
    artistFullName: string,
  ): Promise<TGameRound> {
    const params = new URLSearchParams({ userId, artistFullName });
    const response = await fetch(
      `${appConfig.backendUrl}/game/attempt?${params}`,
      {
        method: 'POST',
      },
    );
    return response.json();
  }

  public static async finish(userId: string): Promise<void> {
    const params = new URLSearchParams({ userId });
    await fetch(`${appConfig.backendUrl}/game/finish?${params}`, {
      method: 'DELETE',
    });
  }
}

export default GameService;
