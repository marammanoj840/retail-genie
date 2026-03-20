/**
 * AR Controller - Manages clothing assets and AR configurations
 */
const clothingDatabase = [
  {
    id: 's-luxe',
    name: 'Luxe Organic Shirt',
    type: 'shirt',
    layer: 1, // Base layer
    category: 'body',
    modelUrl: 'https://cdn-icons-png.flaticon.com/512/2612/2612241.png',
    physics: { weight: 0.5, flexibility: 0.2 },
    anchors: ['shoulders', 'torso']
  },
  {
    id: 'j-tech',
    name: 'Tech-Shell Jacket',
    type: 'jacket',
    layer: 2, // Outer layer
    category: 'body',
    modelUrl: 'https://cdn-icons-png.flaticon.com/512/2906/2906857.png',
    physics: { weight: 1.2, flexibility: 0.1 },
    anchors: ['shoulders', 'arms']
  },
  {
    id: 'p-denim',
    name: 'Selvedge Denim',
    type: 'pants',
    layer: 0, // Bottom layer
    category: 'legs',
    modelUrl: 'https://cdn-icons-png.flaticon.com/512/3893/3893044.png',
    physics: { weight: 2.0, flexibility: 0.05 },
    anchors: ['hips', 'knees']
  }
];

export const getClothingList = (req, res) => {
  res.json(clothingDatabase);
};

export const getARConfig = (req, res) => {
  res.json({
    trackingEngine: 'MediaPipePose',
    smoothingFactor: 0.35,
    mirrorDefault: true,
    physicsEnabled: true
  });
};
