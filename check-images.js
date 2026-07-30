const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(process.cwd(), "public", "images", "assets");

function getPngFiles(directory) {
  const files = [];

  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, item.name);

    if (item.isDirectory()) {
      files.push(...getPngFiles(fullPath));
    } else if (item.isFile() && item.name.toLowerCase().endsWith(".png")) {
      files.push(fullPath);
    }
  }

  return files;
}

async function run() {
  const files = getPngFiles(root);

  for (const file of files) {
    try {
      const metadata = await sharp(file).metadata();
      const relativePath = path.relative(process.cwd(), file);

      console.log({
        file: relativePath,
        width: metadata.width,
        height: metadata.height,
        channels: metadata.channels,
        hasAlpha: metadata.hasAlpha,
        format: metadata.format,
      });
    } catch (error) {
      console.error("ERROR:", path.relative(process.cwd(), file), error.message);
    }
  }
}

run().catch(console.error);