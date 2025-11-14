import { Root, JobCreationResponse, JobStatusResponse } from '../../types/timefold';
import {loadJsonFile} from '../../utils/json';


/**
 * Service to load the root model object from a local JSON file.
 */
export const modelService = {
  /**
   * Fetches and parses the model.json file from the /public directory.
   */
  async loadModelInput(): Promise<Root> {
    return loadJsonFile<Root>('/dataset.json');
  },

  /**
   * Simulates POSTing the modified data to the Timefold solver API,
   * which starts an ASYNCHRONOUS solving job.
   *
   * @param modifiedTimefoldInput The Timefold 'Root' object (or specific payload)
   * containing the user's changes (e.g., pinned visits).
   * @returns A Promise that resolves to a job status object.
   */
  async postSolutionRequest(modifiedTimefoldInput: Root): Promise<JobCreationResponse> {
    return loadJsonFile<JobCreationResponse>('/jobrequest.json');
  },

  /**
   * Simulates GETing the status of a job from the Timefold solver API.
   *
   * @param jobId The ID of a job in the Timefold API.
   * @returns A Promise that resolves to a job status object.
   */
  async getSolutionStatus(jobId: string): Promise<JobStatusResponse> {
    return loadJsonFile<JobStatusResponse>('/jobresult.json');
  }
};
