// Mock gate for local browser development
const mockGate = {
  postMessage: (msg: Record<string, unknown>) => console.log("message: ", msg),
};

const getMessageGate = () =>
  "acquireVsCodeApi" in window ? window.acquireVsCodeApi() : mockGate;

const sendMessage = (message: Record<string, unknown>) => {
  const gate = getMessageGate();
  gate.postMessage(message);
};
