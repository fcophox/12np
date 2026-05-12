import imageCompression from 'browser-image-compression';

export async function optimizeImage(file: File) {
  const options = {
    maxSizeMB: 1, // Max size 1MB
    maxWidthOrHeight: 1920, // Max dimensions 1920px
    useWebWorker: true,
    initialQuality: 0.8, // 80% quality
  };

  try {
    const compressedFile = await imageCompression(file, options);
    console.log(`Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Compressed size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
    return compressedFile;
  } catch (error) {
    console.error("Error optimizing image:", error);
    return file; // Return original if compression fails
  }
}
