import axios from "axios";
export class AuthHeaders {
  static async fromEmailAndPassword(email: string, password: string) {
    return {
      Authorization: `Bearer ${await this.getIdTokenWithEmailAndPassword(
        email,
        password
      )}`,
    };
  }
  private static async getIdTokenWithEmailAndPassword(
    email: string,
    password: string
  ) {
    const { data } = await axios.post(
      `http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API-KEY]`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    return data.idToken;
  }
}
