import { TUser } from '../common/types';
import { appConfig } from '../config/appConfig';

export class UserService {

  public static async startGame(username: string): Promise<TUser> {
    const response = await fetch(
      `${appConfig.backendUrl}/user/start-game`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ username }),
      }
    );
    const data = await response.json();

    return {
      id: data._id,
      username: data.username,
      points: data.points,
    }
  }

  public static async getById(id: string): Promise<TUser> {
    const response = await fetch(
      `${appConfig.backendUrl}/user/${id}`
    );
    const data = await response.json();

    return {
      id: data._id,
      username: data.username,
      points: data.points,
    }
  }
}
