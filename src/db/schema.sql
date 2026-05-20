-- Tabla de tours
CREATE TABLE tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  participants_count INT DEFAULT 1,
  tour_date DATE NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')) DEFAULT 'pending',
  confirmation_token TEXT UNIQUE,
  total_price DECIMAL(10, 2),
  payment_status TEXT CHECK (payment_status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
  payment_method TEXT CHECK (payment_method IN ('paypal')),
  payment_id TEXT,
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
CREATE INDEX idx_email_logs_booking_id ON email_logs(booking_id);
CREATE INDEX idx_tours_is_active ON tours(is_active);

-- Tours base de Miravalles Expedition
INSERT INTO tours (
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
  'Catarata Cabro Muco + Morpho Blanca',
  'Caminata guiada de 10 km ida y vuelta hacia dos cataratas escondidas en la zona del Volcán Miravalles.',
  55.00,
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
  'Aguas Termales Miravalles',
  'Experiencia relajada para disfrutar aguas termales y ambiente volcánico cerca de Miravalles.',
  35.00,
  'easy',
  3,
  15,
  '/images/red-rock-waterfall.jpg',
  'Zona Miravalles',
  ARRAY['es', 'en'],
  ARRAY['Coordinación local', 'Agua', 'Refrigerio o snacks'],
  ARRAY['Transporte', 'Almuerzo', 'Gastos personales', 'Entradas externas cuando apliquen'],
  ARRAY['Traje de baño', 'Toalla', 'Sandalias', 'Cambio de ropa', 'Repelente'],
  'Todo el año'
),
(
  'Camino al Cráter del Volcán Miravalles',
  'Caminata exigente para viajeros con buena condición física, vistas amplias y terreno volcánico.',
  85.00,
  'hard',
  6,
  10,
  '/images/volcano.jpg',
  'Volcán Miravalles',
  ARRAY['es', 'en'],
  ARRAY['Guía local', 'Agua', 'Refrigerio o snacks', 'Binoculares cuando aplica'],
  ARRAY['Transporte', 'Almuerzo', 'Gastos personales', 'Entradas externas cuando apliquen'],
  ARRAY['Ropa cómoda', 'Zapatos cerrados para caminar', 'Bloqueador solar', 'Repelente contra insectos', 'Abrigo liviano'],
  'Diciembre a abril'
),
(
  'Tour de Aves y Vida Silvestre',
  'Salida tranquila de observación de aves y vida silvestre, ideal temprano en la mañana.',
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
);
