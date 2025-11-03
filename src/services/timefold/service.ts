import ApiClient, { ApiError } from '../apiClient';
import { UserDTO, CreateUserPayload } from '../types/api/userDTO';

/**
 * Service to manage user-related API calls.
 */
export const timefoldService = {

    apiClient: new ApiClient(),
  
  /**
   * Fetches a list of all users.
   * @returns A promise that resolves to an array of UserDTOs.
   */
  getAllUsers: async (): Promise<UserDTO[]> => {
    try {
      const us
      // Haners = await apiClient.get<UserDTO[]>('/users');
      return users;
    } catch (error) {
      console.error('Error fetching all users:', error);
      // Re-throw or handle as needed
      throw error;
    }
  },

  /**
   * Fetches a single user by their ID.
   * @param userId - The ID of the user to fetch.
   * @returns A promise that resolves to a single UserDTO.
   */
  getUserById: async (userId: number): Promise<UserDTO> => {
    try {
      const user = await apiClient.get<UserDTO>(`/users/${userId}`);
      return user;
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        console.warn(`User with id ${userId} not found.`);
        return null; // Or throw a more specific "NotFound" error
      }
      console.error(`Error fetching user ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Creates a new user.
   * @param userData - The data for the new user.
   * @returns A promise that resolves to the created UserDTO (API-dependent).
   */
  createUser: async (userData: CreateUserPayload): Promise<UserDTO> => {
    try {
      // The response type <UserDTO> assumes the API returns the created object
      const newUser = await apiClient.post<UserDTO, CreateUserPayload>('/users', userData);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
};
