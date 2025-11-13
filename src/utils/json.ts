/**
 * Fetches and deserializes a JSON file from a given URL.
 * Throws an error if the network response is not 'ok'.
 *
 * @param url The URL path to the JSON file (e.g., '/dataset.json').
 * @returns A Promise that resolves to the parsed JSON data of type T.
 */
export async function loadJsonFile<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Provide more context in the error message
      throw new Error(`Failed to fetch '${url}': ${response.status} ${response.statusText}`);
    }

    // Parse the JSON body and cast it to the expected type T
    const data = await response.json();
    return data as T;

  } catch (error) {
    if (error instanceof Error) {
      // Log the specific error for debugging
      console.error(`Error in loadJsonFile('${url}'):`, error.message);
    } else {
      console.error(`An unknown error occurred while fetching '${url}'`);
    }
    // Re-throw the error so the calling function can handle it
    throw error;
  }
}