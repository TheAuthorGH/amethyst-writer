import * as fs from 'fs/promises';
import { S3 } from 'aws-sdk';

const s3Bucket = process.env.S3_BUCKET_DESKTOP_ARTIFACTS || 'amethyst-writer-builds';

const s3 = new S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

if (require.main === module) {
  deployArtifacts();
}

async function deployArtifacts() {
  const fileNames = await getFilesToDeploy();

  console.log(`Uploading ${fileNames.length} artifacts to s3`);

  fileNames.forEach((fileName) => uploadToS3(fileName));
}

async function uploadToS3(filename: string) {
  const content = await getFileContent(filename);

  s3.upload({
    Bucket: s3Bucket,
    Key: getFileKey(filename),
    Body: content
  }, (err: Error) => {
    if (err) {
      console.error(err);
    }

    console.log(`Artifact uploaded: ${filename}`);
  });
}

async function getFilesToDeploy(): Promise<string[]> {
  const fileNames: string[] = await fs.readdir('./dist/packages');
  return fileNames.filter((fileName) => fileName.startsWith('amethyst-writer-'));
}

function getFileContent(filename: string): Promise<Buffer> {
  return fs.readFile(`./dist/packages/${filename}`);
}

function getFileKey(filename: string): string {
  const date = new Date();
  const dateString = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;

  return `builds/${dateString}/${filename}`;
}
