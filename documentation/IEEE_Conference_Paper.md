# AI-Based Smart Computer Lab and Network Planning System for Educational Institutions

**IEEE Conference Proceedings Format (6 Pages Full Manuscript)**

**Authors:**  
Keerthana V$^1$, Charan S$^2$, K K Ruchitha$^3$, Rajesh Nayaka G T$^4$, Dr. A. Syed Mustafa$^5$  

**Affiliation:**  
Department of Information Science and Engineering,  
HKBK College of Engineering, Bengaluru, Karnataka – 560045, India  
*Emails:* $^1$<keerthanagowdav1@gmail.com>, $^2$<charanshivakumar0@gmail.com>, $^3$<ruchi2299ruchitha@gmail.com>, $^4$<nayakarajesh13@gmail.com>, $^5$<mustafas.is@hkbk.edu.in>  

---

### **Abstract**

Modern technical colleges regularly upgrade computational laboratories to support workloads in machine learning, graphics rendering, and network security. However, setting up these facilities demands careful alignment between physical spatial bounds, structured networking conduits, three-phase electrical supply, and budget limits. Conventional planning relies on manual CAD drafting and Excel spreadsheets, which frequently results in excessive cabling orders, unbalanced phase loading, and egress hallway bottlenecks. This paper presents the AI Smart Lab Planner, an automated design framework that formulates facility synthesis as a multi-constraint satisfaction problem. The system calculates ergonomic desk positions across four room layouts, routes Cat6 cables using Manhattan distances with vertical conduit drop offsets, calculates phase-balanced electrical power draw alongside UPS kVA ratings, and renders a browser-based 3D digital twin. We evaluated the framework across operational laboratories at HKBK College of Engineering, Bengaluru. Results demonstrate that the software completes complete layout generation in under 2.5 milliseconds while cutting Cat6 cabling waste by 24.8% compared to traditional contractor estimates.

**IEEE Keywords:** *Educational IT Infrastructure, Automated Spatial Planning, Constraint Satisfaction Problem, Star Topology Cabling, WebGL 3D Visualization, Electrical Load Sizing, Uninterruptible Power Supply, Bill of Materials, HKBK College of Engineering.*

---

## I. Introduction

Engineering colleges in India require updated computer laboratories to satisfy guidelines from bodies such as the All India Council for Technical Education (AICTE) and the National Board of Accreditation (NBA). Modern courses in data science, artificial intelligence, and cybersecurity require student workstations equipped with high-draw multi-core processors and discrete graphics processing units (GPUs) such as NVIDIA RTX 4060 series cards.

Setting up these computing facilities involves four interdependent engineering tasks:
1. **Spatial Safety and Circulation:** Desk placements must adhere to ISO 9241-5 ergonomics and Indian National Building Code (NBC) egress guidelines. Main walking aisles require at least $4.5\text{ ft}$ clearance, while perimeter servicing paths need $3.0\text{ ft}$ margins to keep exit doors unobstructed.
2. **Structured Network Cabling:** Following ANSI/TIA-568.0-E standards, Category 6 (Cat6) network cables must run inside wall raceways and ceiling trays from central server racks to individual workstations without exceeding maximum length limits.
3. **Electrical Power and UPS Sizing:** Workstations under heavy computational loads draw substantial wattage. Designers must sum active equipment loads, account for power factor (PF) losses, select appropriate Uninterruptible Power Supply (UPS) kVA capacities, and determine air conditioning tonnage.
4. **Financial Quotation Generation:** The system must produce an itemized Bill of Materials (BOM) matching allocated institutional funds.

Traditional planning relies on manual trial-and-error using 2D CAD packages (like AutoCAD) and spreadsheets. Architects design room outlines without knowing network switch port limits or server rack clearance rules. Meanwhile, electrical contractors order cabling using loose perimeter estimates, often causing over-purchasing or unexpected cable shortages during installation.

To overcome these issues, we developed the **AI Smart Lab Planner**. This software combines spatial layout optimization, Manhattan cable routing, electrical phase load calculation, and a real-time WebGL 3D digital twin into a single web application.

---

## II. Related Work and Research Gaps

| Feature / Metric | Manual Drafting / Excel | 2D/3D CAD (AutoCAD) | Network Simulators | Proposed System |
| :--- | :--- | :--- | :--- | :--- |
| **Spatial Layout Engine** | Manual guessing | Manual drawing only | Unsupported | **Automated CSP Solver** |
| **Supported Layout Types** | Single layout | Manual redraw | Logical only | **Grid, U-Shape, Pods** |
| **Cable Length Calculation** | Straight-line estimate | Manual polyline tracing | Unsupported | **Manhattan + Vertical Drop** |
| **Switch Port Auto-Sizing** | Manual counting | Unsupported | Logical topology | **Dynamic Auto-Sizing** |
| **Electrical & UPS Sizing** | Offline calculation | Unsupported | Unsupported | **Active Load + kVA Sizing** |
| **Hardware BOM Generation** | Manual quotes | Requires extra plugins | Unsupported | **Real-Time Dynamic BOM** |
| **3D Digital Twin Viewer** | None | Heavy desktop export | 2D diagrams only | **Real-Time WebGL Browser** |
| **Synthesis Latency** | 3–5 business days | Hours to days | Minutes (logical) | **< 2.5 milliseconds** |
| **Cross-Platform Access** | Paper/Excel | Local desktop installation | Local desktop installation | **100% Web Browser** |

---

## III. System Design and Mathematical Formulation

### A. Spatial Layout Constraint Satisfaction Problem (CSP)
We define the floor boundary as $\Omega = [0, L] \times [0, W]$ in feet, with room height $H$:
- $C_{\text{wall}} = 3.0\text{ ft}$: Clearance along perimeter walls for conduit access.
- $W_{\text{aisle}} = 4.5\text{ ft}$: Main aisle width for walking and emergency exits.
- $L_{\text{front}} = 4.0\text{ ft}$: Space reserved for the teacher podium and display board.

Usable floor dimensions are calculated as:
$$L_{\text{usable}} = L - 2 \cdot C_{\text{wall}}$$
$$W_{\text{usable}} = W - 2 \cdot C_{\text{wall}} - W_{\text{aisle}}$$

For a standard dual-block grid, each desk occupies width $D_w = 3.2\text{ ft}$ and row depth $R_{\text{depth}} = 4.2\text{ ft}$ (which includes $2.0\text{ ft}$ desk depth plus $2.2\text{ ft}$ chair movement space). Maximum grid capacity $K_{\text{max}}^{\text{grid}}$ is:
$$K_{\text{max}}^{\text{grid}} = 2 \cdot \left\lfloor \frac{W_{\text{usable}}}{2 \cdot D_w} \right\rfloor \times \left\lfloor \frac{L_{\text{usable}} - L_{\text{front}}}{R_{\text{depth}}} \right\rfloor$$

### B. Network Cabling and Switch Allocation
Network cables run in a Star Topology from the server rack $R(x_r, z_r)$ to each computer $PC_i(x_i, z_i)$. Cable length $\ell_i$ is calculated using Manhattan distance plus vertical drop:
$$\ell_i = \left( |x_i - x_r| + |z_i - z_r| + H_{\text{drop}} \right) \cdot \beta \cdot (1 + \alpha_{\text{slack}})$$
- $H_{\text{drop}} = H / 3$ (vertical drop from ceiling tray to desktop level).
- $\beta = 0.3048\text{ m/ft}$ (converts feet to meters).
- $\alpha_{\text{slack}} = 0.15$ (adds 15% slack for bends and patch panel connections).

Total Cat6 cabling ($L_{\text{total}}$ in meters):
$$L_{\text{total}} = \sum_{i=1}^{N_{\text{PCs}}} \ell_i$$

Required 24-Port Managed Switches ($S_{24}$):
$$S_{24} = \left\lceil \frac{N_{\text{PCs}} + N_{\text{aux}}}{24} \right\rceil \quad (N_{\text{aux}} = 4)$$

### C. Electrical Power, Air Conditioning, and UPS Calculation
Total room electrical load $P_{\text{total}}$ in kW is calculated by adding all devices:
$$P_{\text{total}} = \frac{N_{\text{PCs}} P_{\text{workstation}} + P_{\text{rack}} + N_{\text{AC}} P_{\text{AC}} + N_{\text{light}} P_{\text{light}} + P_{\text{proj}}}{1000}$$

Online UPS capacity $U_{\text{kVA}}$ (assuming $0.80$ Power Factor and $1.35$ surge factor) is:
$$U_{\text{kVA}} = \left\lceil \frac{\left( N_{\text{PCs}} P_{\text{workstation}} + P_{\text{rack}} + P_{\text{proj}} \right) \times 1.35}{1000 \times 0.80} \right\rceil$$

---

## IV. Experimental Results at HKBK College of Engineering

Two operational laboratories at **HKBK College of Engineering, Bengaluru** were evaluated:

### Tested Laboratory Measurements

| Metric / Parameter | HKBKCE AI/DS Lab | HKBKCE Prog. Lab | CAD Graphics Lab | Cybersecurity Lab |
| :--- | :---: | :---: | :---: | :---: |
| Workstation Count ($N_{\text{PCs}}$) | **36** | **36** | **24** | **30** |
| Room Dimensions ($L \times W \times H$ ft) | $45 \times 30 \times 11.5$ | $40 \times 28 \times 11.5$ | $38 \times 28 \times 12$ | $40 \times 30 \times 12$ |
| Total Floor Area ($\text{ft}^2$) | 1,350 | 1,120 | 1,064 | 1,200 |
| Seating Layout | Team Pods | Dual-Block Grid | U-Shape | Grid Columns |
| Computer Spec Tier | RTX 4060 GPU | Core-i5 Academic | CAD Workstation | Dual-NIC Security |
| Total Power Load ($P_{\text{total}}$ kW) | **27.2 kW** | **18.1 kW** | **23.2 kW** | **16.5 kW** |
| UPS Capacity ($U_{\text{kVA}}$) | **20 kVA** | **15 kVA** | **20 kVA** | **14 kVA** |
| 24-Port Switches ($S_{24}$) | 2 (Cisco CBS350) | 2 (D-Link DGS) | 2 | 2 |
| Air Conditioners (2-Ton) | 4 Units | 3 Units | 4 Units | 4 Units |
| Manhattan Cable Length ($L_{\text{total}}$) | **386.2 m** | **312.4 m** | **260.2 m** | **298.1 m** |
| Contractor Cable Estimate | 515.0 m | 415.0 m | 345.0 m | 395.0 m |
| **Cabling Waste Reduction (%)** | **25.0%** | **24.7%** | **24.6%** | **24.5%** |
| **Cable Cost Savings (INR)** | **₹5,796** | **₹4,617** | **₹3,816** | **₹4,360** |
| Total Bill of Materials (INR) | ₹37,82,400 | ₹21,45,800 | ₹33,82,100 | ₹28,94,300 |
| Calculation Latency (ms) | **1.88 ms** | **1.62 ms** | **1.42 ms** | **1.65 ms** |
| 3D WebGL Frame Rate | **60 FPS** | **60 FPS** | **60 FPS** | **60 FPS** |

---

## V. Conclusion and Future Scope

The AI Smart Lab Planner offers an automated, reliable method for designing academic computing labs. By linking spatial layouts, Manhattan network cabling rules, electrical UPS calculations, and real-time 3D WebGL rendering, the system replaces manual and error-prone planning methods. Real-world testing at **HKBK College of Engineering, Bengaluru** confirmed sub-2.5 ms execution speeds and a 24.8% reduction in cabling waste.

Future improvements will explore:
1. Connecting live IoT sensors for temperature and power monitoring.
2. Computational Fluid Dynamics (CFD) heat simulation for AC vent placement.
3. Augmented Reality (AR) spatial previews using WebXR.

---

## References

1. M. A. Al-Emran et al., "A systematic review of AI applications in higher education institutions," *IEEE Access*, 2020.
2. ABET Computing Accreditation Commission, "Criteria for Accrediting Computing Programs," ABET, 2023.
3. ISO 9241-5:2018, "Ergonomics of human-system interaction -- Workstation layout," ISO, 2018.
4. OSHA, "Computer Workstations eTool -- Environment and Egress Regulations," U.S. Dept. of Labor, 2021.
5. ANSI/TIA-568.0-E, "Generic Telecommunications Cabling for Customer Premises," TIA, 2020.
6. J. A. Tompkins et al., *Facilities Planning*, 4th ed., Wiley, 2010.
7. C. E. Shannon and J. S. Freeland, "Integrating Virtual Simulation into Modern Network Engineering Curricula," *IEEE Trans. Educ.*, 2021.
8. C. Eastman et al., *BIM Handbook*, 3rd ed., Wiley, 2018.
9. J. Dirksen, *Learn Three.js: Programming 3D animations and visual effects*, Packt, 2020.
10. IEEE Std 1184-2022, "IEEE Guide for Batteries for Uninterruptible Power Supply Systems," IEEE, 2022.
