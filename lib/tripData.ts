export type Category = 'hotel' | 'restaurant' | 'beach' | 'culture' | 'activity';

export interface Activity {
  time: string;
  category: Category;
  name: string;
  description: string;
  phone?: string;
  mustBook?: boolean;
}

export interface TripDay {
  day: number;
  date: string;
  label: string;
  title: string;
  heroImage: string;
  coordinates: { lat: number; lng: number };
  activities: Activity[];
}

export const tripDays: TripDay[] = [
  {
    day: 1,
    date: '2026-04-19',
    label: 'SAB 19 ABR',
    title: 'Llegada · Teguise',
    heroImage: 'https://images.unsplash.com/photo-AuhpVRdhAjQ?w=1200&q=80',
    coordinates: { lat: 29.06, lng: -13.56 },
    activities: [
      { time: '15:00', category: 'hotel', name: 'Check-in Barceló Teguise Beach', description: 'Adults only resort en Costa Teguise' },
      { time: '17:00', category: 'culture', name: 'Paseo por Teguise', description: 'Antigua capital de la isla. Calles coloniales, Iglesia de San Miguel, Castillo de Santa Bárbara en el horizonte' },
      { time: '20:00', category: 'restaurant', name: 'Bodega Santa Bárbara', description: 'Tapas auténticas en el casco histórico. Ambiente íntimo, tiramisu legendario', phone: '+34 690 82 45 01' },
    ],
  },
  {
    day: 2,
    date: '2026-04-20',
    label: 'DOM 20 ABR',
    title: 'Mercado + Norte Volcánico',
    heroImage: 'https://images.unsplash.com/photo-5SQZRguWuDs?w=1200&q=80',
    coordinates: { lat: 29.157, lng: -13.432 },
    activities: [
      { time: '09:00', category: 'activity', name: 'Mercado Dominical de Teguise', description: 'El mercado más grande de Canarias. Artesanía, gastronomía local, música' },
      { time: '13:00', category: 'culture', name: 'Jameos del Agua', description: 'Cueva volcánica con lago subterráneo. Obra maestra de César Manrique. Reserva online imprescindible', phone: '+34 928 84 84 84' },
      { time: '15:30', category: 'culture', name: 'Cueva de los Verdes', description: 'Túnel de lava de 1.5km. Una de las formaciones volcánicas más espectaculares de Europa' },
      { time: '20:30', category: 'restaurant', name: 'Ikarus', description: 'Cocina de producto local top. Gambas, cabra estofada, pescado del día. Reserva recomendada', phone: '+34 928 84 57 01' },
    ],
  },
  {
    day: 3,
    date: '2026-04-21',
    label: 'LUN 21 ABR',
    title: 'Timanfaya · El Volcán',
    heroImage: 'https://images.unsplash.com/photo-xUdO14yFDyc?w=1200&q=80',
    coordinates: { lat: 29.0157, lng: -13.7829 },
    activities: [
      { time: '09:00', category: 'activity', name: 'Parque Nacional Timanfaya', description: 'Salida temprana obligatoria. Paisaje lunar, géiseres geotérmicos, bus tour incluido. Reserva online ~30€', phone: '+34 928 11 80 42' },
      { time: '13:00', category: 'restaurant', name: 'Mirador de Los Valles', description: 'Barbacoa ibérica con vistas espectaculares al valle. Black Angus, secreto ibérico, entrecot. Rating 4.8⭐', phone: '+34 928 52 81 14' },
      { time: '17:00', category: 'activity', name: 'Tarde libre en el hotel', description: 'Piscina, spa, descanso tras el día intenso' },
    ],
  },
  {
    day: 4,
    date: '2026-04-22',
    label: 'MAR 22 ABR',
    title: 'Manrique · Arte y Volcán',
    heroImage: 'https://images.unsplash.com/photo-Y2x-lRYRtfQ?w=1200&q=80',
    coordinates: { lat: 29.002, lng: -13.5475 },
    activities: [
      { time: '10:00', category: 'culture', name: 'Fundación César Manrique', description: 'Casa-estudio construida sobre 5 burbujas volcánicas. El legado artístico de Lanzarote. Entrada ~10€', phone: '+34 928 84 31 38' },
      { time: '13:00', category: 'activity', name: 'Costa Teguise', description: 'Playa de Las Cucharas, paseo marítimo, tiendas. A 20 min del hotel' },
      { time: '16:00', category: 'activity', name: 'Lanzarote Aquarium', description: 'Opcional. 33 tanques con fauna del Atlántico canario, tiburones, rayas gigantes. Costa Teguise' },
      { time: '20:30', category: 'restaurant', name: 'Palacio Ico ⭐', description: 'Menú degustación de producto canario en un palacio colonial del s.XVI. Reserva imprescindible', phone: '+34 928 59 49 42', mustBook: true },
    ],
  },
  {
    day: 5,
    date: '2026-04-23',
    label: 'MIÉ 23 ABR',
    title: 'Playas de Papagayo',
    heroImage: 'https://images.unsplash.com/photo-GhJG7ulTq_Y?w=1200&q=80',
    coordinates: { lat: 28.8426, lng: -13.7881 },
    activities: [
      { time: '09:30', category: 'beach', name: 'Playas de Papagayo', description: 'Las mejores calas de Lanzarote. Arena blanca, agua cristalina, entorno virgen. Entrada al parque natural 3€. Lleva agua y comida' },
      { time: '11:00', category: 'activity', name: 'Kayak & Snorkel (opcional)', description: 'Lanzarote Adventure by Zenith. Kayak hasta Papagayo, cueva pirata, snorkel con peces. Desde Playa Blanca', phone: '+34 653 48 31 34' },
      { time: '14:00', category: 'beach', name: 'Playa Mujeres', description: 'Cala más tranquila a 15 min caminando. Aguas más calmadas, ideal para nadar' },
      { time: '20:00', category: 'restaurant', name: 'Casual Seafood', description: '4.9⭐ el mejor marisco de la isla. Gambas al ajillo, ceviche, tartar de atún. En Faro Park, Playa Blanca', phone: '+34 683 11 98 09', mustBook: true },
    ],
  },
  {
    day: 6,
    date: '2026-04-24',
    label: 'JUE 24 ABR',
    title: 'Puerto del Carmen',
    heroImage: 'https://images.unsplash.com/photo-7CDuSaIXpqY?w=1200&q=80',
    coordinates: { lat: 28.921, lng: -13.663 },
    activities: [
      { time: '10:00', category: 'beach', name: 'Playa Grande (Puerto del Carmen)', description: 'La playa más larga de Lanzarote. 3.5km de arena dorada, aguas tranquilas, paseo marítimo' },
      { time: '13:00', category: 'restaurant', name: 'Café La Ola', description: 'Terraza frente al mar. Buenas vistas, ambiente local, perfecto para el mediodía' },
      { time: '16:00', category: 'activity', name: 'Avenida de las Playas', description: 'Paseo por el frente marítimo. Tiendas, heladerías, ambiente canario' },
      { time: '19:00', category: 'restaurant', name: 'La Carmencita del Puerto', description: '4.8⭐ Tapas de altísimo nivel. Conejo, cerdo ibérico, bacalao. Solo cenas. Reserva muy recomendada', phone: '+34 928 29 11 69', mustBook: true },
      { time: '21:30', category: 'restaurant', name: 'Casa Cabana', description: 'Joya escondida en PDC. Beef Wellington, rack de cordero. Cocina europea de autor. Reserva imprescindible', phone: '+34 689 74 19 65', mustBook: true },
    ],
  },
  {
    day: 7,
    date: '2026-04-25',
    label: 'VIE 25 ABR',
    title: 'Última Mañana · Vuelta',
    heroImage: 'https://images.unsplash.com/photo-zGg9wUvROKo?w=1200&q=80',
    coordinates: { lat: 29.0588, lng: -13.5607 },
    activities: [
      { time: '09:00', category: 'activity', name: 'Desayuno en el hotel', description: 'Última mañana. Disfruta la terraza y la piscina' },
      { time: '11:00', category: 'restaurant', name: 'El Patio Crêperie', description: 'Cócteles artesanales y ambiente único en el casco de Teguise. El mejor sitio para la despedida de la isla' },
      { time: '13:00', category: 'activity', name: 'Check-out y aeropuerto', description: 'Aeropuerto de Lanzarote (ACE) a 25 min del hotel' },
    ],
  },
];

export const checklistItems = [
  { id: 'timanfaya', label: 'Ticket Timanfaya reservado online' },
  { id: 'jameos', label: 'Reserva Jameos del Agua' },
  { id: 'cueva', label: 'Reserva Cueva de los Verdes' },
  { id: 'coche', label: 'Coche de alquiler confirmado' },
  { id: 'palacio', label: 'Reserva Palacio Ico (martes noche)' },
  { id: 'seafood', label: 'Reserva Casual Seafood (miércoles noche)' },
  { id: 'cabana', label: 'Reserva Casa Cabana (jueves noche)' },
  { id: 'carmencita', label: 'Reserva La Carmencita del Puerto' },
  { id: 'seguro', label: 'Seguro de viaje' },
  { id: 'solar', label: 'Protector solar SPF 50+' },
  { id: 'abrigo', label: 'Ropa de abrigo (noches en abril ~18°C)' },
];
