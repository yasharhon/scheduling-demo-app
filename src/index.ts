import { userService } from './services/userService';
import { CreateUserPayload } from './types/api/userDTO';

/**
 * Main function to demonstrate API service usage.
 */
async function main() {
  console.log('--- TypeScript API Client Demo ---');

  // 1. Get all users
  try {
    console.log('\nFetching all users...');
    const users = await userService.getAllUsers();
    console.log(`Successfully fetched ${users.length} users.`);
    // Log the name of the first user
    if (users.length > 0) {
      console.log(`First user's name: ${users[0].name}`);
    }
  } catch (error) {
    console.error('Failed to fetch users:', error.message);
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
    console.error('Failed to fetch user 1:', error.message);
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
    console.error('Failed to fetch user 999:', error.message);
  }

  // 4. Create a new user
  try {
    console.log('\nCreating a new user...');
    const newUserPayload: CreateUserPayload = {
      name: 'Gemini User',
      username: 'gemini',
      email: 'gemini@example.com',
    };
    const createdUser = await userService.createUser(newUserPayload);
    // Note: JSONPlaceholder returns an ID of 11 for new posts
    console.log(`Created user: ${createdUser.name} (ID: ${createdUser.id})`);
  } catch (error) {
    console.error('Failed to create user:', error.message);
  }
}

// Run the main function
main();
