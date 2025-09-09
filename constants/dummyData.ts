export const dummyDoctors = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    specialization: 'General Medicine',
    experience: '15 years',
    rating: 4.8,
    distance: '2.5 km',
    available: true,
    consultationFee: 300,
    languages: ['Hindi', 'Punjabi', 'English'],
    image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Dr. Priya Singh',
    specialization: 'Pediatrician',
    experience: '12 years',
    rating: 4.9,
    distance: '1.8 km',
    available: true,
    consultationFee: 400,
    languages: ['Hindi', 'English'],
    image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Dr. Amarjit Kaur',
    specialization: 'Gynecologist',
    experience: '10 years',
    rating: 4.7,
    distance: '3.2 km',
    available: false,
    consultationFee: 500,
    languages: ['Punjabi', 'Hindi', 'English'],
    image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const dummyPharmacies = [
  {
    id: '1',
    name: 'Punjab Medical Store',
    address: 'Main Market, Ludhiana',
    distance: '0.8 km',
    contact: '+91 98765 43210',
    rating: 4.5,
    openTime: '8:00 AM - 10:00 PM',
    medicines: {
      'Paracetamol': { available: true, price: 25, quantity: 100 },
      'Amoxicillin': { available: true, price: 150, quantity: 50 },
      'Cetirizine': { available: false, price: 45, quantity: 0 },
      'Cough Syrup': { available: true, price: 85, quantity: 25 }
    }
  },
  {
    id: '2',
    name: 'City Pharmacy',
    address: 'Model Town, Ludhiana',
    distance: '1.2 km',
    contact: '+91 98765 43211',
    rating: 4.3,
    openTime: '9:00 AM - 9:00 PM',
    medicines: {
      'Paracetamol': { available: true, price: 22, quantity: 200 },
      'Amoxicillin': { available: false, price: 155, quantity: 0 },
      'Cetirizine': { available: true, price: 40, quantity: 75 },
      'Cough Syrup': { available: true, price: 90, quantity: 15 }
    }
  },
  {
    id: '3',
    name: 'Health Plus Medical',
    address: 'Civil Lines, Ludhiana',
    distance: '2.1 km',
    contact: '+91 98765 43212',
    rating: 4.6,
    openTime: '24/7',
    medicines: {
      'Paracetamol': { available: true, price: 28, quantity: 150 },
      'Amoxicillin': { available: true, price: 145, quantity: 30 },
      'Cetirizine': { available: true, price: 42, quantity: 60 },
      'Cough Syrup': { available: false, price: 80, quantity: 0 }
    }
  }
];

export const symptomQuestions = {
  fever: [
    {
      id: 'fever_temp',
      question: 'How high is your fever?',
      options: [
        { text: 'Low (99-100°F)', value: 'low' },
        { text: 'Medium (101-102°F)', value: 'medium' },
        { text: 'High (103°F+)', value: 'high' }
      ]
    },
    {
      id: 'fever_duration',
      question: 'How long have you had fever?',
      options: [
        { text: 'Less than 1 day', value: '1day' },
        { text: '1-3 days', value: '3days' },
        { text: 'More than 3 days', value: '3plus' }
      ]
    }
  ],
  cough: [
    {
      id: 'cough_type',
      question: 'What type of cough do you have?',
      options: [
        { text: 'Dry cough', value: 'dry' },
        { text: 'Wet cough with mucus', value: 'wet' },
        { text: 'Whooping cough', value: 'whooping' }
      ]
    },
    {
      id: 'cough_duration',
      question: 'How long have you had this cough?',
      options: [
        { text: 'Less than 1 week', value: '1week' },
        { text: '1-2 weeks', value: '2weeks' },
        { text: 'More than 2 weeks', value: '2plus' }
      ]
    }
  ]
};

export const medicineInventory = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    stock: 250,
    minStock: 50,
    price: 25,
    expiryDate: '2025-06-15',
    manufacturer: 'Cipla Ltd'
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    category: 'Antibiotic',
    stock: 45,
    minStock: 30,
    price: 150,
    expiryDate: '2024-12-20',
    manufacturer: 'Sun Pharma'
  },
  {
    id: '3',
    name: 'Cetirizine 10mg',
    category: 'Allergy',
    stock: 0,
    minStock: 25,
    price: 45,
    expiryDate: '2024-08-30',
    manufacturer: 'Dr. Reddy\'s'
  },
  {
    id: '4',
    name: 'Cough Syrup 100ml',
    category: 'Respiratory',
    stock: 80,
    minStock: 20,
    price: 85,
    expiryDate: '2024-11-10',
    manufacturer: 'Himalaya'
  }
];