// To use the REAL service:
// import { userService } from './services/userService';

// To use the MOCK service, just change the import:
import { userService } from './services/timefold/service.mock';

import { CreateUserPayload } from './types/timefold';

/**
 * Main function to demonstrate API service usage.
 * This will now run against the mock service.
 */
async function main() {
  console.log('--- TypeScript API Client Demo (RUNNING ON MOCKS) ---');

  // 1. Get all users
  try {
    console.log('\nFetching all users...');
    const users = await userService.getAllUsers();
    console.log(`Successfully fetched ${users.length} mock users.`);
    if (users.length > 0) {
      console.log(`First mock user's name: ${users[0].name}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to fetch users:', error.message);
    } else {
      console.error('An unknown error occurred while fetching users:', error);
    }
  }

  // 2. Get a single user (ID: 1)
  try {
    console.log('\nFetching user with ID 1...');
    const user = await userService.getUserById(1);
    if (user) {
      console.log(`Found user: ${user.name} (Email: ${user.email})`);
    } else {
      console.log('User not found.');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to fetch user 1:', error.message);
    } else {
      console.error('An unknown error occurred while fetching user 1:', error);
    }
  }
  
  // 3. Get a user that doesn't exist (ID: 999)
  try {
    console.log('\nFetching user with ID 999 (should be null)...');
    const user = await userService.getUserById(999);
    if (user) {
      console.log(`Found user: ${user.name}`);
    } else {
      console.log('User 999 not found, as expected.');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to fetch user 999:', error.message);
    } else {
      console.error('An unknown error occurred while fetching user 999:', error);
    }
  }

  // 4. Create a new user
  try {
    console.log('\nCreating a new user...');
    const newUserPayload: CreateUserPayload = {
      name: 'Gemini User (Mocked)',
      username: 'gemini_mock',
      email: 'gemini@mock.example.com',
    };
    const createdUser = await userService.createUser(newUserPayload);
    console.log(`Created mock user: ${createdUser.name} (ID: ${createdUser.id})`);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to create user:', error.message);
    } else {
      console.error('An unknown error occurred while creating user:', error);
    }
  }
}

// Run the main function
main();
