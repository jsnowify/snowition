import TicketForm from "@/app/(components)/TicketForm";

const getTaskById = async (id) => {
  const res = await fetch(`http://localhost:3000/api/Task/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    new Error("Failed to get task");
  }

  return res.json();
};

const TicketPage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;
  let updateTaskData = [];
  if (EDITMODE) {
    updateTaskData = await getTaskById(params.id);
    updateTaskData = updateTaskData.foundTask;
  }
  return <TicketForm />;
};

export default TicketPage;
