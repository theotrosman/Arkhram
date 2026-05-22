import { AutomationConfig, AutomationAction, AutomationTrigger, N8nNode, N8nWorkflow } from "./types";

let nodeIdCounter = 0;

function nextPosition(index: number): [number, number] {
  return [250 + index * 300, 300];
}

function buildTriggerNode(trigger: AutomationTrigger, position: [number, number]): N8nNode {
  switch (trigger.tipo) {
    case "gmail":
      return {
        parameters: {
          pollTimes: { item: [{ mode: "everyMinute" }] },
          filters: { subject: trigger.filtro || "" },
          ...(trigger.cuenta ? { user: trigger.cuenta } : {}),
        },
        name: "Gmail Trigger",
        type: "n8n-nodes-base.gmailTrigger",
        typeVersion: 1,
        position,
        credentials: { gmailOAuth2: { id: "1", name: "Gmail account" } },
      };

    case "outlook":
      return {
        parameters: {
          pollTimes: { item: [{ mode: "everyMinute" }] },
          filters: { subject: trigger.filtro || "" },
        },
        name: "Microsoft Outlook Trigger",
        type: "n8n-nodes-base.microsoftOutlookTrigger",
        typeVersion: 1,
        position,
        credentials: { microsoftOutlookOAuth2Api: { id: "2", name: "Outlook account" } },
      };

    case "schedule":
      return {
        parameters: {
          rule: {
            interval: [{ field: trigger.frecuencia || "hours", "hoursInterval": 1 }],
          },
        },
        name: "Schedule Trigger",
        type: "n8n-nodes-base.scheduleTrigger",
        typeVersion: 1,
        position,
      };

    case "webhook":
      return {
        parameters: {
          path: `arkham-${nodeIdCounter++}`,
          responseMode: "onReceived",
        },
        name: "Webhook",
        type: "n8n-nodes-base.webhook",
        typeVersion: 1,
        position,
        webhookId: crypto.randomUUID(),
      };

    case "google_forms":
      return {
        parameters: {
          pollTimes: { item: [{ mode: "everyMinute" }] },
          ...(trigger.filtro ? { formId: trigger.filtro } : {}),
        },
        name: "Google Forms Trigger",
        type: "n8n-nodes-base.googleFormsTrigger",
        typeVersion: 1,
        position,
        credentials: { googleApi: { id: "3", name: "Google account" } },
      };

    case "shopify":
      return {
        parameters: { topic: trigger.filtro || "orders/create" },
        name: "Shopify Trigger",
        type: "n8n-nodes-base.shopifyTrigger",
        typeVersion: 1,
        position,
        credentials: { shopifyApi: { id: "4", name: "Shopify account" } },
      };

    default:
      return {
        parameters: { path: `arkham-generic-${nodeIdCounter++}` },
        name: "Webhook",
        type: "n8n-nodes-base.webhook",
        typeVersion: 1,
        position,
        webhookId: crypto.randomUUID(),
      };
  }
}

function buildActionNode(action: AutomationAction, index: number, position: [number, number]): N8nNode {
  switch (action.tipo) {
    case "whatsapp":
      return {
        parameters: {
          resource: "message",
          operation: "send",
          phoneNumberId: "={{$env.WHATSAPP_PHONE_ID}}",
          recipientPhoneNumber: action.numero || "",
          textBody: action.mensaje || "Notificación de Arkham",
        },
        name: `WhatsApp ${index}`,
        type: "n8n-nodes-base.whatsApp",
        typeVersion: 1,
        position,
        credentials: { whatsAppApi: { id: "10", name: "WhatsApp account" } },
      };

    case "telegram":
      return {
        parameters: {
          resource: "message",
          operation: "sendMessage",
          chatId: action.chat_id || "",
          text: action.mensaje || "Notificación de Arkham",
        },
        name: `Telegram ${index}`,
        type: "n8n-nodes-base.telegram",
        typeVersion: 1,
        position,
        credentials: { telegramApi: { id: "11", name: "Telegram account" } },
      };

    case "slack":
      return {
        parameters: {
          resource: "message",
          operation: "post",
          select: "channel",
          channelId: { value: action.canal || "" },
          messageType: "text",
          text: action.mensaje || "Notificación de Arkham",
        },
        name: `Slack ${index}`,
        type: "n8n-nodes-base.slack",
        typeVersion: 2,
        position,
        credentials: { slackApi: { id: "12", name: "Slack account" } },
      };

    case "email":
      return {
        parameters: {
          fromEmail: "={{$env.FROM_EMAIL}}",
          toEmail: action.destinatario || "",
          subject: action.asunto || "Notificación de Arkham",
          text: action.cuerpo || "",
        },
        name: `Send Email ${index}`,
        type: "n8n-nodes-base.emailSend",
        typeVersion: 2,
        position,
        credentials: { smtp: { id: "13", name: "SMTP account" } },
      };

    case "notion":
      return {
        parameters: {
          resource: "databasePage",
          operation: "create",
          databaseId: { value: action.base || "" },
          propertiesUi: {
            propertyValues: Object.entries(action.campos || {}).map(([key, val]) => ({
              key,
              type: "title",
              title: val,
            })),
          },
        },
        name: `Notion ${index}`,
        type: "n8n-nodes-base.notion",
        typeVersion: 2,
        position,
        credentials: { notionApi: { id: "14", name: "Notion account" } },
      };

    case "google_sheets":
      return {
        parameters: {
          resource: "sheet",
          operation: "appendOrUpdate",
          documentId: { value: action.hoja || "" },
          sheetName: { value: "Hoja 1" },
          columns: {
            mappingMode: "defineBelow",
            values: action.fila || {},
          },
        },
        name: `Google Sheets ${index}`,
        type: "n8n-nodes-base.googleSheets",
        typeVersion: 4,
        position,
        credentials: { googleSheetsOAuth2Api: { id: "15", name: "Google Sheets account" } },
      };

    case "airtable":
      return {
        parameters: {
          resource: "record",
          operation: "create",
          base: { value: action.base || "" },
          table: { value: action.hoja || "" },
          columns: {
            mappingMode: "defineBelow",
            values: action.fila || {},
          },
        },
        name: `Airtable ${index}`,
        type: "n8n-nodes-base.airtable",
        typeVersion: 2,
        position,
        credentials: { airtableTokenApi: { id: "16", name: "Airtable account" } },
      };

    default:
      return {
        parameters: {
          url: action.url || "",
          method: "POST",
          sendBody: true,
          bodyParameters: {
            parameters: [{ name: "data", value: "={{$json}}" }],
          },
        },
        name: `HTTP Request ${index}`,
        type: "n8n-nodes-base.httpRequest",
        typeVersion: 4,
        position,
      };
  }
}

export function generateN8nWorkflow(config: AutomationConfig): N8nWorkflow {
  nodeIdCounter = 0;
  const nodes: N8nNode[] = [];
  const connections: N8nWorkflow["connections"] = {};

  const triggerNode = buildTriggerNode(config.trigger, nextPosition(0));
  nodes.push(triggerNode);

  config.acciones.forEach((action, i) => {
    const actionNode = buildActionNode(action, i, nextPosition(i + 1));
    nodes.push(actionNode);

    const sourceName = i === 0 ? triggerNode.name : nodes[i].name;
    if (!connections[sourceName]) {
      connections[sourceName] = { main: [[]] };
    }
    connections[sourceName].main[0].push({
      node: actionNode.name,
      type: "main",
      index: 0,
    });
  });

  return {
    name: config.nombre,
    nodes,
    connections,
    active: false,
    settings: { executionOrder: "v1" },
    tags: ["arkham"],
  };
}

export function describeAutomation(config: AutomationConfig): string {
  const triggerDescriptions: Record<string, string> = {
    gmail: "un nuevo email en Gmail",
    outlook: "un nuevo email en Outlook",
    schedule: "un horario programado",
    webhook: "un webhook entrante",
    google_forms: "una respuesta en Google Forms",
    shopify: "un evento en Shopify",
    typeform: "una respuesta en Typeform",
    mercadolibre: "un evento en Mercado Libre",
  };

  const actionDescriptions: Record<string, string> = {
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    slack: "Slack",
    email: "email",
    notion: "Notion",
    google_sheets: "Google Sheets",
    airtable: "Airtable",
    hubspot: "HubSpot",
    trello: "Trello",
  };

  const trigger = triggerDescriptions[config.trigger.tipo] || config.trigger.tipo;
  const actions = config.acciones
    .map((a) => actionDescriptions[a.tipo] || a.tipo)
    .join(", ");

  return `Cuando llegue ${trigger}, enviar notificación por ${actions}`;
}
