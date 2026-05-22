const N8N_BASE_URL = process.env.N8N_BASE_URL || "http://localhost:5678";
const N8N_API_KEY = process.env.N8N_API_KEY || "";

interface N8nApiResponse {
  id?: string;
  [key: string]: unknown;
}

async function n8nFetch(path: string, options: RequestInit = {}): Promise<N8nApiResponse> {
  const response = await fetch(`${N8N_BASE_URL}/api/v1${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-N8N-API-KEY": N8N_API_KEY,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`n8n API error ${response.status}: ${error}`);
  }

  return response.json();
}

export async function createWorkflow(workflow: object): Promise<string> {
  const result = await n8nFetch("/workflows", {
    method: "POST",
    body: JSON.stringify(workflow),
  });
  return result.id as string;
}

export async function activateWorkflow(workflowId: string): Promise<void> {
  await n8nFetch(`/workflows/${workflowId}/activate`, { method: "POST" });
}

export async function deactivateWorkflow(workflowId: string): Promise<void> {
  await n8nFetch(`/workflows/${workflowId}/deactivate`, { method: "POST" });
}

export async function deleteWorkflow(workflowId: string): Promise<void> {
  await n8nFetch(`/workflows/${workflowId}`, { method: "DELETE" });
}

export async function getWorkflow(workflowId: string): Promise<N8nApiResponse> {
  return n8nFetch(`/workflows/${workflowId}`);
}
