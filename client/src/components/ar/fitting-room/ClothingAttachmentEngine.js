/**
 * ClothingAttachmentEngine - Maps 2D assets to 3D skeleton landmarks
 * Handles layering, scaling, and rotation for shirts, jackets, and pants.
 */
export class ClothingAttachmentEngine {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  renderOutfit(landmarks, equippedItems) {
    // Definitive Layering Order:
    // 0: Skin/Base, 1: Outer Pants, 2: Shirt, 3: Jacket, 4: Accessories
    const sortedItems = [...equippedItems].sort((a, b) => a.layer - b.layer);

    sortedItems.forEach(item => {
      switch (item.category) {
        case 'body': this.drawBodyGarment(landmarks, item); break;
        case 'legs': this.drawLegsGarment(landmarks, item); break;
        case 'head': this.drawHeadGarment(landmarks, item); break;
      }
    });
  }

  drawHeadGarment(landmarks, item) {
    const bridge = landmarks[168]; // Bridge of nose
    const upperHead = landmarks[10]; // Top of head
    const lEye = landmarks[33];
    const rEye = landmarks[263];

    if (!bridge || !lEye || !rEye) return;

    const img = new Image();
    img.src = item.modelUrl;
    if (!img.complete) return;

    // Eye distance for scaling
    const dx = (rEye.x - lEye.x) * this.width;
    const dy = (rEye.y - lEye.y) * this.height;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    this.ctx.save();
    this.ctx.translate(upperHead.x * this.width, upperHead.y * this.height);
    this.ctx.rotate(angle);
    
    const scale = item.type === 'hat' ? 4.5 : 2.5; 
    const w = dist * scale;
    const h = w * (img.height / img.width);
    
    this.ctx.drawImage(img, -w / 2, -h * 0.8, w, h);
    this.ctx.restore();
  }

  drawBodyGarment(landmarks, item) {
    const lSh = landmarks[11]; // L Shoulder
    const rSh = landmarks[12]; // R Shoulder
    if (!lSh || !rSh) return;

    const img = new Image();
    img.src = item.modelUrl;
    if (!img.complete) return;

    const dx = (rSh.x - lSh.x) * this.width;
    const dy = (rSh.y - lSh.y) * this.height;
    const sWidth = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    const midX = ((lSh.x + rSh.x) / 2) * this.width;
    const midY = ((lSh.y + rSh.y) / 2) * this.height;

    // Multi-layer scale (Jackets are wider than shirts)
    const scaleFactor = item.type === 'jacket' ? 3.2 : 2.8;
    const w = sWidth * scaleFactor;
    const h = w * (img.height / img.width);

    this.ctx.save();
    this.ctx.translate(midX, midY + (h * 0.35));
    this.ctx.rotate(angle);
    this.ctx.globalAlpha = 1.0;
    this.ctx.shadowColor = 'rgba(0,0,0,0.3)';
    this.ctx.shadowBlur = 15;
    this.ctx.drawImage(img, -w / 2, -h / 2, w, h);
    this.ctx.restore();
  }

  drawLegsGarment(landmarks, item) {
    const lH = landmarks[23]; // L Hip
    const rH = landmarks[24]; // R Hip
    if (!lH || !rH) return;

    const img = new Image();
    img.src = item.modelUrl;
    if (!img.complete) return;

    const dx = (rH.x - lH.x) * this.width;
    const dy = (rH.y - lH.y) * this.height;
    const hWidth = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    const midX = ((lH.x + rH.x) / 2) * this.width;
    const midY = ((lH.y + rH.y) / 2) * this.height;

    const w = hWidth * 2.3;
    const h = w * (img.height / img.width);

    this.ctx.save();
    this.ctx.translate(midX, midY + (h * 0.45));
    this.ctx.rotate(angle);
    this.ctx.drawImage(img, -w / 2, -h / 2, w, h);
    this.ctx.restore();
  }
}
