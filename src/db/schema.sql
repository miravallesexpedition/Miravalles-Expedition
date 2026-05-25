-- Tabla de tours
CREATE TABLE tours (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  difficulty_level TEXT CHECK (difficulty_level IN ('easy', 'moderate', 'hard')),
  duration_hours FLOAT,
  max_participants INT DEFAULT 10,
  image_url TEXT,
  location TEXT,
  language TEXT[] DEFAULT ARRAY['es', 'en'],
  included_items TEXT[],
  not_included_items TEXT[],
  what_to_bring TEXT[],
  best_season TEXT,
  guide_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Tabla de reservas
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id TEXT NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  participants_count INT DEFAULT 1,
  tour_date DATE NOT NULL,
  preferred_time TEXT,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')) DEFAULT 'pending',
  confirmation_token TEXT UNIQUE,
  customer_type TEXT CHECK (customer_type IN ('foreign', 'national')) DEFAULT 'foreign',
  currency TEXT CHECK (currency IN ('USD', 'CRC')) DEFAULT 'USD',
  unit_price DECIMAL(10, 2),
  price_label TEXT,
  total_price DECIMAL(10, 2),
  payment_status TEXT CHECK (payment_status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
  payment_method TEXT CHECK (payment_method IN ('paypal')),
  payment_id TEXT,
  paypal_order_id TEXT,
  paypal_capture_id TEXT,
  payment_completed_at TIMESTAMP WITH TIME ZONE,
  payment_failed_at TIMESTAMP WITH TIME ZONE,
  payment_failure_reason TEXT,
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de usuarios administradores
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  password_hash TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de emails enviados
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  subject TEXT,
  email_type TEXT CHECK (email_type IN ('confirmation', 'reminder', 'receipt', 'admin_notification')),
  status TEXT CHECK (status IN ('sent', 'failed')) DEFAULT 'sent',
  error_message TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bookings_tour_id ON bookings(tour_id);
CREATE INDEX idx_bookings_email ON bookings(email);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_tour_date ON bookings(tour_date);
CREATE INDEX idx_bookings_confirmation_token ON bookings(confirmation_token);
CREATE INDEX idx_bookings_paypal_order_id ON bookings(paypal_order_id);
CREATE INDEX idx_bookings_paypal_capture_id ON bookings(paypal_capture_id);
CREATE INDEX idx_email_logs_booking_id ON email_logs(booking_id);
CREATE INDEX idx_tours_is_active ON tours(is_active);

-- Tours base de Miravalles Expedition
INSERT INTO tours (
  id,
  name,
  description,
  price,
  difficulty_level,
  duration_hours,
  max_participants,
  image_url,
  location,
  language,
  included_items,
  not_included_items,
  what_to_bring,
  best_season
) VALUES
(
  'catarata-cabro-muco-morpho-blanca',
  'Catarata Piedras Rojas + Morpho Blanca + Cabro Muco',
  'Caminata guiada de 10 km ida y vuelta hacia tres cataratas escondidas en la zona del Volcán Miravalles.',
  45.00,
  'moderate',
  4,
  12,
  '/images/hero-waterfall.jpg',
  'Fortuna, Guanacaste',
  ARRAY['es', 'en'],
  ARRAY['Guía local', 'Agua', 'Refrigerio o snacks', 'Binoculares cuando aplica'],
  ARRAY['Transporte', 'Almuerzo', 'Gastos personales', 'Entradas externas cuando apliquen'],
  ARRAY['Ropa cómoda', 'Zapatos cerrados para caminar', 'Bloqueador solar', 'Repelente contra insectos'],
  'Todo el año'
),
(
  'aguas-termales-miravalles',
  'Termales El Guayacán',
  'Plan de descanso en Termales El Guayacán con piscinas de aguas termales naturales, jardines, barro volcánico, mirador y entorno geotérmico cerca del Volcán Miravalles.',
  15.00,
  'easy',
  3,
  15,
  '/images/termales-guayacan-atardecer.jpg',
  'Fortuna de Bagaces, Guanacaste',
  ARRAY['es', 'en'],
  ARRAY['Coordinación previa por WhatsApp', 'Piscinas termales según reserva confirmada', 'Servicios sanitarios, duchas y vestidores según disponibilidad', 'Baño de barro volcánico cuando esté habilitado', 'Mirador y áreas de descanso'],
  ARRAY['Transporte', 'Almuerzo o alimentación adicional', 'Toalla', 'Gastos personales', 'Servicios externos no confirmados'],
  ARRAY['Traje de baño', 'Toalla', 'Sandalias', 'Cambio de ropa', 'Bolsa para ropa mojada', 'Bloqueador solar', 'Repelente'],
  'Todo el año'
),
(
  'crater-volcan-miravalles',
  'Camino al Cráter del Volcán Miravalles',
  'Expedición extrema al Volcán Miravalles para personas con experiencia en montaña, excelente condición física y disponibilidad de una salida semanal.',
  200.00,
  'hard',
  6,
  10,
  '/images/volcano.jpg',
  'Volcán Miravalles',
  ARRAY['es', 'en'],
  ARRAY['Guía local especializado', 'Fruta fresca', 'Agua', 'Guía de carga o apoyo logístico'],
  ARRAY['Transporte', 'Almuerzo', 'Gastos personales', 'Entradas externas cuando apliquen'],
  ARRAY['Zapatos de montaña', 'Ropa para clima cambiante', 'Abrigo liviano o impermeable', 'Bloqueador solar', 'Repelente contra insectos', 'Equipo personal mínimo'],
  'Diciembre a abril'
),
(
  'tour-aves-vida-silvestre',
  'Tour de Aves, Vida Silvestre y Fotografía de Naturaleza',
  'Salida tranquila de observación de aves, vida silvestre, flora y fotografía de naturaleza, ideal temprano en la mañana.',
  45.00,
  'easy',
  3,
  10,
  '/images/bird.jpg',
  'Fortuna y alrededores de Miravalles',
  ARRAY['es', 'en'],
  ARRAY['Guía local', 'Agua', 'Refrigerio o snacks', 'Binoculares'],
  ARRAY['Transporte', 'Almuerzo', 'Gastos personales'],
  ARRAY['Ropa cómoda', 'Zapatos cerrados', 'Repelente', 'Cámara', 'Sombrero o gorra'],
  'Todo el año'
),
(
  'fotografia-naturaleza-miravalles',
  'Fotografía de Naturaleza',
  'Recorrido pausado para capturar cataratas, flores, aves, mariposas y detalles del bosque con acompañamiento local.',
  75.00,
  'moderate',
  4,
  8,
  '/images/butterfly.jpg',
  'Fortuna, Guanacaste',
  ARRAY['es', 'en'],
  ARRAY['Guía local', 'Agua', 'Refrigerio o snacks', 'Binoculares cuando aplica'],
  ARRAY['Transporte', 'Almuerzo', 'Gastos personales', 'Entradas externas cuando apliquen'],
  ARRAY['Ropa cómoda', 'Zapatos cerrados para caminar', 'Bloqueador solar', 'Repelente contra insectos', 'Cámara o celular protegido contra agua'],
  'Todo el año'
);
