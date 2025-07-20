const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Video compression settings optimized for web
const compressionSettings = {
  // High quality, good compression
  webOptimized: {
    codec: 'libx264',
    preset: 'medium',
    crf: '23', // Constant Rate Factor (18-28 is good, lower = better quality)
    maxrate: '2M',
    bufsize: '4M',
    movflags: '+faststart', // Optimize for web streaming
    pix_fmt: 'yuv420p' // Ensure compatibility
  },
  // More aggressive compression
  aggressive: {
    codec: 'libx264',
    preset: 'slow',
    crf: '28',
    maxrate: '1M',
    bufsize: '2M',
    movflags: '+faststart',
    pix_fmt: 'yuv420p'
  }
};

// Find all MP4 files
function findMp4Files(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...findMp4Files(fullPath));
    } else if (item.name.endsWith('.mp4')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Get file size in MB
function getFileSizeMB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / (1024 * 1024)).toFixed(2);
}

// Compress video using FFmpeg
function compressVideo(inputPath, outputPath, settings) {
  const settingsStr = Object.entries(settings)
    .map(([key, value]) => `-${key} ${value}`)
    .join(' ');
  
  const command = `ffmpeg -i "${inputPath}" ${settingsStr} -y "${outputPath}"`;
  
  try {
    console.log(`Compressing: ${path.basename(inputPath)}`);
    console.log(`Command: ${command}`);
    
    execSync(command, { stdio: 'inherit' });
    
    const originalSize = getFileSizeMB(inputPath);
    const compressedSize = getFileSizeMB(outputPath);
    const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)}: ${originalSize}MB → ${compressedSize}MB (${savings}% smaller)\n`);
    
    return { originalSize, compressedSize, savings };
  } catch (error) {
    console.error(`❌ Error compressing ${inputPath}:`, error.message);
    return null;
  }
}

// Main function
function main() {
  console.log('🎬 MP4 Video Compression Tool\n');
  
  // Check if FFmpeg is installed
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
  } catch (error) {
    console.error('❌ FFmpeg is not installed. Please install FFmpeg first:');
    console.error('   macOS: brew install ffmpeg');
    console.error('   Ubuntu: sudo apt install ffmpeg');
    console.error('   Windows: Download from https://ffmpeg.org/download.html');
    return;
  }
  
  const mp4Files = findMp4Files('public/assets/images');
  
  if (mp4Files.length === 0) {
    console.log('No MP4 files found in public/assets/images');
    return;
  }
  
  console.log(`Found ${mp4Files.length} MP4 files:\n`);
  
  let totalOriginalSize = 0;
  let totalCompressedSize = 0;
  
  for (const file of mp4Files) {
    const originalSize = parseFloat(getFileSizeMB(file));
    totalOriginalSize += originalSize;
    
    console.log(`📁 ${file} (${originalSize}MB)`);
  }
  
  console.log(`\nTotal size: ${totalOriginalSize.toFixed(2)}MB`);
  
  // Ask user which compression level to use
  console.log('\nCompression options:');
  console.log('1. Web Optimized (recommended) - Good quality, moderate compression');
  console.log('2. Aggressive - Smaller files, lower quality');
  console.log('3. Custom settings');
  
  // For now, use web optimized
  const settings = compressionSettings.webOptimized;
  console.log('\nUsing Web Optimized settings...\n');
  
  // Create backup directory
  const backupDir = 'public/assets/images/video-backups';
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  for (const file of mp4Files) {
    const fileName = path.basename(file);
    const dirName = path.dirname(file);
    const backupPath = path.join(backupDir, fileName);
    const compressedPath = path.join(dirName, `${path.parse(fileName).name}-compressed.mp4`);
    
    // Backup original
    fs.copyFileSync(file, backupPath);
    console.log(`📋 Backed up: ${fileName}`);
    
    // Compress
    const result = compressVideo(file, compressedPath, settings);
    
    if (result) {
      totalCompressedSize += parseFloat(result.compressedSize);
      
      // Replace original with compressed version
      fs.unlinkSync(file);
      fs.renameSync(compressedPath, file);
      console.log(`🔄 Replaced original with compressed version`);
    }
  }
  
  const totalSavings = ((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(1);
  
  console.log('\n🎉 Compression Complete!');
  console.log(`Total: ${totalOriginalSize.toFixed(2)}MB → ${totalCompressedSize.toFixed(2)}MB (${totalSavings}% smaller)`);
  console.log(`Backups saved in: ${backupDir}`);
}

main(); 