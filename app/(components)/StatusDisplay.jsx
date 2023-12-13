function StatusDisplay({ status }) {
  const getColor = (status) => {
    let color = "bg-slate-700";
    switch (status.toUpperCase()) {
      case "NOT STARTED":
        color = "bg-red-200";
        return color;
      case "STARTED":
        color = "bg-yellow-200";
        return color;
      case "DONE":
        color = "bg-green-200";
        return color;
    }
    return color;
  };
  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 ${getColor(
        status
      )}`}
    >
      {status}
    </span>
  );
}

export default StatusDisplay;
