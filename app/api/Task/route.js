import Task from "@/app/(models)/Task";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("POST RAN");
  try {
    const body = await req.json();
    const taskData = body.formData;
    await Task.create(taskData);

    return NextResponse.json({ message: "Ticket created" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Error", e }, { status: 500 });
  }
}

export async function GET() {
  try {
    const tasks = await Task.find();
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Error", e }, { status: 500 });
  }
}
