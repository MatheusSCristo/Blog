
const handleSendMessage = async (
  e: React.FormEvent<HTMLFormElement>,
  content: string,
  messageToId:string|undefined,
  messageFromId:string | undefined,
) => {
  
  e.preventDefault();
  if (content) {
    await fetch("/api/createMessage", {
      method: "POST",
      body: JSON.stringify({
        content,
        messageToId,
        messageFromId,
        read: false,
      }),
    });
  }
};

export default handleSendMessage;
