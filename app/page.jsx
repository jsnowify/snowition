import TicketCard from "./(components)/TicketCard";

const getTasks = async () => {
  try {
    const res = await fetch("http:localhost:3000/api/Task", {
      cache: "no-store",
    });

    return res.json();
  } catch (e) {
    console.log("Failed to get tasks", e);
  }
};

const Dashboard = async () => {
  // Desctruction from api/Tasks.js
  const { tasks } = await getTasks();

  // Remove duplicate tasks
  const uniqueCategories = [...new Set(tasks?.map(({ category }) => category))];

  return (
    <div className="p-5 ">
      <div>
        {tasks &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4"></div>
              {tasks
                .filter((task) => task.category === uniqueCategory)
                .map((filteredTicket, _index) => (
                  <TicketCard id={_index} key={_index} task={filteredTicket} />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
