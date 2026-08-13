/**
 * AI Planning Engine for Computer Lab & Network Planning
 * Implements constraint solving, spatial layout generation,
 * Star Topology cabling calculation, electrical load analysis,
 * hardware recommendation, and budget optimization.
 */

export function generateLabPlan(input) {
  const {
    roomLength = 40, // in feet
    roomWidth = 30,  // in feet
    roomHeight = 12, // in feet
    numComputers = 36,
    doorPosition = "front-left",
    windowCount = 4,
    seatingPreference = "grid", // 'grid', 'u-shape', 'pods'
    labType = "ai-ds",          // 'basic', 'ai-ds', 'cad-graphics', 'networking'
    budget = 2500000,
    upsBackup = "30-min",
  } = input;

  const roomArea = roomLength * roomWidth; // sq ft

  // ----------------------------------------------------
  // 1. SPATIAL & LAYOUT CONSTRAINTS
  // ----------------------------------------------------
  const deskWidth = 3.2;   // ft per workstation
  const deskDepth = 2.0;   // ft per desk
  const chairSpace = 2.2;  // ft depth behind desk for chair & seating
  const rowDepth = deskDepth + chairSpace; // 4.2 ft per row strip
  const aisleWidth = 4.5;  // ft central aisle
  const wallClearance = 3.0; // ft clearance along perimeter walls
  const doorClearance = 5.0; // ft emergency clearance around door

  // Calculate maximum capacity under grid constraints
  const usableLength = roomLength - (wallClearance * 2);
  const usableWidth = roomWidth - (wallClearance * 2) - aisleWidth;

  const maxColsPerSide = Math.max(1, Math.floor(usableWidth / (2 * deskWidth)));
  const totalCols = maxColsPerSide * 2;
  const maxRows = Math.max(1, Math.floor((usableLength - 4.0) / rowDepth)); // 4ft front teacher area
  const maxCapacity = totalCols * maxRows;

  const isCapacityValid = numComputers <= maxCapacity;

  // Generate Workstation Coordinates
  const workstations = [];
  let currentPC = 1;

  if (seatingPreference === "u-shape") {
    // U-Shape Layout along left, back, and right walls
    const pcsPerSide = Math.ceil(numComputers / 3);

    // Left wall strip
    for (let i = 0; i < pcsPerSide && currentPC <= numComputers; i++) {
      const z = -roomLength / 2 + wallClearance + 4 + i * (deskWidth + 0.5);
      const x = -roomWidth / 2 + wallClearance;
      workstations.push({
        id: `PC-${currentPC}`,
        label: `PC-${currentPC}`,
        x,
        z,
        rotation: [0, Math.PI / 2, 0],
        row: i + 1,
        col: 1,
        section: "Left Wall",
      });
      currentPC++;
    }

    // Back wall strip
    for (let i = 0; i < pcsPerSide && currentPC <= numComputers; i++) {
      const x = -roomWidth / 2 + wallClearance + 3 + i * (deskWidth + 0.5);
      const z = roomLength / 2 - wallClearance - deskDepth;
      workstations.push({
        id: `PC-${currentPC}`,
        label: `PC-${currentPC}`,
        x,
        z,
        rotation: [0, 0, 0],
        row: 1,
        col: i + 1,
        section: "Back Wall",
      });
      currentPC++;
    }

    // Right wall strip
    for (let i = 0; i < pcsPerSide && currentPC <= numComputers; i++) {
      const z = roomLength / 2 - wallClearance - 3 - i * (deskWidth + 0.5);
      const x = roomWidth / 2 - wallClearance;
      workstations.push({
        id: `PC-${currentPC}`,
        label: `PC-${currentPC}`,
        x,
        z,
        rotation: [0, -Math.PI / 2, 0],
        row: i + 1,
        col: 3,
        section: "Right Wall",
      });
      currentPC++;
    }

  } else if (seatingPreference === "pods") {
    // Pods (Clusters of 4 back-to-back)
    const podCount = Math.ceil(numComputers / 4);
    const podsPerRow = Math.min(3, Math.floor(roomWidth / 10));

    for (let p = 0; p < podCount && currentPC <= numComputers; p++) {
      const podRow = Math.floor(p / podsPerRow);
      const podCol = p % podsPerRow;

      const baseX = -roomWidth / 3 + podCol * (roomWidth / 3);
      const baseZ = -roomLength / 4 + podRow * 7.0;

      const offsets = [
        { dx: -1.6, dz: -1.0, rot: 0 },
        { dx: 1.6, dz: -1.0, rot: 0 },
        { dx: -1.6, dz: 1.0, rot: Math.PI },
        { dx: 1.6, dz: 1.0, rot: Math.PI },
      ];

      for (let offset of offsets) {
        if (currentPC <= numComputers) {
          workstations.push({
            id: `PC-${currentPC}`,
            label: `PC-${currentPC}`,
            x: baseX + offset.dx,
            z: baseZ + offset.dz,
            rotation: [0, offset.rot, 0],
            row: podRow + 1,
            col: podCol + 1,
            section: `Pod ${p + 1}`,
          });
          currentPC++;
        }
      }
    }

  } else {
    // Standard Dual-Block Grid Layout (Default)
    const colsLeft = Math.ceil(totalCols / 2);
    const colsRight = totalCols - colsLeft;

    const startZ = -roomLength / 2 + wallClearance + 6.0; // Space for teacher area at front
    const leftBlockStartX = -aisleWidth / 2 - (colsLeft * deskWidth) / 2;
    const rightBlockStartX = aisleWidth / 2 + (colsRight * deskWidth) / 2;

    let row = 0;
    while (currentPC <= numComputers) {
      const currentZ = startZ + row * rowDepth;

      // Left Block
      for (let c = 0; c < colsLeft && currentPC <= numComputers; c++) {
        const x = leftBlockStartX + c * (deskWidth + 0.3);
        workstations.push({
          id: `PC-${currentPC}`,
          label: `PC-${currentPC}`,
          x,
          z: currentZ,
          rotation: [0, 0, 0],
          row: row + 1,
          col: c + 1,
          section: "Left Block",
        });
        currentPC++;
      }

      // Right Block
      for (let c = 0; c < colsRight && currentPC <= numComputers; c++) {
        const x = rightBlockStartX + c * (deskWidth + 0.3);
        workstations.push({
          id: `PC-${currentPC}`,
          label: `PC-${currentPC}`,
          x,
          z: currentZ,
          rotation: [0, 0, 0],
          row: row + 1,
          col: colsLeft + c + 1,
          section: "Right Block",
        });
        currentPC++;
      }

      row++;
    }
  }

  // Key Infrastructure Positions
  const serverRackPosition = {
    x: roomWidth / 2 - 2.5,
    z: -roomLength / 2 + 2.5,
  };

  const teacherDeskPosition = {
    x: 0,
    z: -roomLength / 2 + 3.0,
  };

  const smartDisplayPosition = {
    x: 0,
    z: -roomLength / 2 + 0.2,
    y: 4.5,
  };

  // ----------------------------------------------------
  // 2. NETWORK PLANNER (Star Topology & Shortest Path)
  // ----------------------------------------------------
  const switchesNeeded24Port = Math.ceil((numComputers + 4) / 24);
  const routerCount = 1;
  const serverCount = 1;

  // Calculate Star Cable Routes from Server Rack to Workstations
  let totalCableMeters = 0;
  const cableRoutes = workstations.map((pc) => {
    // Cable path: Server Rack -> Wall Trunking -> Workstation Socket
    const dx = Math.abs(pc.x - serverRackPosition.x);
    const dz = Math.abs(pc.z - serverRackPosition.z);
    const verticalDrop = roomHeight / 3; // Trunking down to desk height
    const cableLength = Math.round((dx + dz + verticalDrop) * 0.3048 * 1.15 * 10) / 10; // Convert ft to meters + 15% slack

    totalCableMeters += cableLength;

    return {
      pcId: pc.id,
      from: [serverRackPosition.x, 2.0, serverRackPosition.z],
      to: [pc.x, 1.2, pc.z],
      lengthMeters: cableLength,
    };
  });

  totalCableMeters = Math.round(totalCableMeters);

  // ----------------------------------------------------
  // 3. ELECTRICAL PLANNER
  // ----------------------------------------------------
  // Load per unit (Watts)
  let pcPowerWatts = 300;
  if (labType === "ai-ds") pcPowerWatts = 450;
  if (labType === "cad-graphics") pcPowerWatts = 650;
  if (labType === "basic") pcPowerWatts = 220;

  const monitorWatts = 45;
  const totalPCWatts = numComputers * (pcPowerWatts + monitorWatts);
  const serverRackWatts = 1200;
  const acUnitsCount = Math.max(2, Math.ceil(roomArea / 350));
  const acWatts = acUnitsCount * 2200; // 2-ton AC units
  const lightsCount = Math.max(8, Math.ceil(roomArea / 45));
  const lightingWatts = lightsCount * 36;
  const fansCount = Math.max(4, Math.ceil(roomArea / 100));
  const fansWatts = fansCount * 75;
  const projectorWatts = 400;

  const totalWatts = totalPCWatts + serverRackWatts + acWatts + lightingWatts + fansWatts + projectorWatts;
  const totalKW = Math.round((totalWatts / 1000) * 10) / 10;

  // Power Outlets: 2 sockets per workstation + auxiliary points
  const pcPowerSockets = numComputers * 2;
  const serverSockets = 8;
  const teacherSockets = 4;
  const totalPowerSockets = pcPowerSockets + serverSockets + teacherSockets + 8;

  // UPS Sizing (kVA)
  const criticalWatts = totalPCWatts + serverRackWatts + 500; // PCs + Server + Projector
  const upsRatingKVA = Math.ceil((criticalWatts * 1.35) / (1000 * 0.8)); // 0.8 Power Factor

  // ----------------------------------------------------
  // 4. HARDWARE RECOMMENDATIONS & SPECS
  // ----------------------------------------------------
  let hardwareRecommendation = {
    tier: "High-Performance AI & Data Science",
    cpu: "Intel Core i7-14700K / AMD Ryzen 7 7800X3D",
    ram: "32 GB DDR5 5600MHz",
    storage: "1 TB NVMe Gen4 SSD",
    gpu: "NVIDIA GeForce RTX 4060 Ti 16GB",
    monitor: '24" Full HD IPS 100Hz',
    serverSpec: "2U Rack Server (2x Intel Xeon, 128GB RAM, 4TB NVMe RAID)",
    switchSpec: "Cisco 24-Port Gigabit Managed Switch (PoE+)",
    routerSpec: "Cisco Enterprise Gigabit VPN Router",
  };

  if (labType === "basic") {
    hardwareRecommendation = {
      tier: "Standard Academic Computing",
      cpu: "Intel Core i5-13400 / AMD Ryzen 5 5600",
      ram: "16 GB DDR4 3200MHz",
      storage: "512 GB NVMe SSD",
      gpu: "Integrated Intel UHD Graphics 770",
      monitor: '22" Full HD IPS Monitor',
      serverSpec: "1U Entry Server (1x Intel Xeon, 32GB RAM, 2TB SSD)",
      switchSpec: "24-Port Gigabit Unmanaged Switch",
      routerSpec: "Dual-Band Gigabit Router",
    };
  } else if (labType === "cad-graphics") {
    hardwareRecommendation = {
      tier: "3D Rendering & CAD Workstation",
      cpu: "Intel Core i9-14900K / AMD Ryzen 9 7900X",
      ram: "64 GB DDR5 6000MHz",
      storage: "2 TB NVMe SSD",
      gpu: "NVIDIA RTX 4070 Ti Super 16GB",
      monitor: '27" 2K QHD IPS 144Hz Monitor',
      serverSpec: "4U GPU Server (2x Xeon, 256GB RAM, 8TB NVMe)",
      switchSpec: "24-Port 10G Managed Switch",
      routerSpec: "Enterprise 10G Gateway Router",
    };
  } else if (labType === "networking") {
    hardwareRecommendation = {
      tier: "Cybersecurity & Networking Lab",
      cpu: "Intel Core i7-13700",
      ram: "32 GB DDR5",
      storage: "1 TB NVMe SSD",
      gpu: "Integrated Intel UHD Graphics",
      monitor: 'Dual 24" FHD Monitors',
      serverSpec: "2U Server with 4x Dual Gigabit NICs",
      switchSpec: "Layer 3 Managed Gigabit Switch with VLAN support",
      routerSpec: "Enterprise Firewall & VPN Gateway",
    };
  }

  // ----------------------------------------------------
  // 5. BUDGET OPTIMIZER & BILL OF MATERIALS (BOM)
  // ----------------------------------------------------
  const costPerPC = labType === "basic" ? 38000 : labType === "cad-graphics" ? 95000 : labType === "networking" ? 62000 : 72000;
  const costPerMonitor = labType === "cad-graphics" ? 22000 : 12000;

  const bom = [
    { item: `Workstation Systems (${hardwareRecommendation.cpu})`, qty: numComputers, unitCost: costPerPC, total: numComputers * costPerPC },
    { item: `Monitors (${hardwareRecommendation.monitor})`, qty: numComputers, unitCost: costPerMonitor, total: numComputers * costPerMonitor },
    { item: "Server Rack Assembly (Server + Rack Cabinet)", qty: 1, unitCost: 350000, total: 350000 },
    { item: `Managed Network Switches (${switchesNeeded24Port}x 24-Port)`, qty: switchesNeeded24Port, unitCost: 28000, total: switchesNeeded24Port * 28000 },
    { item: "Enterprise Router & Firewall", qty: 1, unitCost: 45000, total: 45000 },
    { item: `CAT6 Ethernet Cabling & Conduit (${totalCableMeters}m)`, qty: totalCableMeters, unitCost: 45, total: totalCableMeters * 45 },
    { item: `Online UPS System (${upsRatingKVA} kVA)`, qty: 1, unitCost: 110000 + upsRatingKVA * 5000, total: 110000 + upsRatingKVA * 5000 },
    { item: `Electrical Outlets, MCBs & Switchboards`, qty: totalPowerSockets, unitCost: 650, total: totalPowerSockets * 650 },
    { item: `Ergonomic Student Desks & Chairs`, qty: numComputers, unitCost: 6500, total: numComputers * 6500 },
    { item: `Teacher Desk & Executive Chair`, qty: 1, unitCost: 25000, total: 25000 },
    { item: `Smart Interactive Display (75") & Projector`, qty: 1, unitCost: 140000, total: 140000 },
    { item: `Air Conditioners (2-Ton Inverter)`, qty: acUnitsCount, unitCost: 52000, total: acUnitsCount * 52000 },
  ];

  const totalCalculatedCost = bom.reduce((sum, item) => sum + item.total, 0);

  return {
    timestamp: new Date().toISOString(),
    isCapacityValid,
    maxCapacity,
    capacityWarning: !isCapacityValid
      ? `Room dimensions (${roomLength}ft × ${roomWidth}ft) can comfortably fit up to ${maxCapacity} workstations with proper safety aisles. You requested ${numComputers}.`
      : null,
    spatial: {
      roomLength,
      roomWidth,
      roomHeight,
      roomArea,
      numComputers,
      seatingPreference,
      workstations,
      serverRackPosition,
      teacherDeskPosition,
      smartDisplayPosition,
      aisleWidth,
      doorClearance,
    },
    network: {
      topology: "Star Topology",
      switchesNeeded24Port,
      routerCount,
      serverCount,
      totalCableMeters,
      cableRoutes,
    },
    electrical: {
      totalWatts,
      totalKW,
      pcPowerSockets,
      totalPowerSockets,
      switchboardsCount: Math.ceil(numComputers / 6),
      upsRatingKVA,
      upsBackupTime: upsBackup,
      acUnitsCount,
      lightingWatts,
      lightsCount,
      fansCount,
    },
    hardware: hardwareRecommendation,
    budget: {
      requestedBudget: budget,
      totalCalculatedCost,
      costDifference: budget - totalCalculatedCost,
      isWithinBudget: totalCalculatedCost <= budget,
      bom,
    },
  };
}
