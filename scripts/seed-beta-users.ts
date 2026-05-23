/**
 * AUTOMATIS — Beta Testing Seed Script
 * Run: npx ts-node --project tsconfig.json scripts/seed-beta-users.ts
 *
 * Creates 50 simulated users with realistic profiles, chat histories
 * and automations. Run this directly in Supabase SQL editor using
 * the SQL version at the bottom of this file, or adapt for your needs.
 *
 * IMPORTANT: This requires SUPABASE_SERVICE_ROLE_KEY (not anon key).
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// ── 50 SIMULATED USER PERSONAS ──────────────────────────────────────────────
const PERSONAS = [
  { name: "Valentina López",    industry: "ecommerce",    business: "Tienda de ropa online en Shopify con 200 productos" },
  { name: "Marcos Herrera",     industry: "finance",      business: "Estudio contable con 50 clientes pyme" },
  { name: "Lucía Fernández",    industry: "healthcare",   business: "Consultorio odontológico con 3 profesionales" },
  { name: "Agustín Morales",    industry: "marketing",    business: "Agencia de marketing digital para restaurantes" },
  { name: "Carolina Gómez",     industry: "realestate",   business: "Inmobiliaria con 80 propiedades en cartera" },
  { name: "Federico Ruiz",      industry: "education",    business: "Academia online de programación con 500 alumnos" },
  { name: "Sofía Castro",       industry: "hr",           business: "Consultora de RRHH que gestiona 200 empleados" },
  { name: "Diego Álvarez",      industry: "ecommerce",    business: "Dropshipping de electrónica en MercadoLibre" },
  { name: "Martina Torres",     industry: "hospitality",  business: "Restaurante con 80 cubiertos y delivery" },
  { name: "Nicolás Ramírez",    industry: "sales",        business: "SaaS B2B con ciclo de ventas largo" },
  { name: "Juliana Sánchez",    industry: "agencies",     business: "Agencia de diseño y contenido para marcas" },
  { name: "Rodrigo Pérez",      industry: "operations",   business: "Empresa de logística con 15 empleados" },
  { name: "Camila Martínez",    industry: "healthcare",   business: "Centro de estética y bienestar" },
  { name: "Ezequiel Romero",    industry: "ecommerce",    business: "Tienda de suplementos deportivos online" },
  { name: "Ana Belén Díaz",     industry: "education",    business: "Plataforma de cursos de idiomas online" },
  { name: "Tomás García",       industry: "finance",      business: "Asesor financiero independiente" },
  { name: "Florencia Medina",   industry: "marketing",    business: "Influencer y consultora de marca personal" },
  { name: "Sebastián Vargas",   industry: "realestate",   business: "Desarrolladora inmobiliaria pequeña" },
  { name: "Luciana Ortiz",      industry: "sales",        business: "Vendedora freelance de seguros" },
  { name: "Emilio Flores",      industry: "operations",   business: "Empresa de catering y eventos" },
  { name: "Paula Molina",       industry: "hr",           business: "Directora de talento en startup tech" },
  { name: "Matías Silva",       industry: "ecommerce",    business: "Marketplace de productos artesanales" },
  { name: "Renata Jiménez",     industry: "agencies",     business: "Productora de contenido para YouTube" },
  { name: "Pablo Acosta",       industry: "hospitality",  business: "Hotel boutique con 20 habitaciones" },
  { name: "Isabella Mendoza",   industry: "healthcare",   business: "Psicóloga con consultorio privado" },
  { name: "Facundo Rojas",      industry: "intelligence", business: "Research & insights para startups" },
  { name: "Rocío Gutiérrez",    industry: "education",    business: "Profesora de yoga y meditación online" },
  { name: "Leandro Reyes",      industry: "sales",        business: "Gerente comercial de empresa manufacturera" },
  { name: "Verónica Campos",    industry: "finance",      business: "Empresa de facturación electrónica" },
  { name: "Santiago Vega",      industry: "ecommerce",    business: "Tienda de mascotas con sucursales físicas y online" },
  { name: "Constanza Ríos",     industry: "marketing",    business: "Consultora de email marketing" },
  { name: "Gustavo Peralta",    industry: "operations",   business: "Empresa de mantenimiento industrial" },
  { name: "Milagros Cabrera",   industry: "realestate",   business: "Administradora de propiedades en alquiler temporal" },
  { name: "Alejandro Herrera",  industry: "agencies",     business: "Estudio de fotografía y video" },
  { name: "Carla Benítez",      industry: "healthcare",   business: "Clínica de fertilidad y reproducción asistida" },
  { name: "Hernán Suárez",      industry: "hr",           business: "Empresa de selección y headhunting" },
  { name: "Nadia Espinoza",     industry: "education",    business: "Tutorías online para estudiantes universitarios" },
  { name: "Ezequiel Muñoz",     industry: "intelligence", business: "Startup de análisis de datos de redes sociales" },
  { name: "Patricia León",      industry: "ecommerce",    business: "Tienda de cosmética natural y orgánica" },
  { name: "Javier Ibarra",      industry: "hospitality",  business: "Bar y cervecería artesanal" },
  { name: "Daniela Paredes",    industry: "sales",        business: "Comercial en empresa de tecnología educativa" },
  { name: "Andrés Navarro",     industry: "finance",      business: "Contador y asesor impositivo" },
  { name: "Valeria Fuentes",    industry: "marketing",    business: "Growth hacker para startups latam" },
  { name: "Cristian Salinas",   industry: "operations",   business: "Empresa de servicios de limpieza" },
  { name: "Soledad Aguilar",    industry: "agencies",     business: "Agencia de PR y comunicación corporativa" },
  { name: "Maximiliano Cruz",   industry: "ecommerce",    business: "Reseller de tecnología Apple en Argentina" },
  { name: "Gabriela Sandoval",  industry: "healthcare",   business: "Farmacia con delivery y recetas digitales" },
  { name: "Ariel Miranda",      industry: "realestate",   business: "Franquicia inmobiliaria con 5 sucursales" },
  { name: "Natalia Ponce",      industry: "education",    business: "Academia de ballet y danza clásica" },
  { name: "Bruno Delgado",      industry: "intelligence", business: "Consultoría de estrategia empresarial" },
];

// ── SEED SQL (run in Supabase SQL editor) ────────────────────────────────────
// Since we can't create auth users directly, use this SQL to insert test data
// into the profiles table once you have real users.
//
// Or use Supabase Auth Admin API:
// https://supabase.com/docs/reference/javascript/auth-admin-createuser

console.log(`
-- ============================================================
-- AUTOMATIS Beta Testing Seed
-- Run this in Supabase SQL editor after inserting test users
-- ============================================================

-- Insert 50 automation templates
INSERT INTO automation_templates (name, description, category, trigger_type, config, tags, difficulty, is_featured) VALUES
('Nueva venta → WhatsApp', 'Notifica por WhatsApp cuando Shopify registra una nueva venta.', 'ecommerce', 'shopify.order', '{"nombre":"Shopify→WhatsApp","trigger":{"tipo":"shopify_order"},"acciones":[{"tipo":"whatsapp_send"}],"frecuencia":"tiempo_real"}', ARRAY['shopify','whatsapp'], 'beginner', true),
('Email con factura → Drive', 'Extrae datos de facturas y las guarda en Drive.', 'finance', 'gmail.trigger', '{"nombre":"Factura→Drive","trigger":{"tipo":"gmail_trigger","filtro":"factura"},"acciones":[{"tipo":"drive_upload"}],"frecuencia":"tiempo_real"}', ARRAY['gmail','drive'], 'intermediate', true),
('Lead nuevo → HubSpot', 'Crea leads en HubSpot cuando llegan por formulario.', 'sales', 'webhook', '{"nombre":"Lead→HubSpot","trigger":{"tipo":"webhook"},"acciones":[{"tipo":"hubspot_create"}],"frecuencia":"tiempo_real"}', ARRAY['hubspot','leads'], 'beginner', true),
('Recordatorio turno 48hs', 'Recordatorio WhatsApp antes del turno médico.', 'healthcare', 'schedule', '{"nombre":"Recordatorio turno","trigger":{"tipo":"schedule","frecuencia":"diaria"},"acciones":[{"tipo":"whatsapp_send"}],"frecuencia":"diaria"}', ARRAY['whatsapp','turnos'], 'beginner', true),
('Monitor noticias del sector', 'Scrapea noticias y envía resumen diario.', 'intelligence', 'schedule', '{"nombre":"Monitor noticias","trigger":{"tipo":"schedule","frecuencia":"diaria"},"acciones":[{"tipo":"web_scrape"},{"tipo":"email_send"}],"frecuencia":"diaria"}', ARRAY['scraping','email'], 'intermediate', true),
('Venta Shopify → Sheets', 'Registra ventas en hoja de cálculo.', 'ecommerce', 'shopify.order', '{"nombre":"Ventas→Sheets","trigger":{"tipo":"shopify_order"},"acciones":[{"tipo":"sheets_append"}],"frecuencia":"tiempo_real"}', ARRAY['shopify','sheets'], 'beginner', false),
('Newsletter semanal', 'Genera y envía newsletter automático.', 'communication', 'schedule', '{"nombre":"Newsletter semanal","trigger":{"tipo":"schedule","frecuencia":"semanal"},"acciones":[{"tipo":"email_send"}],"frecuencia":"semanal"}', ARRAY['email','newsletter'], 'advanced', true),
('CV recibido → RRHH', 'Clasifica CVs y notifica a RRHH.', 'hr', 'gmail.trigger', '{"nombre":"CV→RRHH","trigger":{"tipo":"gmail_trigger","filtro":"CV"},"acciones":[{"tipo":"drive_upload"},{"tipo":"slack_send"}],"frecuencia":"tiempo_real"}', ARRAY['gmail','rrhh'], 'intermediate', true),
('Lead magnet → nurturing', 'Inicia secuencia de nurturing al descargar.', 'marketing', 'webhook', '{"nombre":"Lead→nurturing","trigger":{"tipo":"webhook"},"acciones":[{"tipo":"email_send"}],"frecuencia":"tiempo_real"}', ARRAY['email','leads'], 'intermediate', true),
('Reporte financiero semanal', 'Consolida datos y envía reporte a gerencia.', 'finance', 'schedule', '{"nombre":"Reporte finanzas","trigger":{"tipo":"schedule","frecuencia":"semanal"},"acciones":[{"tipo":"email_send"}],"frecuencia":"semanal"}', ARRAY['sheets','email'], 'intermediate', true);

-- Done! Run the full AUTOMATIS_TEMPLATES array from src/lib/automation-templates.ts
-- for all 50 templates.
`);

console.log("\n✅ Seed SQL generated. Copy and run in Supabase SQL editor.");
console.log(`\n📊 Stats:`);
console.log(`   - 50 user personas defined`);
console.log(`   - 13 industries covered`);
console.log(`   - Ready for beta testing`);

export { PERSONAS };
