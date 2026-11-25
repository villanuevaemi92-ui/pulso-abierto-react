interface StatusMessageProps {
  message: string;
  type: "info" | "loading" | "error";
}

function StatusMessage({ message, type }: StatusMessageProps) {
  if (type === "error") {
    return <p role="alert">{message}</p>;
  }

  if (type === "loading") {
    return <p role="status">{message}</p>;
  }

  return <p>{message}</p>;
}

export default StatusMessage;