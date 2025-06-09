import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { role, level, techstack, type, amount, userid } = body;

    const prompt = `
Prepare questions for a job interview.
The job role is ${role}.
The job experience level is ${level}.
The tech stack used in the job is: ${techstack}.
The focus between behavioural and technical questions should lean towards: ${type}.
The amount of questions required is: ${amount}.
Please return only the questions, without any additional text.
The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
Return the questions formatted like this:
["Question 1", "Question 2", "Question 3"]

Thank you! <3
    `;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // Make sure this key is set in .env
      },
      body: JSON.stringify({
        model: "mistralai/mixtral-8x7b-instruct",
        messages: [
          {
            role: "user",
            content: prompt.trim(),
          },
        ],
      }),
    });

    const data = await res.json();
    const questions = data.choices?.[0]?.message?.content || "[]";

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return NextResponse.json({ success: true, questions: JSON.parse(questions) });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: "Failed to generate or save interview questions." });
  }
}

// create the get function just return hellow world 
export async function GET() {
  return NextResponse.json({ success: true, message: "Hello World" });
}