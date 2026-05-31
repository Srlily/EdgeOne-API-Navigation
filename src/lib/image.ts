import sharp from 'sharp';
import sizeOf from 'image-size';

export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
}

export async function getImageMetadata(buffer: Buffer): Promise<ImageMetadata> {
  const dimensions = sizeOf(buffer);
  const metadata = await sharp(buffer).metadata();
  
  return {
    width: dimensions.width || 0,
    height: dimensions.height || 0,
    format: metadata.format || 'unknown',
    size: buffer.length,
  };
}

export async function processImage(
  buffer: Buffer,
  options: {
    width?: number;
    height?: number;
    format?: 'jpeg' | 'png' | 'webp' | 'avif';
    quality?: number;
  } = {}
): Promise<Buffer> {
  let pipeline = sharp(buffer);
  
  if (options.width || options.height) {
    pipeline = pipeline.resize(options.width, options.height, {
      fit: 'cover',
      position: 'center',
    });
  }
  
  if (options.format) {
    pipeline = pipeline.toFormat(options.format, {
      quality: options.quality || 80,
    });
  }
  
  return pipeline.toBuffer();
}
