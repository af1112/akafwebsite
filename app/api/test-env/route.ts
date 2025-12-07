import { NextResponse } from 'next/server';
import { config } from 'dotenv';
import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';

export async function GET() {
  const results: any = {
    timestamp: new Date().toISOString(),
    checks: {}
  };

  // 1. بررسی وجود فایل .env.local
  const envLocalPath = resolve(process.cwd(), '.env.local');
  results.checks.fileExists = existsSync(envLocalPath);
  results.checks.filePath = envLocalPath;

  // 2. خواندن محتویات فایل
  if (results.checks.fileExists) {
    try {
      const fileContent = readFileSync(envLocalPath, 'utf-8');
      results.checks.fileContent = fileContent.split('\n').map((line, index) => ({
        line: index + 1,
        content: line.trim(),
        hasThawani: line.includes('THAWANI')
      }));
      results.checks.fileSize = fileContent.length;
    } catch (error: any) {
      results.checks.fileReadError = error.message;
    }
  }

  // 3. Load کردن با dotenv
  try {
    const dotenvResult = config({ path: envLocalPath });
    results.checks.dotenvLoaded = !!dotenvResult;
    results.checks.dotenvError = dotenvResult?.error?.message;
    results.checks.dotenvParsed = dotenvResult?.parsed ? Object.keys(dotenvResult.parsed) : [];
  } catch (error: any) {
    results.checks.dotenvError = error.message;
  }

  // 4. بررسی process.env
  results.checks.processEnv = {
    NODE_ENV: process.env.NODE_ENV,
    hasTHAWANI_SECRET_KEY: !!process.env.THAWANI_SECRET_KEY,
    hasTHAWANI_PUBLISHABLE_KEY: !!process.env.THAWANI_PUBLISHABLE_KEY,
    THAWANI_SECRET_KEY_preview: process.env.THAWANI_SECRET_KEY 
      ? `${process.env.THAWANI_SECRET_KEY.substring(0, 5)}...${process.env.THAWANI_SECRET_KEY.substring(process.env.THAWANI_SECRET_KEY.length - 3)}`
      : 'MISSING',
    THAWANI_PUBLISHABLE_KEY_preview: process.env.THAWANI_PUBLISHABLE_KEY
      ? `${process.env.THAWANI_PUBLISHABLE_KEY.substring(0, 5)}...${process.env.THAWANI_PUBLISHABLE_KEY.substring(process.env.THAWANI_PUBLISHABLE_KEY.length - 3)}`
      : 'MISSING',
    allThawaniKeys: Object.keys(process.env).filter(key => key.includes('THAWANI')),
    allEnvKeys: Object.keys(process.env).length
  };

  // 5. بررسی cwd
  results.checks.cwd = process.cwd();

  // 6. بررسی فایل‌های env دیگر
  const envFiles = ['.env', '.env.local', '.env.development', '.env.development.local'];
  results.checks.envFiles = envFiles.map(file => ({
    name: file,
    exists: existsSync(resolve(process.cwd(), file))
  }));

  return NextResponse.json(results, { status: 200 });
}











import { config } from 'dotenv';
import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';

export async function GET() {
  const results: any = {
    timestamp: new Date().toISOString(),
    checks: {}
  };

  // 1. بررسی وجود فایل .env.local
  const envLocalPath = resolve(process.cwd(), '.env.local');
  results.checks.fileExists = existsSync(envLocalPath);
  results.checks.filePath = envLocalPath;

  // 2. خواندن محتویات فایل
  if (results.checks.fileExists) {
    try {
      const fileContent = readFileSync(envLocalPath, 'utf-8');
      results.checks.fileContent = fileContent.split('\n').map((line, index) => ({
        line: index + 1,
        content: line.trim(),
        hasThawani: line.includes('THAWANI')
      }));
      results.checks.fileSize = fileContent.length;
    } catch (error: any) {
      results.checks.fileReadError = error.message;
    }
  }

  // 3. Load کردن با dotenv
  try {
    const dotenvResult = config({ path: envLocalPath });
    results.checks.dotenvLoaded = !!dotenvResult;
    results.checks.dotenvError = dotenvResult?.error?.message;
    results.checks.dotenvParsed = dotenvResult?.parsed ? Object.keys(dotenvResult.parsed) : [];
  } catch (error: any) {
    results.checks.dotenvError = error.message;
  }

  // 4. بررسی process.env
  results.checks.processEnv = {
    NODE_ENV: process.env.NODE_ENV,
    hasTHAWANI_SECRET_KEY: !!process.env.THAWANI_SECRET_KEY,
    hasTHAWANI_PUBLISHABLE_KEY: !!process.env.THAWANI_PUBLISHABLE_KEY,
    THAWANI_SECRET_KEY_preview: process.env.THAWANI_SECRET_KEY 
      ? `${process.env.THAWANI_SECRET_KEY.substring(0, 5)}...${process.env.THAWANI_SECRET_KEY.substring(process.env.THAWANI_SECRET_KEY.length - 3)}`
      : 'MISSING',
    THAWANI_PUBLISHABLE_KEY_preview: process.env.THAWANI_PUBLISHABLE_KEY
      ? `${process.env.THAWANI_PUBLISHABLE_KEY.substring(0, 5)}...${process.env.THAWANI_PUBLISHABLE_KEY.substring(process.env.THAWANI_PUBLISHABLE_KEY.length - 3)}`
      : 'MISSING',
    allThawaniKeys: Object.keys(process.env).filter(key => key.includes('THAWANI')),
    allEnvKeys: Object.keys(process.env).length
  };

  // 5. بررسی cwd
  results.checks.cwd = process.cwd();

  // 6. بررسی فایل‌های env دیگر
  const envFiles = ['.env', '.env.local', '.env.development', '.env.development.local'];
  results.checks.envFiles = envFiles.map(file => ({
    name: file,
    exists: existsSync(resolve(process.cwd(), file))
  }));

  return NextResponse.json(results, { status: 200 });
}





















