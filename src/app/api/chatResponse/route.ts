import { NextRequest, NextResponse } from "next/server";

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env['NEXT_PUBLIC_OPENAI_API_KEY'], 
  dangerouslyAllowBrowser: true
    // apiKey: "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",
});

export async function POST(request: NextRequest){
    const input = await request.body
    console.log("input", input)

    
}