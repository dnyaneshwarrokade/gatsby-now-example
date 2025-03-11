import axios from 'axios';
import { fetchFilesFromS3 } from './date';

jest.mock('axios');

describe('fetchFilesFromS3', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore(); // Restore original console.error after each test
  });

  it('should return an array of files when the API call is successful', async () => {
    const mockResponse = ['file1.txt', 'file2.txt'];
    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockResponse });

    const files = await fetchFilesFromS3();

    expect(files).toEqual(mockResponse);
    expect(axios.get).toHaveBeenCalledWith('https://your-s3-bucket-url.com/files');
  });

  it('should return an empty array when the API call fails', async () => {
    const mockError = new Error('API call failed');
    jest.spyOn(axios, 'get').mockRejectedValue(mockError); // Use spyOn to properly mock axios

    const files = await fetchFilesFromS3();

    expect(files).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith('https://your-s3-bucket-url.com/files');
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching files from S3:', mockError);
  });
});
