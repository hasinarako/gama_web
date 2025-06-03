import React, { useEffect, useState } from "react";

const Simulation = () => {
  const [buildings, setBuildings] = useState(null);
  const [roads, setRoads] = useState(null);
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.PUBLIC_URL}/building.geojson`).then((res) =>
        res.json()
      ),
      fetch(`${process.env.PUBLIC_URL}/road.geojson`).then((res) =>
        res.json()
      ),
      fetch(`${process.env.PUBLIC_URL}/bounds.geojson`).then((res) =>
        res.json()
      )
    ])
      .then(([buildingsData, roadsData, boundsData]) => {
        setBuildings(buildingsData);
        setRoads(roadsData);
        setBounds(boundsData);
      })
      .catch(console.error);
  }, []);

  if (!buildings || !roads || !bounds) return <div>Loading...</div>;

  // Helper functions
  function extractRings(feature) {
    const { type, coordinates } = feature.geometry;
    switch (type) {
      case "Polygon":
        return coordinates; // array of rings
      case "MultiPolygon":
        return coordinates.flat(); // flatten array of rings
      case "LineString":
        return [coordinates]; // wrap as one ring
      case "MultiLineString":
        return coordinates; // array of lines
      default:
        return []; // unsupported geometry
    }
  }

  function extractCoords(feature) {
    return extractRings(feature).flat();
  }

  // Compute overall bounds
  const allCoords = [
    ...buildings.features.flatMap(extractCoords),
    ...roads.features.flatMap(extractCoords),
    ...bounds.features.flatMap(extractCoords)
  ];

  const minX = Math.min(...allCoords.map(([x]) => x));
  const maxX = Math.max(...allCoords.map(([x]) => x));
  const minY = Math.min(...allCoords.map(([, y]) => y));
  const maxY = Math.max(...allCoords.map(([, y]) => y));

  const width = 600;
  const height = 600;
  const scale = Math.min(width / (maxX - minX), height / (maxY - minY));

  // Path generator
  const pathD = (ring) =>
    ring
      .map(([x, y], i) => {
        const px = (x - minX) * scale;
        const py = height - (y - minY) * scale; // flip y-axis
        return `${i === 0 ? "M" : "L"}${px},${py}`;
      })
      .join(" ") + " Z";

  return (
    <svg width={width} height={height}>
      {/* Draw bounds */}
      {bounds.features.map((feature, i) =>
        extractRings(feature).map((ring, j) => (
          <path
            key={`bounds-${i}-${j}`}
            d={pathD(ring)}
            fill="none"
            stroke="black"
            strokeWidth={2}
          />
        ))
      )}

      {/* Draw roads */}
      {roads.features.map((feature, i) =>
        extractRings(feature).map((ring, j) => (
          <path
            key={`road-${i}-${j}`}
            d={pathD(ring)}
            fill="none"
            stroke="lightgreen"
            strokeWidth={1}
          />
        ))
      )}

      {/* Draw buildings */}
      {buildings.features.map((feature, i) => {
        const nature = feature.properties.NATURE;
        const fillColor = nature === "Residential" ? "#5c5c5c" : "#1305e3";

        return extractRings(feature).map((ring, j) => (
          <path
            key={`building-${i}-${j}`}
            d={pathD(ring)}
            fill={fillColor}
            fillOpacity="0.6"
            stroke={fillColor}
          />
        ));
      })}
    </svg>
  );
};

export default Simulation;
