import { Root } from '../../types/timefold';

/**
 * Service to load the root model object from a local JSON file.
 */
export const modelService = {
  /**
   * Fetches and parses the model.json file from the /public directory.
   */
  async loadModelInput(): Promise<Root> {
    try {
      // We use a standard fetch, not the apiClient,
      // because this is a local static file.
      // Files in the 'public' directory are served from the root '/'.
      const response = await fetch('/dataset.json');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch model.json: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // We cast the parsed JSON to our Root interface.
      // Since these are interfaces (not classes), no "hydration" is needed.
      return data as Root;

    } catch (error) {
      if (error instanceof Error) {
        console.error('Error loading model.json:', error.message);
      }
      throw error;
    }
  }
};
