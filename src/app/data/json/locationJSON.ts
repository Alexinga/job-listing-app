import { Location } from '../schema/location';

export const LOCATION_DATA: Location[] = [
  {
    country: 'United States',
    states: [
      {
        name: 'California',
        cities: ['Los Angeles', 'San Francisco', 'San Diego'],
      },
      {
        name: 'New York',
        cities: ['New York City', 'Buffalo', 'Albany'],
      },
      {
        name: 'Texas',
        cities: ['Houston', 'Dallas', 'Austin'],
      },
    ],
  },
  {
    country: 'Canada',
    states: [
      {
        name: 'Ontario',
        cities: ['Toronto', 'Ottawa', 'Hamilton'],
      },
      {
        name: 'British Columbia',
        cities: ['Vancouver', 'Victoria', 'Richmond'],
      },
    ],
  },
  {
    country: 'India',
    states: [
      {
        name: 'Maharashtra',
        cities: ['Mumbai', 'Pune', 'Nagpur'],
      },
      {
        name: 'Karnataka',
        cities: ['Bangalore', 'Mysore', 'Hubli'],
      },
    ],
  },
];
