// Theatre.js exported animation state
// This encodes all keyframe data for the logo animation sequence
export const projectState = {
  "sheetsById": {
    "LogoAnimation": {
      "staticOverrides": {
        "byObject": {
          "LogoMesh": {
            "position.x": 0,
            "position.y": 0,
            "position.z": 0,
            "rotation.x": 0,
            "rotation.y": 0,
            "rotation.z": 0,
            "scale.x": 1,
            "scale.y": 1,
            "scale.z": 1,
            "emissiveIntensity": 1.2
          },
          "Camera": {
            "position.x": 0,
            "position.y": 0,
            "position.z": 8
          },
          "RingA": { "rotation.y": 0, "opacity": 1 },
          "RingB": { "rotation.y": 0, "opacity": 1 },
          "PointLight": { "intensity": 2, "colorR": 0.42, "colorG": 0.38, "colorB": 1 }
        }
      },
      "sequence": {
        "subUnitsPerUnit": 30,
        "length": 6,
        "type": "PositionalSequence",
        "tracksByObject": {
          "LogoMesh": {
            "trackData": {
              "scale.x": {
                "type": "BasicKeyframedTrack",
                "__debugName": "scale.x",
                "keyframes": [
                  { "id": "k1", "position": 0, "connectedRight": true, "handles": [0.5,0,0.5,1], "value": 0, "type": "bezier" },
                  { "id": "k2", "position": 1.5, "connectedRight": true, "handles": [0.5,0,0.5,1], "value": 1.2, "type": "bezier" },
                  { "id": "k3", "position": 2.0, "connectedRight": true, "handles": [0.5,0,0.5,1], "value": 1.0, "type": "bezier" }
                ]
              },
              "scale.y": {
                "type": "BasicKeyframedTrack",
                "__debugName": "scale.y",
                "keyframes": [
                  { "id": "k1", "position": 0, "connectedRight": true, "handles": [0.5,0,0.5,1], "value": 0, "type": "bezier" },
                  { "id": "k2", "position": 1.5, "connectedRight": true, "handles": [0.5,0,0.5,1], "value": 1.2, "type": "bezier" },
                  { "id": "k3", "position": 2.0, "connectedRight": true, "handles": [0.5,0,0.5,1], "value": 1.0, "type": "bezier" }
                ]
              },
              "scale.z": {
                "type": "BasicKeyframedTrack",
                "__debugName": "scale.z",
                "keyframes": [
                  { "id": "k1", "position": 0, "connectedRight": true, "handles": [0.5,0,0.5,1], "value": 0, "type": "bezier" },
                  { "id": "k2", "position": 1.5, "connectedRight": true, "handles": [0.5,0,0.5,1], "value": 1.2, "type": "bezier" },
                  { "id": "k3", "position": 2.0, "connectedRight": true, "handles": [0.5,0,0.5,1], "value": 1.0, "type": "bezier" }
                ]
              },
              "rotation.y": {
                "type": "BasicKeyframedTrack",
                "__debugName": "rotation.y",
                "keyframes": [
                  { "id": "k1", "position": 0, "connectedRight": true, "handles": [0.5,0,0.5,1], "value": -3.14, "type": "bezier" },
                  { "id": "k2", "position": 2.0, "connectedRight": true, "handles": [0.5,0,0.5,1], "value": 0, "type": "bezier" },
                  { "id": "k3", "position": 4.0, "connectedRight": true, "handles": [0.5,0,0.5,1], "value": 0.15, "type": "bezier" },
                  { "id": "k4", "position": 6.0, "connectedRight": true, "handles": [0.5,0,0.5,1], "value": 0, "type": "bezier" }
                ]
              },
              "emissiveIntensity": {
                "type": "BasicKeyframedTrack",
                "__debugName": "emissiveIntensity",
                "keyframes": [
                  { "id": "k1", "position": 0, "connectedRight": true, "handles": [0.5,0,0.5,1], "value": 0, "type": "bezier" },
                  { "id": "k2", "position": 1.5, "connectedRight": true, "handles": [0.5,0,0.5,1], "value": 3, "type": "bezier" },
                  { "id": "k3", "position": 2.5, "connectedRight": true, "handles": [0.5,0,0.5,1], "value": 1.2, "type": "bezier" }
                ]
              }
            }
          },
          "PointLight": {
            "trackData": {
              "intensity": {
                "type": "BasicKeyframedTrack",
                "__debugName": "intensity",
                "keyframes": [
                  { "id": "k1", "position": 0, "connectedRight": true, "handles": [0.5,0,0.5,1], "value": 0, "type": "bezier" },
                  { "id": "k2", "position": 1.0, "connectedRight": true, "handles": [0.5,0,0.5,1], "value": 5, "type": "bezier" },
                  { "id": "k3", "position": 2.0, "connectedRight": true, "handles": [0.5,0,0.5,1], "value": 2, "type": "bezier" }
                ]
              }
            }
          }
        }
      }
    }
  }
}
