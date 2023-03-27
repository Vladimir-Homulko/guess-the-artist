import { TUser } from '../common/types';
import appConfig from '../config/appConfig';

class UserService {
  public static async createUser(username: string): Promise<TUser> {
    const response = await fetch(`${appConfig.backendUrl}/user/enter-to-game`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();

    return {
      id: data._id,
      username: data.username,
      points: data.points,
    };
  }

  public static async getTopPlayers(): Promise<TUser[] | []> {
    const response = await fetch(`${appConfig.backendUrl}/user/top-players`);

    return response.json();
  }
}

export default UserService;
