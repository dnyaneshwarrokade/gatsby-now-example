import axios from 'axios';

// Function for multiplication of two numbers
export const multiply = (a: number, b: number): number => a * b;

// function to find even numbers in array
export const findEvenNumbers = (arr: number[]): number[] => arr.filter((num) => num % 2 === 0);

// function to print even numbers in array
export const printEvenNumbers = (arr: number[]): void => {
  const evenNumbers = findEvenNumbers(arr);
  console.log(evenNumbers);
};

// function to run recursive function and print current index for 100 times
export const runRecursiveFunction = (index = 0): void => {
  if (index === 100) {
    return;
  }
  console.log(index);
  runRecursiveFunction(index + 1);
};

// create a rest api to pull list of files on aws s3 bucket
// Function to fetch the list of files from AWS S3 bucket
export const fetchFilesFromS3 = async (): Promise<string[]> => {
  try {
    const response = await axios.get('https://your-s3-bucket-url.com/files');
    return response.data;
  } catch (error) {
    console.error('Error fetching files from S3:', error);
    return [];
  }
};

// Usage example
fetchFilesFromS3()
  .then((files) => {
    console.log('List of files:', files);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// unit test cases for fetchFilesFromS3 function

