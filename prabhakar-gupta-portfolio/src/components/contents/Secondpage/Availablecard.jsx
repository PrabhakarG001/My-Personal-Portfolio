import "./Availablecard.css";
import InteractiveCard from "../../InteractiveCard.jsx";
import CobeGlobe from "../../ui/cobe-globe.jsx";

/*
 * "Based in India, available globally" globe card.
 * - Real WebGL globe (COBE) with city markers + connection arcs
 * - Labels are synced to the globe's rotation every frame (see CobeGlobe)
 * - Auto-rotation pauses off-screen / reduced-motion (handled in CobeGlobe)
 */

const GLOBE_MARKERS = [
  { id: "india", location: [28.6139, 77.209], label: "New Delhi · Home" },
  { id: "sf", location: [37.7595, -122.4367], label: "San Francisco" },
  { id: "nyc", location: [40.7128, -74.006], label: "New York" },
  { id: "tokyo", location: [35.6762, 139.6503], label: "Tokyo" },
  { id: "london", location: [51.5074, -0.1278], label: "London" },
  { id: "sydney", location: [-33.8688, 151.2093], label: "Sydney" },
  { id: "capetown", location: [-33.9249, 18.4241], label: "Cape Town" },
  { id: "dubai", location: [25.2048, 55.2708], label: "Dubai" },
  { id: "paris", location: [48.8566, 2.3522], label: "Paris" },
  { id: "saopaulo", location: [-23.5505, -46.6333], label: "São Paulo" },
];

const GLOBE_ARCS = [
  { id: "sf-tokyo", from: [37.7595, -122.4367], to: [35.6762, 139.6503], label: "SF → Tokyo" },
  { id: "nyc-london", from: [40.7128, -74.006], to: [51.5074, -0.1278], label: "NYC → London" },
];

const Availablecard = ({ delay = 0 }) => {
  return (
    <InteractiveCard
      className="available-card"
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.18 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header">
        <h2 className="title">Available for Hire</h2>
        <span className="hire-status-pill" role="status" aria-label="Open to work">
          <span className="hire-status-dot" aria-hidden="true" />
          Open to work
        </span>
      </div>

      <p className="globe-mini-heading">Flexible with timezones</p>
      <p className="globe-headline">Based in India, available globally</p>

      <div className="globe-stage">
        <CobeGlobe
          className="available-card-globe"
          markers={GLOBE_MARKERS}
          arcs={GLOBE_ARCS}
          markerColor={[0.3, 0.45, 0.85]}
          baseColor={[1, 1, 1]}
          arcColor={[0.3, 0.45, 0.85]}
          glowColor={[0.94, 0.93, 0.91]}
          dark={0}
          mapBrightness={10}
          markerSize={0.025}
          markerElevation={0.01}
          ariaLabel="Rotating globe with Prabhakar's location in India and cities he can collaborate with worldwide"
        />
      </div>
    </InteractiveCard>
  );
};

export default Availablecard;
