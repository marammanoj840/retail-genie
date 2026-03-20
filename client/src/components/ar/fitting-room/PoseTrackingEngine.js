/**
 * PoseTrackingEngine - High-fidelity MediaPipe Pose Wrapper
 * Includes landmark smoothing logic to prevent jitter in AR overlays.
 */
export class PoseTrackingEngine {
  constructor(videoElement, onResults) {
    this.video = videoElement;
    this.onResults = onResults;
    this.pose = null;
    this.camera = null;
    this.smoothedLandmarks = null;
    this.smoothingFactor = 0.35; // Lower is smoother but laggier
  }

  async init() {
    if (!window.Pose || !window.Camera) {
      throw new Error("MediaPipe Pose dependencies missing.");
    }

    this.pose = new window.Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    this.pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    this.pose.onResults((results) => {
      if (results.poseLandmarks) {
        this.applySmoothing(results.poseLandmarks);
      }
      this.onResults({ ...results, smoothedLandmarks: this.smoothedLandmarks });
    });

    this.camera = new window.Camera(this.video, {
      onFrame: async () => {
        if (this.video) await this.pose.send({ image: this.video });
      },
      width: 1280,
      height: 720,
    });

    return this.camera.start();
  }

  /**
   * Exponential Moving Average smoothing
   */
  applySmoothing(rawLandmarks) {
    if (!this.smoothedLandmarks) {
      this.smoothedLandmarks = JSON.parse(JSON.stringify(rawLandmarks));
      return;
    }

    for (let i = 0; i < rawLandmarks.length; i++) {
      this.smoothedLandmarks[i].x = 
        this.smoothedLandmarks[i].x * (1 - this.smoothingFactor) + 
        rawLandmarks[i].x * this.smoothingFactor;
      
      this.smoothedLandmarks[i].y = 
        this.smoothedLandmarks[i].y * (1 - this.smoothingFactor) + 
        rawLandmarks[i].y * this.smoothingFactor;
      
      this.smoothedLandmarks[i].z = 
        this.smoothedLandmarks[i].z * (1 - this.smoothingFactor) + 
        rawLandmarks[i].z * this.smoothingFactor;
    }
  }

  stop() {
    if (this.camera) this.camera.stop();
    if (this.pose) this.pose.close();
  }
}
