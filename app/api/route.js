import Task from "../(models)/Task";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const taskData = body.formData;
    await Task.create(taskData);

    return NextResponse.json({ message: "Ticket created" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Error", e }, { status: 500 });
  }
}
