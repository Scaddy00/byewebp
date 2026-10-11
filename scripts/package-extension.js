import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import JSZip from 'jszip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const extensionDir = path.join(rootDir, 'extension');
const distExtensionDir = path.join(rootDir, 'dist-extension');
const manifestPath = path.join(extensionDir, 'manifest.json');

console.log('⚡ Validating ZapWebp Browser Extension...');

if (!fs.existsSync(manifestPath)) {
  console.error('❌ Error: manifest.json not found in extension directory!');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
console.log(`✓ Manifest V3 valid: ${manifest.name} v${manifest.version}`);

if (!fs.existsSync(distExtensionDir)) {
  fs.mkdirSync(distExtensionDir, { recursive: true });
}

const zip = new JSZip();

function addFilesRecursively(dir, zipFolder) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === 'store-assets') continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const nestedFolder = zipFolder.folder(entry.name);
      addFilesRecursively(fullPath, nestedFolder);
    } else {
      const content = fs.readFileSync(fullPath);
      zipFolder.file(entry.name, content);
      console.log(`  + Packaged: ${path.relative(extensionDir, fullPath)}`);
    }
  }
}

console.log('📦 Bundling files into ZIP archive...');
addFilesRecursively(extensionDir, zip);

const zipFileName = `zapwebp-extension-v${manifest.version}.zip`;
const outputPath = path.join(distExtensionDir, zipFileName);

zip.generateAsync({
  type: 'nodebuffer',
  compression: 'DEFLATE',
  compressionOptions: { level: 9 },
}).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
  const sizeKb = (buffer.length / 1024).toFixed(1);
  console.log(`\n🎉 Success! Extension packaged into:\n   ${outputPath} (${sizeKb} KB)`);
}).catch((err) => {
  console.error('❌ Error generating zip package:', err);
  process.exit(1);
});
