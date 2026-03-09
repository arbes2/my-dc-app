import { useState, useEffect, useRef } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "fundamentals",
    icon: "🏢",
    title: "Data Centre Fundamentals",
    color: "#00B4D8",
    topics: [
      {
        title: "What Is a Data Centre?",
        content: `A data centre is a dedicated physical facility purpose-built to house IT computing equipment, network infrastructure, and storage systems in a controlled, secure environment. Think of it as the brain of the digital world — every website you visit, every email you send, and every video you stream is processed and stored somewhere inside one of these buildings.

Modern data centres range from small server rooms the size of a cupboard to hyperscale campus facilities covering hundreds of thousands of square feet. They operate 24 hours a day, 365 days a year, and must maintain extremely stable environmental conditions — precise temperature, humidity, and power — to ensure equipment functions reliably.`,
        example: `**Real-World Example:** When you watch Netflix, your device connects to a Netflix data centre — possibly located in Virginia, USA, or Amsterdam, Netherlands. Inside that facility, thousands of servers stream your chosen film in milliseconds. If you pause mid-scene, the data centre "remembers" exactly where you were. Without it, streaming services simply could not exist.`,
        keyPoints: ["24/7 continuous operation", "Controlled temperature & humidity", "Tier I–IV classification", "Ranges from server closets to hyperscale facilities", "Foundation of cloud computing"],
      },
      {
        title: "Basic Design Requirements",
        content: `Every data centre must be designed around six core pillars: Availability, Scalability, Security, Efficiency, Resilience, and Compliance. These are not aspirational — they are engineering requirements that dictate every decision from cabling routes to how many generators are installed.

**Availability** means the facility must remain operational despite equipment failures, planned maintenance, or unexpected events. **Scalability** ensures that as demand grows (more servers, more power), the building can accommodate this without a complete rebuild. **Security** protects both the physical assets and the data within them.`,
        example: `**Real-World Example:** A bank designs its data centre with 2N power redundancy — meaning every power component is doubled. If the primary UPS fails during a thunderstorm, the secondary automatically takes over in milliseconds. Customers never notice an outage. This "always-on" design is a direct result of the Availability requirement.`,
        keyPoints: ["Availability — uptime SLA targets", "Scalability — room to grow", "Security — layered protection", "Efficiency — low PUE target", "Resilience — fault tolerance"],
      },
      {
        title: "Availability & Resilience",
        content: `The Uptime Institute classifies data centres into four Tiers based on their ability to withstand failures without affecting operations:

**Tier I** — Basic capacity. Single paths for power and cooling, no redundancy. 99.671% availability (~28 hrs downtime/year).
**Tier II** — Redundant capacity components. Partial redundancy. 99.741% availability (~22 hrs/year).  
**Tier III** — Concurrently maintainable. Any component can be serviced without shutting down the IT load. 99.982% (~1.6 hrs/year).  
**Tier IV** — Fault tolerant. Any single failure won't cause downtime. 99.995% (~26 mins/year).

Redundancy is expressed as N (minimum needed), N+1 (one spare), 2N (fully doubled), or 2(N+1) (doubled with spares).`,
        example: `**Real-World Example:** A hospital's data centre is Tier IV certified. During a maintenance window, engineers replace a faulty UPS module. Because the facility is "concurrently maintainable" and fault-tolerant, the MRI scanner booking system, patient records, and life-support monitoring all remain online throughout — completely unaware that work was happening.`,
        keyPoints: ["Tier I–IV Uptime Institute rating", "N, N+1, 2N redundancy models", "Concurrent maintainability", "Fault tolerance vs fault resilience", "DR and business continuity planning"],
      },
    ],
  },
  {
    id: "compliance",
    icon: "📋",
    title: "Compliance & Standards",
    color: "#F0A500",
    topics: [
      {
        title: "Codes, Regulations & National Standards",
        content: `Data centres must comply with a complex web of codes and regulations. In the UK, the primary electrical standard is **BS 7671** (IET Wiring Regulations), which governs how all electrical installations must be designed and certified. Building Regulations Part L addresses energy efficiency.

**BS EN 50600** is the European standard specifically for data centre facilities and infrastructure. It covers everything from site location risk assessment to power distribution, cooling, physical security, and management systems. The standard is divided into multiple parts, each addressing a different aspect of the facility.`,
        example: `**Real-World Example:** A data centre operator in Manchester is building a new facility. Before opening, they must demonstrate compliance with BS EN 50600-2-2 (Power Distribution) to their insurers and clients. An independent auditor reviews their electrical drawings, tests the installation against BS 7671, and issues a certification. Without this, the facility cannot legally operate or attract enterprise clients.`,
        keyPoints: ["BS 7671 — IET Wiring Regulations (UK)", "BS EN 50600 — DC Infrastructure Standard", "Building Regulations Part L — energy", "Local planning and fire codes", "Health & Safety at Work Act"],
      },
      {
        title: "International Standards & Certification",
        content: `Beyond national codes, data centres align with international standards that are recognised globally:

**ISO/IEC 27001** — Information Security Management System. Ensures the facility has processes to protect data confidentiality, integrity, and availability. Required by many financial and government clients.

**TIA-942** — Telecommunications Infrastructure Standard for Data Centres. An American standard widely used globally that defines structured cabling, physical layout, redundancy tiers, and equipment zones.

**Uptime Institute Tier Certification** — A third-party audit and certification confirming the facility genuinely meets its claimed Tier level in design, construction, and operations.`,
        example: `**Real-World Example:** A cloud provider wants to win a UK government contract. The contract requires ISO 27001 certification and Uptime Institute Tier III Certification. The provider commissions a 6-month audit programme. Auditors review security policies, physical access logs, change management records, and conduct a site visit. Upon certification, the provider wins the contract — the standards are the proof of trust.`,
        keyPoints: ["ISO/IEC 27001 — Information Security", "ISO 14001 — Environmental Management", "TIA-942 — DC Telecommunications Standard", "PCI-DSS — Payment card data environments", "SOC 2 Type II — Controls attestation"],
      },
    ],
  },
  {
    id: "infrastructure",
    icon: "⚡",
    title: "The Physical Infrastructure",
    color: "#22C55E",
    topics: [
      {
        title: "The Four Key Environments",
        content: `Every data centre is built around four interdependent environments that must work in harmony:

**Power** — The electrical supply chain from the utility grid through transformers, UPS systems, generators, and PDUs to individual server power sockets. Without reliable power, nothing works.

**Cooling** — The thermal management systems that remove heat generated by IT equipment. Servers convert virtually all electrical energy into heat; this must be expelled or equipment will overheat and fail.

**IT** — The servers, storage arrays, networking equipment, and software that actually process and store data. This is the "productive" environment that justifies everything else.

**Space** — The physical building, cabinets, cable infrastructure, and separation between white space (IT equipment) and grey space (mechanical and electrical plant).`,
        example: `**Real-World Example:** Imagine building a data centre like a hospital. Power = the building's electrical system (must never fail). Cooling = air conditioning (patients/servers need stable temperature). IT = the medical equipment (the actual reason the building exists). Space = the layout of wards and operating theatres (organisation and access control). Change any one environment and it affects all the others.`,
        keyPoints: ["Power — electrical supply chain", "Cooling — thermal management", "IT — computing equipment", "Space — white vs grey space", "All four are interdependent"],
      },
      {
        title: "Power Infrastructure",
        content: `The electrical distribution path in a data centre follows a carefully engineered sequence to ensure that if any single component fails, the load continues uninterrupted:

**Utility supply → HV/MV Transformer → Main LV Switchboard (MLVS) → UPS Systems → Static Transfer Switch (STS) → Power Distribution Units (PDUs) → Rack PDUs → Server power supplies**

**UPS (Uninterruptible Power Supply)** systems use batteries to provide instant power if the mains supply fails, typically bridging the 10–15 seconds it takes for diesel generators to start and reach full speed. Generators provide long-term backup power and must be tested regularly under load to confirm reliability.

**A and B power feeds** ensure every server has two independent power paths — if the A-feed PDU fails, the server's second PSU switches to the B-feed automatically.`,
        example: `**Real-World Example:** During Storm Éowyn in January 2025, a data centre in Ireland lost mains power for 4 hours. The UPS batteries provided seamless bridging for 12 seconds until the diesel generators started. The generators ran on fuel stored on-site, and the facility called their fuel supplier for a priority delivery. Clients experienced zero downtime — they didn't even know there was a grid outage.`,
        keyPoints: ["Utility → Transformer → MLVS → UPS → PDU path", "UPS bridges generator start delay", "A & B redundant feed to every server", "Generators tested monthly under load", "iPDU metering at outlet level"],
      },
      {
        title: "Cooling Infrastructure",
        content: `Data centre cooling must remove heat from IT equipment as efficiently as possible. The main approaches are:

**CRAC/CRAH Units** — Computer Room Air Conditioning/Handlers placed around the room perimeter or between aisles. Cold air is distributed under a raised floor through perforated tiles.

**Hot-Aisle/Cold-Aisle Containment** — Racks are arranged back-to-back (hot aisle) and front-to-front (cold aisle). Containment curtains or ceilings prevent hot and cold air mixing, dramatically improving efficiency.

**In-Row Cooling (IRC)** — Cooling units placed between racks deliver cold air directly to equipment, eliminating the need to cool the entire room.

**Liquid Cooling** — For very high-density AI/GPU servers, water is circulated through cold plates attached directly to CPUs and GPUs. Immersion cooling submerges servers in dielectric fluid.`,
        example: `**Real-World Example:** A data centre running traditional perimeter cooling had a PUE of 1.8 — meaning for every 1W of IT load, 0.8W was wasted on cooling. After retrofitting hot-aisle containment and raising the cold aisle setpoint from 18°C to 24°C, the PUE dropped to 1.35 — saving over £200,000/year in electricity costs with no new equipment purchased.`,
        keyPoints: ["CRAC/CRAH perimeter cooling", "Hot-aisle/cold-aisle containment (HAC/CAC)", "In-row cooling for high density", "Liquid and immersion cooling for AI workloads", "Economiser/free-cooling reduces compressor hours"],
      },
      {
        title: "IT Connectivity & Networks",
        content: `The IT environment encompasses the entire computing stack and the networks that connect it:

**Data Centre Networks** typically use a **leaf-spine topology** — every server rack (leaf) connects directly to a spine switch layer. This creates a flat, low-latency, high-bandwidth fabric ideal for east-west traffic (server-to-server, common in cloud and virtualised environments). Traditional three-tier (core/aggregation/access) architectures are still found in legacy environments.

**Structured Cabling** follows standards (TIA-942, EN 50600-2-4) with defined zones: MDA (Main Distribution Area), HDA (Horizontal Distribution Area), and EDA (Equipment Distribution Area). Fibre optic cabling dominates — multimode for short runs within the data centre, single-mode for longer distances between facilities.

**Servers and Storage** include physical servers (1U rack-mount to blade chassis), virtualised environments (VMware, Hyper-V), containerised workloads, SAN (Storage Area Network), NAS (Network Attached Storage), and all-flash arrays.`,
        example: `**Real-World Example:** A financial trading firm uses a leaf-spine network in their data centre with 100Gbps uplinks. Every microsecond matters in trading. Their structured cabling uses single-mode pre-terminated fibre MPO trunks that take minutes to install rather than hours — minimising the risk of human error and downtime during any change to the network.`,
        keyPoints: ["Leaf-spine topology for east-west traffic", "Structured cabling zones: MDA, HDA, EDA", "Fibre: multimode (short) & single-mode (long)", "SAN, NAS, and object storage", "1U rack servers to blade chassis"],
      },
    ],
  },
  {
    id: "working",
    icon: "👷",
    title: "Working in the Data Centre",
    color: "#EF4444",
    topics: [
      {
        title: "Safety Considerations",
        content: `Data centres contain numerous hazards: high-voltage electrical systems, chemical fire suppression gases, heavy equipment, manual handling risks, and working in confined spaces. Safe working is non-negotiable.

**Risk Assessment & Method Statements (RAMS)** must be completed before any non-routine work. The risk assessment identifies hazards and controls; the method statement describes step-by-step how the work will be done safely. Both documents must be reviewed and signed off before work begins.

**Permit to Work (PTW)** is a formal safety management system for high-risk tasks — electrical isolation, hot work, working at height, confined space entry. The PTW ensures the right people authorise the work, the right controls are in place, and the facility is returned to a safe state afterwards.

**Life Safety Systems** include VESDA (Very Early Smoke Detection Apparatus) which detects smoke particles before visible smoke appears, and gaseous suppression systems (FM-200, Novec 1230, inert gas) that extinguish fires without damaging equipment or leaving residue.`,
        example: `**Real-World Example:** An engineer needs to replace a faulty PDU busbar in a live data centre. Before touching anything, they complete a RAMS, obtain a PTW from the Authorised Person (AP), carry out a Lockout/Tagout (LOTO) isolation procedure, use a two-pole voltage indicator to prove the circuit is dead, and only then proceed — wearing arc flash PPE rated to the calculated incident energy. This process takes longer than the actual work, but a mistake could be fatal.`,
        keyPoints: ["RAMS completed before non-routine work", "Permit to Work (PTW) for high-risk tasks", "LOTO — Lockout/Tagout isolation procedure", "VESDA early smoke detection", "FM-200/Novec gaseous suppression"],
      },
      {
        title: "MACs, Asset Management & Change Control",
        content: `**MACs (Moves, Adds and Changes)** are the day-to-day operational activities that modify the data centre configuration — installing a new server, relocating equipment to a different rack, adding a network cable. Each MAC must follow a formal change management process to avoid introducing errors.

**Change Management** (typically ITIL-aligned) requires: a change request, impact assessment, peer review, approval from a Change Advisory Board (CAB) for significant changes, a rollback plan, and post-implementation review. This prevents well-intentioned changes from accidentally causing outages.

**Asset Management** tracks every physical item in the data centre — make, model, serial number, rack location, power draw, network ports, and associated services. DCIM (Data Centre Infrastructure Management) platforms provide real-time dashboards showing power capacity, cooling headroom, and space utilisation.`,
        example: `**Real-World Example:** An engineer submits a change request to add 4 new servers. The change management process identifies that this will consume 8kW of power — but the target rack's PDU is already at 85% capacity. The change is paused, the server is re-homed to a different rack with headroom, and the DCIM asset register is updated. Without this process, an uncontrolled add could have tripped the PDU's overcurrent protection, taking down an entire cabinet of customer servers.`,
        keyPoints: ["MACs — Moves, Adds and Changes", "Change request → CAB approval process", "DCIM for real-time asset tracking", "Rack elevation drawings kept current", "Decommissioning includes secure data erasure"],
      },
    ],
  },
  {
    id: "maintenance",
    icon: "🔧",
    title: "Data Centre Maintenance",
    color: "#8B5CF6",
    topics: [
      {
        title: "Maintenance Strategies",
        content: `Data centre maintenance is not optional — it is essential to preserving availability and equipment lifespan. There are four primary strategies:

**Preventative Maintenance (PPM)** — Scheduled servicing at fixed intervals regardless of equipment condition. Examples: annual UPS battery tests, quarterly CRAC filter changes, 6-monthly generator oil changes. Planned, predictable, cost-certain.

**Predictive Maintenance** — Uses data from sensors, thermal imaging, oil analysis, and vibration monitoring to predict when equipment is likely to fail. Maintenance is only performed when the data indicates it is needed, reducing unnecessary interventions.

**Reliability Centred Maintenance (RCM)** — A structured methodology that analyses the function of each asset, its failure modes, and the consequences of failure to determine the most appropriate maintenance strategy for each item.

**Condition-Based Maintenance (CBM)** — Triggered by real-time condition indicators crossing a threshold: e.g., a generator coolant temperature sensor reading high triggers an inspection rather than waiting for the scheduled quarterly visit.`,
        example: `**Real-World Example:** A data centre uses infrared thermography on its LV switchgear every 6 months (PPM). During one scan, the thermal camera reveals a "hot spot" on a busbar connection — 42°C above surrounding temperature. This is a predictive indicator of a loose connection that could arc-fault and cause a fire. The fault is rectified during the next planned maintenance window, preventing a potentially catastrophic failure.`,
        keyPoints: ["PPM — scheduled at fixed intervals", "Predictive — data-driven condition monitoring", "RCM — failure mode analysis framework", "CBM — threshold-triggered maintenance", "Infrared thermography for electrical systems"],
      },
    ],
  },
  {
    id: "power",
    icon: "🔌",
    title: "Data Centre Power Infrastructure",
    color: "#06B6D4",
    topics: [
      {
        title: "Electrical Safety",
        content: `Electrical safety in data centres is governed by strict rules and legal requirements. The main framework in the UK is the **Electricity at Work Regulations 1989**, which requires that all electrical systems are constructed, maintained, and used safely. Compliance is a legal duty.

Key safety practices:
**Authorised Person (AP) / Competent Person** — Only trained and authorised individuals may perform electrical work or issue Permits to Work. The AP is responsible for the safety of the electrical system.

**Lockout/Tagout (LOTO)** — A physical process of isolating equipment from its energy source (locking open a breaker, removing fuses) and attaching a tag confirming who has isolated it. This prevents accidental re-energisation.

**Arc Flash** — When a fault causes an electrical arc, temperatures can reach 20,000°C — hotter than the surface of the sun. Arc flash risk assessment determines the Personal Protective Equipment (PPE) required for work near live conductors.`,
        example: `**Real-World Example:** An engineer is replacing a faulty meter in a live LV panel. The arc flash risk assessment calculates the Incident Energy as 12 cal/cm². The engineer must wear an arc flash suit rated to at least 12 cal/cm², face shield, insulated gloves, and safety boots. Working on a live panel without this PPE is a disciplinary offence and a criminal liability under the Health & Safety at Work Act.`,
        keyPoints: ["Electricity at Work Regulations 1989", "Authorised Person (AP) role", "LOTO — physical isolation procedure", "Arc flash risk assessment and PPE", "Safe isolation: isolate, test, prove dead"],
      },
      {
        title: "Backup Power & Earthing",
        content: `**Diesel Generators** are the backbone of backup power in most data centres. A typical 1500rpm diesel genset can start and reach full rated output within 10–15 seconds. They are sized to carry the full IT load plus cooling systems, with N+1 or 2N configurations providing redundancy.

**Battery Energy Storage Systems (BESS)** are an emerging alternative or complement to traditional generators, particularly for carbon reduction. BESS can respond in milliseconds — faster than UPS batteries — and can be charged from renewable energy.

**Earthing and Bonding** ensures all metallic structures are electrically connected to earth (ground). This protects personnel from electric shock and ensures fault currents flow safely to earth rather than through people. **TN-S earthing** (separate neutral and protective earth conductors) is standard in UK data centres. **Surge Protection Devices (SPDs)** protect sensitive IT equipment from voltage spikes caused by lightning or switching events.

**PUE (Power Usage Effectiveness) = Total Facility Energy ÷ IT Equipment Energy.** A PUE of 1.0 is theoretical perfection; the industry average is ~1.5; best-in-class facilities achieve below 1.2.`,
        example: `**Real-World Example:** Google's data centres report a trailing twelve-month average PUE of 1.10 — meaning only 10% of their energy goes to overhead (cooling, lighting, power conversion losses). This is achieved through advanced cooling design, high-efficiency UPS systems, and software that dynamically manages server power states. At their scale, each 0.01 improvement in PUE saves millions of pounds annually.`,
        keyPoints: ["Generators: 10–15 sec start time, sized to full load", "BESS: millisecond response, carbon reduction", "TN-S earthing: separate N and PE conductors", "SPDs protect from lightning and switching surges", "PUE = Total Facility ÷ IT Energy (target < 1.5)"],
      },
    ],
  },
  {
    id: "cooling",
    icon: "❄️",
    title: "Data Centre Cooling Infrastructure",
    color: "#0EA5E9",
    topics: [
      {
        title: "Cooling Architectures & Economisers",
        content: `**Air-Side Economiser** — When outdoor air temperature and humidity are suitable, outside air is drawn directly into the data centre to cool IT equipment, bypassing refrigeration compressors entirely. In the UK, this is viable for several thousand hours per year given the temperate climate.

**Water-Side Economiser (Free Cooling)** — A cooling tower or dry cooler pre-cools chilled water to the required supply temperature without running refrigeration compressors. As outside temperature drops, more cooling can be provided "for free." 

**Indirect Evaporative Cooling** — Outside air passes heat through an exchanger cooled by evaporative effect — the cooling benefit is captured without mixing outside air with the data centre environment. Popular in Google's and Microsoft's recent facilities.

**Chilled Water Plant** — For large facilities, chillers (using centrifugal or screw compressors) produce chilled water typically at 7–12°C supply, 12–18°C return. The chilled water circuit runs to CRAH units or in-row coolers. N+1 or 2N chiller redundancy is standard for critical facilities.`,
        example: `**Real-World Example:** A data centre in Edinburgh runs air-side economisation for approximately 4,200 hours per year — nearly half the year — because Scotland's climate rarely exceeds the upper acceptable temperature limit of ~27°C. During these hours, the refrigeration compressors are off completely. This saves approximately 40% of annual cooling energy compared to a facility in a warmer climate that cannot economise as frequently.`,
        keyPoints: ["Air-side economiser: direct outside air cooling", "Water-side economiser: cooling tower free-cooling", "UK climate enables 3,000–5,000 hrs/yr free cooling", "Chilled water: 7–12°C supply, 12–18°C return", "Variable speed drives cut pump/fan energy at part load"],
      },
      {
        title: "Liquid Cooling & PUE",
        content: `As AI and GPU workloads push rack densities beyond 50–100kW, traditional air cooling reaches its physical limits. **Direct Liquid Cooling (DLC)** circulates chilled water or dielectric fluid through cold plates mounted directly on CPUs and GPUs. Heat is removed at the source — far more efficiently than air.

**Immersion Cooling** submerges entire servers in tanks of dielectric fluid (a liquid that doesn't conduct electricity). Single-phase immersion uses mineral oil or synthetic fluid that absorbs heat and is pumped to a heat exchanger. Two-phase immersion uses a fluid with a very low boiling point — it boils off the hot components, condenses on a cooling coil above, and drips back down. Extremely energy efficient but operationally complex.

**PUE and Cooling Efficiency** are directly linked. Raising the chilled water supply temperature from 7°C to 18°C improves chiller COP (Coefficient of Performance) by approximately 3–5% per degree — a 5°C rise delivers roughly 15% chiller energy saving. Raising the cold aisle target temperature from 18°C to 24°C extends economiser hours significantly in temperate climates.`,
        example: `**Real-World Example:** Microsoft's underwater Project Natick data centre submerged servers in a sealed tube on the seabed off the Orkney Islands. The cold seawater provided natural cooling with no mechanical refrigeration. The trial reported a server failure rate 8x lower than land-based data centres — attributed to the inert nitrogen atmosphere and absence of humidity and corrosion. While not commercially deployed at scale, it demonstrated the potential of extreme liquid cooling approaches.`,
        keyPoints: ["DLC: cold plates on CPUs/GPUs, removes heat at source", "Single-phase immersion: mineral/synthetic oil tanks", "Two-phase immersion: boiling dielectric, highest efficiency", "Raising chilled water temp 1°C ≈ 3–5% chiller energy saving", "ASHRAE A2 class: allows server inlet up to 35°C"],
      },
    ],
  },
];

// ─── QUIZ QUESTIONS ────────────────────────────────────────────────────────────

const QUIZ_QUESTIONS = {
  fundamentals: [
    { q: "What does Tier IV classification guarantee above Tier III?", options: ["Higher cooling efficiency", "Fault tolerance — single failures don't cause downtime", "Cheaper construction", "Faster network speeds"], answer: 1, explanation: "Tier IV is fault tolerant, meaning any single component failure will not cause downtime. Tier III is concurrently maintainable but not fault tolerant." },
    { q: "What does 2N redundancy mean?", options: ["Two components working together", "Every critical component is fully doubled", "Two generators for N servers", "Double the cooling capacity only"], answer: 1, explanation: "2N means every critical component is completely duplicated — if one entire system fails, the second takes the full load." },
    { q: "Approximately how many hours of downtime per year does Tier III allow?", options: ["28 hours", "22 hours", "1.6 hours", "26 minutes"], answer: 2, explanation: "Tier III guarantees 99.982% availability, equating to approximately 1.6 hours of downtime per year." },
    { q: "What is the primary purpose of a data centre?", options: ["To generate electricity for IT equipment", "To house, process, and store data and IT infrastructure", "To provide office space for IT staff", "To manufacture computer hardware"], answer: 1, explanation: "A data centre is a dedicated facility for housing IT computing equipment, network infrastructure, and storage systems." },
    { q: "Which organisation created the Tier Classification system?", options: ["ISO", "TIA", "Uptime Institute", "IEEE"], answer: 2, explanation: "The Tier I–IV classification system was created and is certified by the Uptime Institute." },
  ],
  compliance: [
    { q: "Which standard specifically covers data centre facilities and infrastructure in Europe?", options: ["BS 7671", "BS EN 50600", "ISO 27001", "TIA-942"], answer: 1, explanation: "BS EN 50600 is the European standard specifically for data centre facilities and infrastructure, covering power, cooling, security, and management." },
    { q: "What does ISO/IEC 27001 certify?", options: ["Physical building construction", "Information Security Management System", "Cooling system efficiency", "Network cabling standards"], answer: 1, explanation: "ISO/IEC 27001 certifies that an organisation has an effective Information Security Management System (ISMS) protecting data confidentiality, integrity, and availability." },
    { q: "TIA-942 is primarily used for which aspect of data centres?", options: ["Fire safety procedures", "Telecommunications infrastructure standards", "Renewable energy compliance", "Staff training requirements"], answer: 1, explanation: "TIA-942 is the Telecommunications Infrastructure Standard for Data Centres, covering structured cabling, physical layout, redundancy tiers, and equipment zones." },
    { q: "Which compliance standard is specifically required for environments handling payment card data?", options: ["ISO 14001", "SOC 2 Type II", "PCI-DSS", "BS EN 50600"], answer: 2, explanation: "PCI-DSS (Payment Card Industry Data Security Standard) is required for any environment that stores, processes, or transmits payment card data." },
    { q: "What does BS 7671 govern?", options: ["Data centre cooling systems", "Electrical wiring installations in the UK", "Physical security systems", "Environmental management"], answer: 1, explanation: "BS 7671, known as the IET Wiring Regulations, is the UK standard governing how all electrical installations must be designed, installed, and verified." },
  ],
  infrastructure: [
    { q: "In a hot-aisle/cold-aisle arrangement, how are server racks positioned?", options: ["All racks face the same direction", "Racks alternate front-to-front (cold) and back-to-back (hot)", "Racks are arranged in a circle", "Racks face the cooling units only"], answer: 1, explanation: "In a hot-aisle/cold-aisle layout, racks alternate: front-to-front forming cold aisles (intake air) and back-to-back forming hot aisles (exhaust air), preventing mixing." },
    { q: "What is the purpose of blanking panels in server racks?", options: ["To label equipment", "To prevent hot exhaust air recirculating to the cold intake", "To provide cable management", "To mount additional switches"], answer: 1, explanation: "Blanking panels fill empty rack spaces, preventing hot air from the rear of the cabinet from recirculating to the front intake — maintaining airflow efficiency." },
    { q: "What topology is preferred for modern data centre networks?", options: ["Ring topology", "Bus topology", "Leaf-spine topology", "Star topology"], answer: 2, explanation: "Leaf-spine topology is preferred for modern data centres as it provides consistent low latency, high bandwidth, and predictable east-west traffic paths between servers." },
    { q: "What is the difference between white space and grey space?", options: ["White space is cooler; grey space is warmer", "White space houses IT equipment; grey space houses mechanical and electrical plant", "White space is for customers; grey space is for staff", "White space is the server room; grey space is the office"], answer: 1, explanation: "White space is the computer room/data hall containing IT equipment. Grey space houses the supporting M&E infrastructure: UPS rooms, generator halls, cooling plant rooms." },
    { q: "Which fibre type is used for short runs within a data centre?", options: ["Single-mode fibre", "Multimode fibre", "Coaxial cable", "Cat6A copper"], answer: 1, explanation: "Multimode fibre is used for shorter runs within the data centre (up to ~300m at high speed). Single-mode fibre is used for longer distances between facilities." },
  ],
  working: [
    { q: "What does RAMS stand for?", options: ["Risk Assessment and Method Statements", "Rack and Management Systems", "Redundancy and Maintenance Schedule", "Regulated Access Management System"], answer: 0, explanation: "RAMS stands for Risk Assessment and Method Statements — documents that must be completed and approved before non-routine work begins in a data centre." },
    { q: "What is the purpose of a Permit to Work (PTW)?", options: ["To record asset locations", "To formally manage high-risk tasks ensuring correct safety controls are applied", "To authorise visitor access", "To schedule maintenance windows"], answer: 1, explanation: "A Permit to Work is a formal safety management system ensuring high-risk tasks (electrical isolation, hot work, confined space) are authorised and controlled with the correct safety measures." },
    { q: "What does LOTO stand for and what is its purpose?", options: ["Log Out / Tag Out — recording faults", "Lockout / Tagout — physically isolating energy sources to prevent accidental re-energisation", "Limit Output / Test Output — power testing procedure", "Label Out / Track Out — asset management"], answer: 1, explanation: "LOTO (Lockout/Tagout) involves physically locking a circuit breaker open and attaching a personal tag — preventing anyone else from re-energising a circuit while work is in progress." },
    { q: "What does VESDA stand for?", options: ["Ventilation and Emergency Suppression Detection Apparatus", "Very Early Smoke Detection Apparatus", "Verified Electrical Safety Data Application", "Verified Emergency Shutdown Detection Alarm"], answer: 1, explanation: "VESDA (Very Early Smoke Detection Apparatus) samples air continuously through a network of pipes, detecting smoke particles before visible smoke forms — providing the earliest possible fire warning." },
    { q: "In data centre change management, what is a CAB?", options: ["Cabinet Access Board", "Change Advisory Board", "Cooling Asset Bureau", "Compliance Audit Body"], answer: 1, explanation: "The Change Advisory Board (CAB) is a group that reviews and approves significant changes to data centre infrastructure, assessing risk and ensuring rollback plans are in place." },
  ],
  maintenance: [
    { q: "What type of maintenance is performed regardless of equipment condition, at fixed intervals?", options: ["Predictive maintenance", "Condition-based maintenance", "Preventative maintenance", "Reliability centred maintenance"], answer: 2, explanation: "Preventative Maintenance (PPM) is scheduled at fixed intervals regardless of equipment condition — e.g., annual UPS battery tests, quarterly CRAC filter changes." },
    { q: "Which maintenance technique uses thermal imaging to detect electrical faults?", options: ["Preventative maintenance", "Predictive maintenance via infrared thermography", "Condition-based maintenance", "Both B and C are correct"], answer: 3, explanation: "Infrared thermography is used in both predictive maintenance (regularly scheduled thermal surveys) and condition-based maintenance (triggered by temperature threshold breaches)." },
    { q: "What does RCM stand for in maintenance?", options: ["Remote Cooling Management", "Reliability Centred Maintenance", "Regulated Compliance Monitoring", "Rack Capacity Management"], answer: 1, explanation: "RCM (Reliability Centred Maintenance) is a structured methodology that analyses asset functions, failure modes, and failure consequences to determine the optimal maintenance strategy." },
    { q: "Why must generators be tested under load rather than just started?", options: ["No-load tests are illegal", "A generator that starts may still fail to maintain voltage under full electrical load", "Load testing saves fuel", "It is only required for Tier IV facilities"], answer: 1, explanation: "A generator may start and run smoothly at no load, but fail to maintain output voltage or frequency when the full data centre load is applied. Load bank testing verifies it can handle real demand." },
    { q: "What is the primary regulatory concern with cooling tower maintenance?", options: ["Refrigerant gas emissions", "Legionella bacteria proliferation in water systems (HSE L8)", "Noise pollution compliance", "Water consumption limits"], answer: 1, explanation: "Cooling towers are a known risk environment for Legionella bacteria. The HSE Approved Code of Practice L8 requires risk assessments, a Responsible Person, regular water sampling, and biocide treatment." },
  ],
  power: [
    { q: "In the UK, which legislation is the primary legal requirement for electrical safety at work?", options: ["Health & Safety at Work Act 1974", "Electricity at Work Regulations 1989", "BS 7671 Wiring Regulations", "Control of Substances Hazardous to Health (COSHH)"], answer: 1, explanation: "The Electricity at Work Regulations 1989 is the primary UK legislation placing legal duties on employers and employees to prevent danger from electrical systems." },
    { q: "What is PUE and what does a lower value indicate?", options: ["Power Usage Efficiency — lower is worse", "Power Usage Effectiveness — lower means more efficient (less overhead energy wasted)", "Peak Usage Estimation — lower means less peak demand", "Power Unit Equivalence — lower means fewer generators needed"], answer: 1, explanation: "PUE = Total Facility Energy ÷ IT Equipment Energy. A PUE of 1.0 is perfect (100% efficiency). The lower the PUE, the more efficient the facility — less energy is wasted on cooling, UPS losses, and lighting." },
    { q: "How long does a typical diesel generator take to start and reach full output?", options: ["1–2 seconds", "10–15 seconds", "30–60 seconds", "2–3 minutes"], answer: 1, explanation: "A typical 1500rpm diesel generator takes 10–15 seconds to start, synchronise, and accept load. The UPS battery system bridges this gap, providing seamless power continuity." },
    { q: "What is the purpose of a Static Transfer Switch (STS)?", options: ["To switch between summer and winter cooling modes", "To automatically switch a load between two independent power sources in less than 4ms", "To test generator output under static load", "To regulate voltage from the utility supply"], answer: 1, explanation: "An STS (Static Transfer Switch) monitors both power sources continuously and transfers the connected load from one to the other in under 4ms — faster than any IT equipment can detect." },
    { q: "What does TN-S earthing mean?", options: ["Two Neutral, Single earth system", "Separate Neutral and Protective Earth conductors throughout the installation", "Total Network, Separate zones", "Transformer Neutral to Supply"], answer: 1, explanation: "TN-S earthing means the Neutral (N) and Protective Earth (PE) conductors are separate throughout the entire installation — the standard approach for UK data centres, providing clean separation between return current and earth fault protection." },
  ],
  cooling: [
    { q: "What is the formula for PUE?", options: ["IT Energy ÷ Total Facility Energy", "Total Facility Energy ÷ IT Equipment Energy", "Cooling Energy ÷ IT Energy", "Total Power × Cooling Efficiency"], answer: 1, explanation: "PUE = Total Facility Energy ÷ IT Equipment Energy. A perfectly efficient data centre would score 1.0, meaning all energy goes to IT with zero overhead. Real facilities range from ~1.1 (excellent) to 2.0+ (poor)." },
    { q: "What is an air-side economiser?", options: ["A system that recirculates exhaust air back to the cooling units", "A system that uses outdoor air directly for cooling when temperature and humidity permit", "A system that reduces cooling by limiting server power", "A system that switches between multiple cooling towers"], answer: 1, explanation: "An air-side economiser draws outdoor air directly into the data centre when it is cool and dry enough, bypassing refrigeration compressors entirely — providing 'free cooling' from the environment." },
    { q: "Why does raising chilled water supply temperature improve efficiency?", options: ["Warmer water flows faster in pipes", "Higher supply temperature reduces the temperature differential the chiller must maintain, improving COP", "Warmer water prevents Legionella growth", "It allows smaller pipe diameters to be used"], answer: 1, explanation: "Raising chilled water temperature reduces the lift (temperature difference) the chiller compressor must work against. Every 1°C increase in supply temperature improves chiller COP by approximately 3–5%." },
    { q: "Which cooling method is most suitable for GPU racks exceeding 50kW?", options: ["Perimeter CRAC units", "Cold-aisle containment only", "Direct liquid cooling (cold plates on CPUs/GPUs)", "Increased air volume from ceiling units"], answer: 2, explanation: "At densities above ~25–30kW per rack, air cooling alone cannot remove heat efficiently. Direct liquid cooling (DLC) with cold plates attached to CPUs and GPUs removes heat directly at the source." },
    { q: "What Legionella guidance must cooling tower operators follow in the UK?", options: ["ISO 14001 environmental standard", "HSE Approved Code of Practice L8", "BS EN 50600-2-3", "CIBSE Guide M"], answer: 1, explanation: "HSE Approved Code of Practice L8 (Legionnaires Disease: Control of Legionella Bacteria in Water Systems) requires risk assessment, a Responsible Person, regular water sampling, and biocide dosing for cooling towers." },
  ],
};

// ─── MOCK TEST QUESTIONS (30 questions, cross-topic) ──────────────────────────

const MOCK_TEST_QUESTIONS = [
  { q: "What Tier guarantees fault tolerance where a single failure will not cause downtime?", options: ["Tier I", "Tier II", "Tier III", "Tier IV"], answer: 3, section: "Fundamentals" },
  { q: "Which standard governs UK electrical wiring installations?", options: ["BS EN 50600", "BS 7671", "ISO 27001", "TIA-942"], answer: 1, section: "Compliance" },
  { q: "What is the standard topology for modern data centre networks?", options: ["Ring", "Bus", "Leaf-spine", "Mesh"], answer: 2, section: "Infrastructure" },
  { q: "VESDA provides what type of protection?", options: ["Power surge protection", "Very early smoke detection", "Voltage regulation", "Visual equipment damage assessment"], answer: 1, section: "Working in DC" },
  { q: "Preventative maintenance is performed at:", options: ["Fixed intervals regardless of condition", "Only when faults are detected", "Based on sensor threshold breaches", "Only during equipment failure"], answer: 0, section: "Maintenance" },
  { q: "PUE stands for:", options: ["Peak Usage Estimation", "Power Unit Equivalence", "Power Usage Effectiveness", "Primary Utility Efficiency"], answer: 2, section: "Power" },
  { q: "An air-side economiser works by:", options: ["Recirculating server exhaust air", "Using outdoor air directly for cooling when conditions permit", "Reducing server power to lower heat output", "Increasing chilled water flow rate"], answer: 1, section: "Cooling" },
  { q: "What does 2N power redundancy mean?", options: ["Two paths to the network", "Every critical power component is fully doubled", "Two generators per data hall", "Dual utility feeds only"], answer: 1, section: "Fundamentals" },
  { q: "ISO/IEC 27001 certifies:", options: ["Building construction quality", "Information Security Management Systems", "Cooling system efficiency", "Network cabling standards"], answer: 1, section: "Compliance" },
  { q: "In hot-aisle/cold-aisle layout, racks are arranged:", options: ["All facing the same direction", "Back-to-back (hot) and front-to-front (cold)", "In circles around the cooling units", "Randomly for flexibility"], answer: 1, section: "Infrastructure" },
  { q: "LOTO stands for:", options: ["Log Out Tag Out", "Lockout Tagout — physical isolation of energy sources", "Limit Output Test Output", "Label Out Track Out"], answer: 1, section: "Working in DC" },
  { q: "Infrared thermography is most commonly used to:", options: ["Map server locations", "Detect electrical hot spots indicating loose connections or overloaded circuits", "Measure server room temperature uniformly", "Check cooling coil cleanliness"], answer: 1, section: "Maintenance" },
  { q: "A diesel generator typically takes how long to reach full output?", options: ["1–2 seconds", "10–15 seconds", "60–90 seconds", "3–5 minutes"], answer: 1, section: "Power" },
  { q: "Raising chilled water supply temperature improves efficiency because:", options: ["Water flows faster when warmer", "It reduces the temperature lift the chiller compressor must work against", "Warmer water requires less pumping energy", "It extends pipe lifespans"], answer: 1, section: "Cooling" },
  { q: "What does the Uptime Institute Tier certification confirm?", options: ["That the data centre uses renewable energy", "That the facility genuinely meets its claimed Tier in design, construction, and operations", "That all staff are trained to ISO standards", "That the building is fire-proof"], answer: 1, section: "Compliance" },
  { q: "Which fire suppression system is typically used in data centres to protect IT equipment?", options: ["Water sprinklers", "Foam suppression", "Gaseous suppression (FM-200/Novec/inert gas)", "Dry powder systems"], answer: 2, section: "Working in DC" },
  { q: "What is white space in a data centre?", options: ["Any unpainted wall space", "The computer room/data hall housing IT equipment", "The space between raised floor tiles", "Areas with high ambient light"], answer: 1, section: "Infrastructure" },
  { q: "RCM in maintenance stands for:", options: ["Remote Cooling Management", "Reliability Centred Maintenance", "Regulated Compliance Monitoring", "Rack Capacity Management"], answer: 1, section: "Maintenance" },
  { q: "An STS (Static Transfer Switch) switches a load between power sources in:", options: ["Less than 4 milliseconds", "Less than 1 second", "2–5 seconds", "10–15 seconds"], answer: 0, section: "Power" },
  { q: "Direct Liquid Cooling (DLC) is primarily used for:", options: ["Standard 1U servers below 5kW", "Low-density storage arrays", "High-density GPU/AI workloads exceeding 30–50kW per rack", "Cooling the UPS room"], answer: 2, section: "Cooling" },
  { q: "A Permit to Work (PTW) is required for:", options: ["All routine tasks", "High-risk tasks only — electrical isolation, hot work, confined space entry", "Monthly maintenance visits", "Any task lasting more than 1 hour"], answer: 1, section: "Working in DC" },
  { q: "TN-S earthing means:", options: ["Two Neutral, Single earth system", "Separate Neutral and Protective Earth conductors throughout the installation", "Total Network, Separate zones", "Transformer Neutral to Supply"], answer: 1, section: "Power" },
  { q: "The HSE Approved Code of Practice L8 addresses:", options: ["Electrical safety regulations", "Legionella bacteria control in water systems including cooling towers", "Fire suppression system standards", "Manual handling in data centres"], answer: 1, section: "Cooling" },
  { q: "In data centre cabling, multimode fibre is primarily used for:", options: ["Long-distance inter-site connections", "Short runs within the data centre", "Connections to the power distribution units", "WAN connectivity"], answer: 1, section: "Infrastructure" },
  { q: "What does DCIM stand for?", options: ["Data Centre Infrastructure Management", "Digital Computing Infrastructure Monitor", "Data Centre Installation Module", "Distributed Cooling Interface Module"], answer: 0, section: "Working in DC" },
  { q: "Generator load bank testing is performed to:", options: ["Test the cooling capacity under heat", "Verify the generator can maintain output under full electrical load", "Calibrate the fuel gauge", "Test the automatic transfer switch timing only"], answer: 1, section: "Maintenance" },
  { q: "Which organisation publishes the Tier I–IV data centre classification system?", options: ["ISO", "TIA", "ASHRAE", "Uptime Institute"], answer: 3, section: "Fundamentals" },
  { q: "PCI-DSS compliance is required for environments that:", options: ["Host government data", "Store, process, or transmit payment card data", "Use cloud computing", "Operate at Tier III or above"], answer: 1, section: "Compliance" },
  { q: "What does MACs stand for in data centre operations?", options: ["Monitoring and Control Systems", "Moves, Adds and Changes", "Managed Access Controls", "Mechanical and Cooling Systems"], answer: 1, section: "Working in DC" },
  { q: "Condition-based maintenance is triggered by:", options: ["Fixed calendar dates", "Real-time condition indicators crossing a predefined threshold", "Equipment age milestones", "Annual audits"], answer: 1, section: "Maintenance" },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function DataCentreApp() {
  const [view, setView] = useState("home"); // home | learn | quiz | mock
  const [activeSection, setActiveSection] = useState(null);
  const [activeTopic, setActiveTopic] = useState(0);
  const [quizSection, setQuizSection] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [mockAnswers, setMockAnswers] = useState({});
  const [mockSubmitted, setMockSubmitted] = useState(false);
  const [progress, setProgress] = useState({});
  const [showExplanation, setShowExplanation] = useState({});

  const sectionProgress = (sectionId) => {
    const qs = QUIZ_QUESTIONS[sectionId] || [];
    const done = Object.keys(progress).filter(k => k.startsWith(sectionId)).length;
    return qs.length > 0 ? Math.round((done / qs.length) * 100) : 0;
  };

  // ── HOME ──
  if (view === "home") {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", fontFamily: "'Georgia', serif", color: "#e8f4f8" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Sans+3:wght@300;400;600&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #0a0f1e; }
          .card-hover { transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
          .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,180,216,0.25); }
          .btn { cursor: pointer; border: none; outline: none; transition: all 0.2s; }
          .btn:hover { opacity: 0.85; }
          ::-webkit-scrollbar { width: 6px; } 
          ::-webkit-scrollbar-track { background: #0a0f1e; }
          ::-webkit-scrollbar-thumb { background: #00B4D8; border-radius: 3px; }
        `}</style>

        {/* Hero */}
        <div style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 50%, #071520 100%)", padding: "60px 40px 50px", borderBottom: "1px solid rgba(0,180,216,0.2)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ width: 4, height: 60, background: "#00B4D8", borderRadius: 2 }} />
              <div>
                <div style={{ fontSize: 11, letterSpacing: 4, color: "#00B4D8", fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>Professional Training Programme</div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.1, color: "#ffffff" }}>
                  Data Centre<br />
                  <span style={{ color: "#00B4D8" }}>Fundamentals</span>
                </h1>
              </div>
            </div>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, color: "#94a3b8", maxWidth: 580, lineHeight: 1.7, marginLeft: 20 }}>
              Master data centre concepts across 7 modules with detailed explanations, real-world examples, interactive quizzes, and a full mock examination.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 32, marginLeft: 20, flexWrap: "wrap" }}>
              <button className="btn" onClick={() => setView("learn")} style={{ padding: "14px 32px", background: "#00B4D8", color: "#0a0f1e", borderRadius: 8, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: 0.5 }}>
                📚 Start Learning
              </button>
              <button className="btn" onClick={() => { setView("quiz"); setQuizSection(null); }} style={{ padding: "14px 32px", background: "rgba(0,180,216,0.1)", color: "#00B4D8", border: "1px solid rgba(0,180,216,0.4)", borderRadius: 8, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 600 }}>
                🧠 Topic Quizzes
              </button>
              <button className="btn" onClick={() => { setMockAnswers({}); setMockSubmitted(false); setView("mock"); }} style={{ padding: "14px 32px", background: "rgba(240,165,0,0.1)", color: "#F0A500", border: "1px solid rgba(240,165,0,0.4)", borderRadius: 8, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 600 }}>
                📝 Mock Test (30 Qs)
              </button>
            </div>
          </div>
        </div>

        {/* Section Grid */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "50px 40px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, marginBottom: 8, color: "#fff" }}>Course Modules</h2>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#64748b", marginBottom: 36, fontSize: 15 }}>7 modules · 23 topics · 35 quiz questions per section · 30-question mock test</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 20 }}>
            {SECTIONS.map((s) => (
              <div key={s.id} className="card-hover" onClick={() => { setActiveSection(s.id); setActiveTopic(0); setView("learn"); }}
                style={{ background: "linear-gradient(135deg, #0d1b2a, #111827)", border: `1px solid ${s.color}30`, borderRadius: 12, padding: 24, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.color }} />
                <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#fff", marginBottom: 8, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#64748b", marginBottom: 16 }}>{s.topics.length} topics · {(QUIZ_QUESTIONS[s.id] || []).length} quiz questions</p>
                <div style={{ height: 4, background: "#1e293b", borderRadius: 2 }}>
                  <div style={{ height: "100%", width: `${sectionProgress(s.id)}%`, background: s.color, borderRadius: 2, transition: "width 0.5s" }} />
                </div>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: s.color, marginTop: 6 }}>{sectionProgress(s.id)}% quiz complete</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── LEARN ──
  if (view === "learn") {
    const section = activeSection ? SECTIONS.find(s => s.id === activeSection) : SECTIONS[0];
    const topic = section.topics[activeTopic];

    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", fontFamily: "'Georgia', serif", color: "#e8f4f8", display: "flex", flexDirection: "column" }}>
        <style>{`
          * { box-sizing: border-box; }
          .nav-btn { cursor: pointer; border: none; outline: none; transition: all 0.2s; background: none; }
          .nav-btn:hover { opacity: 0.8; }
          .topic-btn { cursor: pointer; transition: all 0.15s; border: none; outline: none; }
          .topic-btn:hover { background: rgba(0,180,216,0.1) !important; }
          .section-tab { cursor: pointer; transition: all 0.15s; white-space: nowrap; }
          .section-tab:hover { opacity: 0.8; }
        `}</style>

        {/* Top Nav */}
        <div style={{ background: "#08111C", borderBottom: "1px solid rgba(0,180,216,0.15)", padding: "12px 24px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <button className="nav-btn" onClick={() => setView("home")} style={{ color: "#94a3b8", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
            ← Home
          </button>
          <div style={{ width: 1, height: 20, background: "#1e293b" }} />
          <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
            {SECTIONS.map(s => (
              <button key={s.id} className="section-tab" onClick={() => { setActiveSection(s.id); setActiveTopic(0); }}
                style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600,
                  background: activeSection === s.id ? s.color : "transparent",
                  color: activeSection === s.id ? "#0a0f1e" : "#64748b",
                  border: `1px solid ${activeSection === s.id ? s.color : "#1e293b"}` }}>
                {s.icon} {s.title.split(" ")[0]}
              </button>
            ))}
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button className="nav-btn" onClick={() => { setQuizSection(section.id); setQuizAnswers({}); setQuizSubmitted(false); setView("quiz"); }}
              style={{ padding: "7px 16px", background: `${section.color}20`, color: section.color, border: `1px solid ${section.color}40`, borderRadius: 6, fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600 }}>
              Quiz this section →
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flex: 1 }}>
          {/* Sidebar */}
          <div style={{ width: 240, minWidth: 240, background: "#08111C", borderRight: "1px solid rgba(0,180,216,0.1)", padding: "20px 0" }}>
            <div style={{ padding: "0 16px 16px", borderBottom: "1px solid #1e293b" }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{section.icon}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: "#fff", lineHeight: 1.3 }}>{section.title}</div>
            </div>
            {section.topics.map((t, i) => (
              <button key={i} className="topic-btn" onClick={() => setActiveTopic(i)}
                style={{ width: "100%", textAlign: "left", padding: "12px 16px", display: "flex", alignItems: "flex-start", gap: 10,
                  background: activeTopic === i ? `${section.color}15` : "transparent",
                  borderLeft: activeTopic === i ? `3px solid ${section.color}` : "3px solid transparent" }}>
                <span style={{ color: activeTopic === i ? section.color : "#475569", fontSize: 13, marginTop: 1 }}>{i + 1}.</span>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: activeTopic === i ? "#e8f4f8" : "#94a3b8", lineHeight: 1.4 }}>{t.title}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "40px" }}>
            <div style={{ maxWidth: 780 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                <div style={{ width: 4, height: 40, background: section.color, borderRadius: 2 }} />
                <div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: section.color, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>{section.title}</div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#fff", lineHeight: 1.2 }}>{topic.title}</h2>
                </div>
              </div>

              {/* Main content */}
              <div style={{ background: "#0d1b2a", borderRadius: 12, padding: 28, marginBottom: 20, border: "1px solid rgba(0,180,216,0.1)", lineHeight: 1.8, fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: "#cbd5e1" }}>
                {topic.content.split("\n\n").map((para, i) => (
                  <p key={i} style={{ marginBottom: i < topic.content.split("\n\n").length - 1 ? 18 : 0 }}
                    dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, `<strong style="color:#e8f4f8">$1</strong>`) }} />
                ))}
              </div>

              {/* Example box */}
              <div style={{ background: `linear-gradient(135deg, ${section.color}12, ${section.color}06)`, border: `1px solid ${section.color}30`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: section.color, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Real-World Example</div>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: "#cbd5e1", lineHeight: 1.8 }}
                  dangerouslySetInnerHTML={{ __html: topic.example.replace(/\*\*(.*?)\*\*/g, `<strong style="color:${section.color}">$1</strong>`) }} />
              </div>

              {/* Key points */}
              <div style={{ background: "#08111C", borderRadius: 12, padding: 24, border: "1px solid #1e293b" }}>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "#94a3b8", letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Key Points to Remember</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {topic.keyPoints.map((kp, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: section.color, marginTop: 7, flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#94a3b8", lineHeight: 1.5 }}
                        dangerouslySetInnerHTML={{ __html: kp.replace(/\*\*(.*?)\*\*/g, `<strong style="color:#e8f4f8">$1</strong>`) }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36, paddingTop: 24, borderTop: "1px solid #1e293b" }}>
                <button onClick={() => {
                  if (activeTopic > 0) setActiveTopic(activeTopic - 1);
                  else {
                    const idx = SECTIONS.findIndex(s => s.id === section.id);
                    if (idx > 0) { setActiveSection(SECTIONS[idx-1].id); setActiveTopic(SECTIONS[idx-1].topics.length - 1); }
                  }
                }} style={{ padding: "10px 20px", background: "#1e293b", color: "#94a3b8", borderRadius: 8, cursor: "pointer", border: "none", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14 }}>
                  ← Previous
                </button>
                <button onClick={() => {
                  if (activeTopic < section.topics.length - 1) setActiveTopic(activeTopic + 1);
                  else {
                    const idx = SECTIONS.findIndex(s => s.id === section.id);
                    if (idx < SECTIONS.length - 1) { setActiveSection(SECTIONS[idx+1].id); setActiveTopic(0); }
                    else { setQuizSection(section.id); setQuizAnswers({}); setQuizSubmitted(false); setView("quiz"); }
                  }
                }} style={{ padding: "10px 20px", background: section.color, color: "#0a0f1e", borderRadius: 8, cursor: "pointer", border: "none", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 700 }}>
                  {activeTopic < section.topics.length - 1 ? "Next Topic →" : "Take Quiz →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ SELECTOR ──
  if (view === "quiz" && !quizSection) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", fontFamily: "'Georgia', serif", color: "#e8f4f8", padding: 40 }}>
        <style>{`* { box-sizing: border-box; } .card-hover { transition: transform 0.2s; cursor: pointer; } .card-hover:hover { transform: translateY(-3px); }`}</style>
        <button onClick={() => setView("home")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, marginBottom: 32 }}>← Home</button>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, marginBottom: 8, color: "#fff" }}>Topic Quizzes</h1>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#64748b", marginBottom: 40, fontSize: 15 }}>Select a section to test your knowledge — 5 questions per module</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {SECTIONS.map(s => (
              <div key={s.id} className="card-hover" onClick={() => { setQuizSection(s.id); setQuizAnswers({}); setQuizSubmitted(false); setShowExplanation({}); }}
                style={{ background: "#0d1b2a", border: `1px solid ${s.color}30`, borderRadius: 12, padding: 24, cursor: "pointer" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#fff", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#64748b", marginBottom: 16 }}>{(QUIZ_QUESTIONS[s.id] || []).length} questions</p>
                <div style={{ display: "inline-block", padding: "6px 14px", background: `${s.color}20`, color: s.color, borderRadius: 20, fontSize: 13, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>Start Quiz →</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, textAlign: "center" }}>
            <button onClick={() => { setMockAnswers({}); setMockSubmitted(false); setView("mock"); }}
              style={{ padding: "14px 40px", background: "#F0A500", color: "#0a0f1e", borderRadius: 8, cursor: "pointer", border: "none", fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, fontWeight: 700 }}>
              📝 Take Full Mock Test (30 Questions) →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ ──
  if (view === "quiz" && quizSection) {
    const section = SECTIONS.find(s => s.id === quizSection);
    const questions = QUIZ_QUESTIONS[quizSection] || [];
    const totalAnswered = Object.keys(quizAnswers).length;
    const score = quizSubmitted ? questions.filter((q, i) => quizAnswers[i] === q.answer).length : 0;

    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", fontFamily: "'Georgia', serif", color: "#e8f4f8", padding: "40px 24px" }}>
        <style>{`* { box-sizing: border-box; } .opt-btn { cursor: pointer; transition: all 0.15s; border: none; outline: none; width: 100%; text-align: left; }`}</style>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
            <button onClick={() => { setQuizSection(null); }} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14 }}>← Quizzes</button>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: section.color, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}>{section.icon} {section.title}</div>
          </div>

          {quizSubmitted && (
            <div style={{ background: score >= 4 ? "rgba(34,197,94,0.1)" : score >= 3 ? "rgba(240,165,0,0.1)" : "rgba(239,68,68,0.1)",
              border: `1px solid ${score >= 4 ? "#22C55E" : score >= 3 ? "#F0A500" : "#EF4444"}40`,
              borderRadius: 12, padding: 24, marginBottom: 36, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>{score >= 4 ? "🎉" : score >= 3 ? "👍" : "📖"}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#fff", marginBottom: 8 }}>{score} / {questions.length}</div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: "#94a3b8" }}>
                {score >= 4 ? "Excellent! You've mastered this section." : score >= 3 ? "Good effort — review the explanations below." : "Keep studying — review the topics and try again."}
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
                <button onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); setShowExplanation({}); }}
                  style={{ padding: "10px 24px", background: section.color, color: "#0a0f1e", borderRadius: 8, cursor: "pointer", border: "none", fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, fontSize: 14 }}>
                  Retry Quiz
                </button>
                <button onClick={() => { setActiveSection(quizSection); setActiveTopic(0); setView("learn"); }}
                  style={{ padding: "10px 24px", background: "#1e293b", color: "#94a3b8", borderRadius: 8, cursor: "pointer", border: "none", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14 }}>
                  Review Topics
                </button>
              </div>
            </div>
          )}

          {questions.map((q, qi) => {
            const answered = quizAnswers[qi] !== undefined;
            const isCorrect = quizAnswers[qi] === q.answer;
            return (
              <div key={qi} style={{ background: "#0d1b2a", borderRadius: 12, padding: 24, marginBottom: 20, border: quizSubmitted ? `1px solid ${isCorrect ? "#22C55E40" : "#EF444440"}` : "1px solid #1e293b" }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                  <div style={{ background: `${section.color}20`, color: section.color, width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{qi + 1}</div>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: "#e8f4f8", lineHeight: 1.5 }}>{q.q}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {q.options.map((opt, oi) => {
                    let bg = "#08111C", border = "#1e293b", textColor = "#94a3b8";
                    if (answered && !quizSubmitted) { bg = quizAnswers[qi] === oi ? `${section.color}20` : "#08111C"; border = quizAnswers[qi] === oi ? section.color : "#1e293b"; textColor = quizAnswers[qi] === oi ? "#fff" : "#94a3b8"; }
                    if (quizSubmitted) {
                      if (oi === q.answer) { bg = "rgba(34,197,94,0.15)"; border = "#22C55E"; textColor = "#e8f4f8"; }
                      else if (quizAnswers[qi] === oi) { bg = "rgba(239,68,68,0.15)"; border = "#EF4444"; textColor = "#e8f4f8"; }
                      else { bg = "#08111C"; border = "#1e293b"; textColor = "#64748b"; }
                    }
                    return (
                      <button key={oi} className="opt-btn" disabled={quizSubmitted}
                        onClick={() => { if (!quizSubmitted) { const a = { ...quizAnswers, [qi]: oi }; setQuizAnswers(a); setProgress(p => ({ ...p, [`${quizSection}-${qi}`]: oi === q.answer })); } }}
                        style={{ padding: "12px 16px", background: bg, border: `1px solid ${border}`, borderRadius: 8, color: textColor, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ width: 22, height: 22, borderRadius: "50%", border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>
                          {quizSubmitted ? (oi === q.answer ? "✓" : quizAnswers[qi] === oi ? "✗" : String.fromCharCode(65 + oi)) : String.fromCharCode(65 + oi)}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <div style={{ marginTop: 14, padding: 14, background: "rgba(0,180,216,0.08)", borderRadius: 8, border: "1px solid rgba(0,180,216,0.2)" }}>
                    <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#94a3b8" }}>
                      <strong style={{ color: "#00B4D8" }}>Explanation: </strong>{q.explanation}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {!quizSubmitted && totalAnswered === questions.length && (
            <button onClick={() => setQuizSubmitted(true)}
              style={{ width: "100%", padding: "16px", background: section.color, color: "#0a0f1e", borderRadius: 10, cursor: "pointer", border: "none", fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, fontWeight: 700, marginTop: 8 }}>
              Submit Answers →
            </button>
          )}
          {!quizSubmitted && totalAnswered < questions.length && (
            <p style={{ textAlign: "center", color: "#64748b", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, marginTop: 16 }}>
              Answer all {questions.length} questions to submit ({totalAnswered}/{questions.length} answered)
            </p>
          )}
        </div>
      </div>
    );
  }

  // ── MOCK TEST ──
  if (view === "mock") {
    const totalAnswered = Object.keys(mockAnswers).length;
    const score = mockSubmitted ? MOCK_TEST_QUESTIONS.filter((q, i) => mockAnswers[i] === q.answer).length : 0;
    const pct = mockSubmitted ? Math.round((score / MOCK_TEST_QUESTIONS.length) * 100) : 0;

    const sectionScores = mockSubmitted ? SECTIONS.map(s => {
      const qs = MOCK_TEST_QUESTIONS.filter(q => q.section.toLowerCase().includes(s.id === "fundamentals" ? "fundamental" : s.id === "compliance" ? "compliance" : s.id === "infrastructure" ? "infrastructure" : s.id === "working" ? "working" : s.id === "maintenance" ? "maintenance" : s.id === "power" ? "power" : "cooling"));
      const correct = qs.filter((q, _) => {
        const idx = MOCK_TEST_QUESTIONS.indexOf(q);
        return mockAnswers[idx] === q.answer;
      }).length;
      return { ...s, correct, total: qs.length };
    }) : [];

    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", fontFamily: "'Georgia', serif", color: "#e8f4f8", padding: "40px 24px" }}>
        <style>{`* { box-sizing: border-box; } .opt-btn { cursor: pointer; transition: all 0.15s; border: none; outline: none; width: 100%; text-align: left; }`}</style>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
            <button onClick={() => setView("home")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14 }}>← Home</button>
          </div>
          <div style={{ marginBottom: 36 }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "#fff", marginBottom: 6 }}>📝 Final Mock Examination</h1>
            <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: "#64748b", fontSize: 15 }}>30 questions across all 7 modules · Pass mark: 70% (21/30)</p>
          </div>

          {mockSubmitted && (
            <div style={{ background: pct >= 70 ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${pct >= 70 ? "#22C55E" : "#EF4444"}40`, borderRadius: 16, padding: 32, marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", marginBottom: 24 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 56, fontWeight: 900, color: pct >= 70 ? "#22C55E" : "#EF4444", lineHeight: 1 }}>{score}</div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#64748b" }}>out of {MOCK_TEST_QUESTIONS.length}</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "#fff", marginBottom: 4 }}>{pct}%</div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: pct >= 70 ? "#22C55E" : "#EF4444", fontWeight: 700 }}>{pct >= 70 ? "✓ PASS" : "✗ FAIL"}</div>
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#64748b", marginTop: 4 }}>{pct >= 70 ? "Congratulations! You've passed the mock exam." : "Review the topics and try again."}</div>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#64748b", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Performance by Module</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                  {sectionScores.map(s => (
                    <div key={s.id} style={{ background: "#08111C", borderRadius: 8, padding: "10px 14px", border: `1px solid ${s.color}30` }}>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: s.color, marginBottom: 4 }}>{s.icon} {s.title.replace("Data Centre ", "")}</div>
                      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: "#fff", fontWeight: 700 }}>{s.correct}/{s.total}</div>
                      <div style={{ height: 3, background: "#1e293b", borderRadius: 2, marginTop: 6 }}>
                        <div style={{ height: "100%", width: `${s.total > 0 ? (s.correct / s.total) * 100 : 0}%`, background: s.color, borderRadius: 2 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button onClick={() => { setMockAnswers({}); setMockSubmitted(false); window.scrollTo(0, 0); }}
                  style={{ padding: "10px 24px", background: "#F0A500", color: "#0a0f1e", borderRadius: 8, cursor: "pointer", border: "none", fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, fontSize: 14 }}>
                  Retake Test
                </button>
                <button onClick={() => setView("learn")}
                  style={{ padding: "10px 24px", background: "#1e293b", color: "#94a3b8", borderRadius: 8, cursor: "pointer", border: "none", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14 }}>
                  Review Learning Materials
                </button>
              </div>
            </div>
          )}

          {MOCK_TEST_QUESTIONS.map((q, qi) => {
            const isCorrect = mockAnswers[qi] === q.answer;
            const sectionDef = SECTIONS.find(s => q.section.toLowerCase().includes(s.id === "fundamentals" ? "fundamental" : s.id === "compliance" ? "compliance" : s.id === "infrastructure" ? "infrastructure" : s.id === "working" ? "working" : s.id === "maintenance" ? "maintenance" : s.id === "power" ? "power" : "cooling"));
            const col = sectionDef ? sectionDef.color : "#00B4D8";
            return (
              <div key={qi} style={{ background: "#0d1b2a", borderRadius: 12, padding: 24, marginBottom: 16, border: mockSubmitted ? `1px solid ${isCorrect ? "#22C55E30" : "#EF444430"}` : "1px solid #1e293b" }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: col, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>{q.section}</span>
                  {mockSubmitted && <span style={{ marginLeft: "auto", fontSize: 16 }}>{isCorrect ? "✅" : "❌"}</span>}
                </div>
                <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                  <div style={{ background: `${col}20`, color: col, width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{qi + 1}</div>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: "#e8f4f8", lineHeight: 1.5 }}>{q.q}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {q.options.map((opt, oi) => {
                    let bg = "#08111C", border = "#1e293b", textColor = "#94a3b8";
                    if (!mockSubmitted && mockAnswers[qi] === oi) { bg = `${col}20`; border = col; textColor = "#fff"; }
                    if (mockSubmitted) {
                      if (oi === q.answer) { bg = "rgba(34,197,94,0.12)"; border = "#22C55E"; textColor = "#e8f4f8"; }
                      else if (mockAnswers[qi] === oi) { bg = "rgba(239,68,68,0.12)"; border = "#EF4444"; textColor = "#e8f4f8"; }
                      else { bg = "#08111C"; border = "#1e293b"; textColor = "#475569"; }
                    }
                    return (
                      <button key={oi} className="opt-btn" disabled={mockSubmitted}
                        onClick={() => { if (!mockSubmitted) setMockAnswers(a => ({ ...a, [qi]: oi })); }}
                        style={{ padding: "11px 14px", background: bg, border: `1px solid ${border}`, borderRadius: 8, color: textColor, fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ width: 22, height: 22, borderRadius: "50%", border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>
                          {mockSubmitted ? (oi === q.answer ? "✓" : mockAnswers[qi] === oi ? "✗" : String.fromCharCode(65 + oi)) : String.fromCharCode(65 + oi)}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {!mockSubmitted && (
            <div style={{ position: "sticky", bottom: 0, background: "#0a0f1e", borderTop: "1px solid #1e293b", padding: "16px 0", marginTop: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, color: "#64748b" }}>
                  {totalAnswered} / {MOCK_TEST_QUESTIONS.length} answered
                  <span style={{ marginLeft: 12, display: "inline-block", width: 120, height: 4, background: "#1e293b", borderRadius: 2, verticalAlign: "middle" }}>
                    <span style={{ display: "block", height: "100%", width: `${(totalAnswered / MOCK_TEST_QUESTIONS.length) * 100}%`, background: "#F0A500", borderRadius: 2, transition: "width 0.3s" }} />
                  </span>
                </div>
                <button disabled={totalAnswered < MOCK_TEST_QUESTIONS.length} onClick={() => { setMockSubmitted(true); window.scrollTo(0, 0); }}
                  style={{ padding: "12px 32px", background: totalAnswered === MOCK_TEST_QUESTIONS.length ? "#F0A500" : "#1e293b", color: totalAnswered === MOCK_TEST_QUESTIONS.length ? "#0a0f1e" : "#475569", borderRadius: 8, cursor: totalAnswered === MOCK_TEST_QUESTIONS.length ? "pointer" : "not-allowed", border: "none", fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, fontWeight: 700 }}>
                  Submit Mock Test →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
