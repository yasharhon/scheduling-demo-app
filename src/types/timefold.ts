/**
 * Represents the data structure for a User
 * as returned by the external API.
 */
export interface UserDTO {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

/**
 * You can also define DTOs for request bodies (Payloads)
 * e.g., for creating a new user.
 */
export interface CreateUserPayload {
  name: string;
  email: string;
  username: string;
}
