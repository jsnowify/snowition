import Ticket from "@/app/(models)/Task";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const foundTask = await Ticket.findOne({ _id: id });

    if (!foundTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ foundTask }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Error", error: e }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const deletedTask = await Ticket.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json(
        { message: "Task not found or could not be deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Task Deleted" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Error", error: e }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { formData } = await req.json();

    const updateTicketData = await Ticket.findByIdAndUpdate(id, {
      ...formData,
    });

    if (!updateTicketData) {
      return NextResponse.json(
        { message: "Task not found or could not be updated" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Task Updated" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Error", error: e }, { status: 500 });
  }
}
