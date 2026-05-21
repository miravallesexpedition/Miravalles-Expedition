export const bookingTimeSlots = [
  { value: '05:30', label: '5:30 a.m.' },
  { value: '06:00', label: '6:00 a.m.' },
  { value: '06:30', label: '6:30 a.m.' },
  { value: '07:00', label: '7:00 a.m.' },
  { value: '07:30', label: '7:30 a.m.' },
  { value: '08:00', label: '8:00 a.m.' },
  { value: '08:30', label: '8:30 a.m.' },
  { value: '09:00', label: '9:00 a.m.' },
  { value: '10:00', label: '10:00 a.m.' },
  { value: '13:00', label: '1:00 p.m.' },
  { value: '14:00', label: '2:00 p.m.' },
  { value: '15:00', label: '3:00 p.m.' },
  { value: '16:00', label: '4:00 p.m.' },
  { value: '17:00', label: '5:00 p.m.' },
  { value: '18:00', label: '6:00 p.m.' },
  { value: '19:00', label: '7:00 p.m.' }
]

export function isValidBookingTime(value) {
  return bookingTimeSlots.some((slot) => slot.value === value)
}

export function formatBookingTime(value) {
  return bookingTimeSlots.find((slot) => slot.value === value)?.label || value
}
