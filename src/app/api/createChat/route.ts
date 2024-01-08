import { join } from "path";
import * as dateFn from "date-fns";
import { NextRequest, NextResponse } from "next/server";
const fs = require('fs');
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env['NEXT_PUBLIC_OPENAI_API_KEY'], 
  dangerouslyAllowBrowser: true
    // apiKey: "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",
});
export async function POST(request: NextRequest) {
  const filepath = await request.body;

  console.log("filepath", filepath)

  try {
    const file = await openai.files.create({
        file: fs.createReadStream(filepath),
        purpose: "assistants",
    });
    const assistant = await openai.beta.assistants.create({
        name: "PDF Helper",
        instructions: "You are my assistant who can answer questions from the given pdf.",
        model: "gpt-4-1106-preview",
        tools: [{"type": "retrieval"}],
        file_ids: [file.id]
    });
    const thread = await openai.beta.threads.create()
    const run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistant.id,
        instructions: "Explain as simply as possible.",
    })
    return NextResponse.json({ threadID: thread.id, runID: run.id });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}