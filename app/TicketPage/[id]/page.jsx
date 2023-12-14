import TicketForm from "@/app/(components)/TicketForm";

const getTaskById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Task/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

let updateTaskData = {};
const TicketPage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;

  if (EDITMODE) {
    updateTaskData = await getTaskById(params.id);
    updateTaskData = updateTaskData.foundTask;
  } else {
    updateTaskData = {
      _id: "new",
    };
  }

  return <TicketForm task={updateTaskData} />;
};

export default TicketPage;
