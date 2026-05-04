-- Crear tabla de tours
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

-- Crear tabla de reservas
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

-- Crear tabla de usuarios administradores
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

-- Crear tabla de emails enviados (para auditoría)
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  subject TEXT,
  email_type TEXT CHECK (email_type IN ('confirmation', 'reminder', 'receipt')),
  status TEXT CHECK (status IN ('sent', 'failed')) DEFAULT 'sent',
  error_message TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para optimizar búsquedas
CREATE INDEX idx_bookings_tour_id ON bookings(tour_id);
CREATE INDEX idx_bookings_email ON bookings(email);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_tour_date ON bookings(tour_date);
CREATE INDEX idx_bookings_confirmation_token ON bookings(confirmation_token);
CREATE INDEX idx_email_logs_booking_id ON email_logs(booking_id);
CREATE INDEX idx_tours_is_active ON tours(is_active);

-- Insertar tours de ejemplo
INSERT INTO tours (name, description, price, difficulty_level, duration_hours, max_participants, location, language, best_season) VALUES
('Catarata Cabro Mucho', 'Caminata hacia la hermosa catarata Cabro Mucho en las montañas de Fortuna', 55.00, 'moderate', 4, 12, 'Fortuna de Bagaces', ARRAY['es', 'en'], 'May-November'),
('Morfo Celestes', 'Tour observación de las famosas mariposas Morfo en su hábitat natural', 60.00, 'easy', 3, 10, 'Fortuna de Bagaces', ARRAY['es', 'en'], 'May-November'),
('Hot Springs', 'Disfruta de las aguas termales naturales del volcán Arenal', 50.00, 'easy', 3, 15, 'Hot Springs Area', ARRAY['es', 'en'], 'Year-round'),
('El Yoko', 'Aventura completa en el río y selva tropical con rappel', 75.00, 'hard', 6, 8, 'Fortuna Area', ARRAY['es', 'en'], 'May-November'),
('Cráter del Volcán Miravalles', 'Caminata al cráter del volcán Miravalles con vistas espectaculares', 65.00, 'hard', 5, 10, 'Miravalles', ARRAY['es', 'en'], 'December-April'),
('Tour de Aves en Palo Verde', 'Observación de aves en la reserva de Palo Verde, paraíso ornitológico', 70.00, 'easy', 4, 12, 'Palo Verde', ARRAY['es', 'en'], 'December-April');
