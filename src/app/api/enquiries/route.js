import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

// Place your service-account.json in the project root and update the spreadsheet ID below
const CREDENTIALS_PATH = path.join(process.cwd(), 'service-account.json');
const SPREADSHEET_ID = process.env.SPREADVALUE // <-- Replace with your actual Google Sheet ID
const SHEET_NAME = 'Sheet1'; // Change if your sheet/tab name is different

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function appendToSheet(data) {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });
  const sheets = google.sheets({ version: 'v4', auth });

  const row = [
    data.name,
    data.email,
    data.phone,
    data.alternatePhone,
    data.city,
    data.pincode,
    data.salary,
    data.serviceSector,
    data.companyName,
    data.address,
    data.question,
    data.serviceName,
    data.serviceCategory,
    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A1`,
    valueInputOption: 'USER_ENTERED',
    resource: { values: [row] },
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    await appendToSheet(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error appending to Google Sheet:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 