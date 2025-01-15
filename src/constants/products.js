import chair3d from '../assets/3d-chair.jpg';
import spaceship from '../assets/sci-fi.jpg';
import castle from '../assets/medieval-castle.jpg';
import plants from '../assets/palm-tree.jpg';
import car from '../assets/sport-car.jpg';
import character from '../assets/game-character.jpg';
import kitchen from '../assets/modern-kitchen.jpeg';
import robot from '../assets/robot.jpg';

export const products = [
  {
    id: 1,
    name: '3D Modern Chair',
    price: 149.99,
    description:
      'High-quality 3D model of a modern minimalist chair, perfect for architectural visualization.',
    image: chair3d,
    category: 'Furniture',
    rating: 4.5,
    format: ['FBX', 'OBJ', 'MAX'],
    polygons: '24k',
    textures: '4K PBR'
  },
  {
    id: 2,
    name: 'Sci-Fi Spaceship',
    price: 299.99,
    description: 'Detailed sci-fi spacecraft model with interior details and animated components.',
    image: spaceship,
    category: 'Vehicles',
    rating: 4.8,
    format: ['FBX', 'OBJ', 'BLEND'],
    polygons: '150k',
    textures: '8K PBR'
  },
  {
    id: 3,
    name: 'Medieval Castle',
    price: 399.99,
    description: 'Historically accurate medieval castle with full interior and exterior details.',
    image: castle,
    category: 'Architecture',
    rating: 4.7,
    format: ['FBX', 'OBJ', 'MAX'],
    polygons: '500k',
    textures: '8K PBR'
  },
  {
    id: 4,
    name: 'Tropical Plant Pack',
    price: 79.99,
    description:
      'Collection of 20 high-quality tropical plants and trees with seasonal variations.',
    image: plants,
    category: 'Nature',
    rating: 4.6,
    format: ['FBX', 'OBJ', 'C4D'],
    polygons: '15k per model',
    textures: '4K PBR'
  },
  {
    id: 5,
    name: 'Sports Car Concept',
    price: 249.99,
    description: 'High-performance sports car with detailed interior and customizable parts.',
    image: car,
    category: 'Vehicles',
    rating: 4.9,
    format: ['FBX', 'OBJ', 'MAX'],
    polygons: '200k',
    textures: '8K PBR'
  },
  {
    id: 6,
    name: 'Game Character Hero',
    price: 179.99,
    description: 'Fully rigged game character with multiple animations and customizable outfits.',
    image: character,
    category: 'Characters',
    rating: 4.7,
    format: ['FBX', 'OBJ', 'BLEND'],
    polygons: '85k',
    textures: '4K PBR'
  },
  {
    id: 7,
    name: 'Modern Kitchen Set',
    price: 199.99,
    description: 'Complete modern kitchen set with appliances and customizable materials.',
    image: kitchen,
    category: 'Furniture',
    rating: 4.8,
    format: ['FBX', 'OBJ', 'MAX'],
    polygons: '300k',
    textures: '8K PBR'
  },
  {
    id: 8,
    name: 'Industrial Robot Arm',
    price: 159.99,
    description: 'Detailed industrial robot arm with fully animated joints and control rig.',
    image: robot,
    category: 'Industrial',
    rating: 4.6,
    format: ['FBX', 'OBJ', 'BLEND'],
    polygons: '120k',
    textures: '4K PBR'
  }
];