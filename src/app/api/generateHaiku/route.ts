import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    const { theme } = await req.json();

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "あなたは優れた俳人です。与えられたテーマで美しい日本語の俳句を一つ作ってください。",
                },
                {
                    role: "user",
                    content: `テーマ:${theme}`,
                },
            ],
            model: "gpt-4o",
            temperature: 0.8,
            max_tokens: 60,
        });
        return NextResponse.json({ haiku: completion.choices[0].message.content});
    } catch(error) {
        console.error(error);
        return NextResponse.json({error: "俳句生成に失敗しました"}, {status: 500});
    }
}