export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  role: MessageRole;
  content: string;
}

export interface AutomationTrigger {
  tipo: string;
  filtro?: string;
  cuenta?: string;
  remitentes?: string[];
  palabras_clave?: string[];
  url?: string;
  frecuencia?: string;
  [key: string]: unknown;
}

export interface AutomationAction {
  tipo: string;
  numero?: string;
  mensaje?: string;
  chat_id?: string;
  canal?: string;
  destinatario?: string;
  asunto?: string;
  cuerpo?: string;
  base?: string;
  campos?: Record<string, string>;
  hoja?: string;
  fila?: Record<string, string>;
  url?: string;
  [key: string]: unknown;
}

export interface AutomationConfig {
  nombre: string;
  trigger: AutomationTrigger;
  acciones: AutomationAction[];
  frecuencia: "tiempo_real" | "cada_hora" | "diaria" | "semanal";
}

export type AutomationStatus = "draft" | "active" | "paused";

export interface Automation {
  id: string;
  user_id: string;
  name: string;
  description: string;
  config: AutomationConfig;
  n8n_workflow_id: string | null;
  status: AutomationStatus;
  created_at: string;
  updated_at: string;
}

export interface N8nNode {
  parameters: Record<string, unknown>;
  name: string;
  type: string;
  typeVersion: number;
  position: [number, number];
  credentials?: Record<string, { id: string; name: string }>;
  webhookId?: string;
}

export interface N8nConnection {
  node: string;
  type: "main";
  index: number;
}

export interface N8nWorkflow {
  name: string;
  nodes: N8nNode[];
  connections: Record<string, { main: N8nConnection[][] }>;
  active: boolean;
  settings: Record<string, unknown>;
  tags?: string[];
}

export const SKILL_CHIPS = [
  { label: "Notificarme por WhatsApp", prompt: "Quiero que me avisen por WhatsApp cuando pase algo importante" },
  { label: "Crear ticket automático", prompt: "Quiero crear tickets automáticamente cuando lleguen solicitudes por email" },
  { label: "Enviar reporte semanal", prompt: "Quiero que me envíen un reporte semanal con los datos de mi negocio" },
  { label: "Guardar leads en hoja", prompt: "Quiero guardar automáticamente los leads de mis formularios en una hoja de cálculo" },
  { label: "Responder emails repetitivos", prompt: "Quiero responder automáticamente emails con preguntas frecuentes" },
  { label: "Publicar en redes sociales", prompt: "Quiero publicar contenido automáticamente en mis redes sociales" },
  { label: "Sincronizar calendarios", prompt: "Quiero sincronizar automáticamente eventos entre mis calendarios" },
  { label: "Alertas de stock", prompt: "Quiero recibir alertas cuando algún producto tenga poco stock" },
];
