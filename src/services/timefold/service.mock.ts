import { UserDTO, CreateUserPayload } from '../../types/timefold';

/**
 * A mock user object that matches the UserDTO interface.
 */
export const mockUser1: UserDTO = {
  id: 1,
  name: 'Mocked Leanne Graham',
  username: 'MockBret',
  email: 'Sincere@mock.april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: { lat: '-37.3159', lng: '81.1496' },
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
};

/**
 * A second mock user.
 */
export const mockUser2: UserDTO = {
  id: 2,
  name: 'Mocked Ervin Howell',
  username: 'MockAntonette',
  email: 'Shanna@mock.melissa.tv',
  address: {
    street: 'Victor Plains',
    suite: 'Suite 879',
    city: 'Wisokyburgh',
    zipcode: '90566-7771',
    geo: { lat: '-43.9509', lng: '-34.4618' },
  },
  phone: '010-692-6593 x09125',
  website: 'anastasia.net',
  company: {
    name: 'Deckow-Crist',
    catchPhrase: 'Proactive didactic contingency',
    bs: 'synergize scalable supply-chains',
  },
};

const mockUsers: UserDTO[] = [mockUser1, mockUser2];

// Helper function to simulate network delay
const simulateDelay = <T>(data: T, delayMs: number = 200): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, delayMs);
  });
};


/**
 * Mock service that mimics the real userService but returns
 * predefined data instead of making API calls.
 */
export const userService = {
  
  /**
   * Returns a promise that resolves to a predefined list of users.
   */
  getAllUsers: async (): Promise<UserDTO[]> => {
    console.log('--- MOCK: getAllUsers() called ---');
    // Use Promise.resolve() to immediately return a resolved promise
    // return Promise.resolve(mockUsers);
    
    // Or, to better simulate a network request, add a small delay:
    return simulateDelay([...mockUsers]); // Return a copy
  },

  /**
   * Returns a promise that resolves to a single predefined user.
   */
  getUserById: async (userId: number): Promise<UserDTO> => {
    console.log(`--- MOCK: getUserById(${userId}) called ---`);
    const user = mockUsers.find(u => u.id === userId);
    
    // Simulate a 404
    if (!user) {
      // You could simulate an error:
      // throw new ApiError('Mock Not Found', 404);
      
      // Or just return null
      return simulateDelay(null, 50);
    }
    
    return simulateDelay({ ...user }); // Return a copy
  },

  /**
   * Returns a promise that resolves to a newly "created" mock user.
   */
  createUser: async (userData: CreateUserPayload): Promise<UserDTO> => {
    console.log('--- MOCK: createUser() called ---');
    const newUser: UserDTO = {
      ...mockUser1, // Use a template
      ...userData,  // Overwrite with payload data
      id: Math.floor(Math.random() * 1000) + 10, // Assign a random new ID
    };
    
    return simulateDelay(newUser);
  },
};
