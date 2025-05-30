import React, { useState, useRef, useEffect } from "react";
import "./App.css";

// Harmonious pastel colors for rows
const rowColors = [
  "#b2b7f9",
  "#a7ecee",
  "#fbc2eb",
  "#b2f7b7",
  "#e0c3fc",
  "#ffe6b2",
  "#ffb2d1",
  "#c2f0fc"
];

// Assign color per level (row)
function getColorForLevel(level) {
  return rowColors[level % rowColors.length];
}

const orgData = {
  id: 1,
  name: "Daisy George",
  designation: "CEO",
  empId: "T0011",
  img: "https://randomuser.me/api/portraits/women/44.jpg",
  children: [
    {
      id: 2,
      name: "Laljika Jaria",
      designation: "Operations Director",
      empId: "T0014",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      children: [
        {
          id: 8,
          name: "Dinesh Balbu",
          designation: "Product Manager",
          empId: "T0016",
          img: "https://randomuser.me/api/portraits/men/12.jpg",
        },
        {
          id: 9,
          name: "Madan Mohan",
          designation: "Customer Service Mgr",
          empId: "T0018",
          img: "https://randomuser.me/api/portraits/men/75.jpg",
        },
        {
          id: 10,
          name: "Balaji S K",
          designation: "HR Manager",
          empId: "T0027",
          img: "https://randomuser.me/api/portraits/men/65.jpg",
        },
      ],
    },
    {
      id: 3,
      name: "P Hara Rao",
      designation: "HR Director",
      empId: "T0022",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      children: [
        {
          id: 11,
          name: "Aarav Gandhi",
          designation: "HR Executive",
          empId: "T0010",
          img: "https://randomuser.me/api/portraits/men/91.jpg",
        },
      ],
    },
    {
      id: 4,
      name: "Appy Samson",
      designation: "CFO",
      empId: "T0041",
      img: "https://randomuser.me/api/portraits/women/55.jpg",
      children: [
        {
          id: 12,
          name: "Jill G",
          designation: "Finance Manager",
          empId: "T0042",
          img: "https://randomuser.me/api/portraits/women/12.jpg",
          children: [
            {
              id: 19,
              name: "Nandish Shetty",
              designation: "Accounts Executive",
              empId: "T0031",
              img: "https://randomuser.me/api/portraits/men/89.jpg",
            },
          ],
        },
        {
          id: 13,
          name: "Abhishek Banerjee",
          designation: "Finance Manager",
          empId: "T0048",
          img: "https://randomuser.me/api/portraits/men/81.jpg",
        },
      ],
    },
    {
      id: 5,
      name: "Aadesh Hiralal S.",
      designation: "Sales Director",
      empId: "T0070",
      img: "https://randomuser.me/api/portraits/men/80.jpg",
      children: [
        {
          id: 14,
          name: "Ramesh Bulludi",
          designation: "Business Development",
          empId: "T0032",
          img: "https://randomuser.me/api/portraits/men/70.jpg",
        },
        {
          id: 15,
          name: "Rajeev Dixit",
          designation: "Business Development",
          empId: "T0033",
          img: "https://randomuser.me/api/portraits/men/36.jpg",
        },
        {
          id: 16,
          name: "Rita George",
          designation: "Business Development",
          empId: "T0031",
          img: "https://randomuser.me/api/portraits/women/11.jpg",
        },
        {
          id: 17,
          name: "D Mohan Rao",
          designation: "Business Development",
          empId: "T0027",
          img: "https://randomuser.me/api/portraits/men/2.jpg",
        },
      ],
    },
    {
      id: 6,
      name: "Sunil Raj",
      designation: "Director",
      empId: "T0023",
      img: "https://randomuser.me/api/portraits/men/15.jpg",
      children: [
        {
          id: 18,
          name: "Rosie Shah",
          designation: "Business Development",
          empId: "T0035",
          img: "https://randomuser.me/api/portraits/women/26.jpg",
          children: [
            {
              id: 20,
              name: "Manoj Bhardwaj",
              designation: "Business Development",
              empId: "T0034",
              img: "https://randomuser.me/api/portraits/men/41.jpg"
              // FIX: No children property for Manoj Bhardwaj
            },
          ],
        },
      ],
    },
    {
      id: 7,
      name: "S Raj Kumar",
      designation: "Director",
      empId: "T0015",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
  ],
};

function getAllNodeIds(node, acc = []) {
  acc.push(node.id);
  if (node.children) {
    node.children.forEach((n) => getAllNodeIds(n, acc));
  }
  return acc;
}

const OrgNode = ({
  node,
  expanded,
  onToggle,
  level,
  rowColor,
  siblingsLength,
  siblingIdx,
  theme
}) => {
  // Always mount the children wrapper for animation, but control visibility
  const [shouldShowChildren, setShouldShowChildren] = useState(expanded[node.id] !== false);

  // Extract dependencies for useEffect to avoid eslint warning
  const isExpanded = expanded[node.id] !== false;
  const nodeId = node.id;

  useEffect(() => {
    if (isExpanded) setShouldShowChildren(true);
    else {
      // hide after animation
      const t = setTimeout(() => setShouldShowChildren(false), 320);
      return () => clearTimeout(t);
    }
  }, [isExpanded, nodeId]);

  const hasChildren = node.children && node.children.length > 0;

  // Assign row color for this level
  const cardColor = rowColor;

  return (
    <div
      className="org-node-container"
      style={{
        zIndex: isExpanded ? 2 : 1,
      }}
    >
      <div
        className={`org-node${isExpanded ? " expanded" : ""} card-animate${theme === "dark" ? " dark" : ""}`}
        tabIndex={0}
        style={{
          borderColor: cardColor,
          background: cardColor + "22",
          animation:
            isExpanded
              ? `card-fade-in 0.5s cubic-bezier(0.4,0,0.2,1) both`
              : "none",
        }}
      >
        <div className="org-node-header">
          <img
            src={node.img}
            alt={node.name}
            className="org-node-img"
            style={{ borderColor: cardColor }}
          />
          <div>
            <div className="org-node-name">{node.name}</div>
            <div className="org-node-title">{node.designation}</div>
            <div className="org-node-empid">Emp ID: {node.empId}</div>
          </div>
        </div>
        {hasChildren && (
          <button
            className="org-node-toggle"
            onClick={() => onToggle(node.id)}
            aria-label={isExpanded ? "Collapse" : "Expand"}
            tabIndex={-1}
          >
            {isExpanded ? "−" : "+"}
          </button>
        )}
        {/* Children count badge: show when collapsed */}
        {hasChildren && !isExpanded && (
          <div
            className={`org-node-children-count${theme === "dark" ? " dark" : ""}`}
            style={{
              borderColor: cardColor,
              background: theme === "dark" ? "#23263a" : "#fff"
            }}
          >
            {node.children.length}
          </div>
        )}
      </div>
      {hasChildren && (
        <div
          className={`org-children-wrapper ${
            isExpanded ? "expanded" : "collapsed"
          }`}
          style={{
            maxHeight: isExpanded ? node.children.length * 330 + "px" : "0px",
            opacity: isExpanded ? 1 : 0,
            pointerEvents: isExpanded ? "auto" : "none",
            transition:
              "max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.23s",
            overflow: "hidden",
            display: shouldShowChildren ? "flex" : "none",
          }}
        >
          <div className="org-children">
            {node.children.map((child, i) => (
              <OrgNode
                key={child.id}
                node={child}
                expanded={expanded}
                onToggle={onToggle}
                level={level + 1}
                rowColor={getColorForLevel(level + 1)}
                siblingsLength={node.children.length}
                siblingIdx={i}
                theme={theme}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  const [expanded, setExpanded] = useState({});
  const [zoom, setZoom] = useState(1);
  const [theme, setTheme] = useState("light");

  // For panning
  const [isPanning, setIsPanning] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const panOrigin = useRef({ x: 0, y: 0 });
  const mouseOrigin = useRef({ x: 0, y: 0 });

  const allIds = getAllNodeIds(orgData);

  const handleToggle = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAll = () => {
    const all = {};
    allIds.forEach((id) => (all[id] = true));
    setExpanded(all);
  };

  const handleMinimizeAll = () => {
    const all = {};
    allIds.forEach((id) => (all[id] = false));
    setExpanded(all);
  };

  const handleZoomIn = () => {
    setZoom((z) => Math.min(2.5, z + 0.1));
  };

  const handleZoomOut = () => {
    setZoom((z) => Math.max(0.4, z - 0.1));
  };

  useEffect(() => {
    setExpanded({ [orgData.id]: true });
  }, []);

  // Mouse event handlers for panning
  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    mouseOrigin.current = { x: e.clientX, y: e.clientY };
    panOrigin.current = { ...pan };
  };

  const onMouseMove = (e) => {
    if (!isPanning) return;
    const dx = e.clientX - mouseOrigin.current.x;
    const dy = e.clientY - mouseOrigin.current.y;
    setPan({
      x: panOrigin.current.x + dx,
      y: panOrigin.current.y + dy,
    });
  };

  const onMouseUp = () => {
    setIsPanning(false);
  };

  // Touch devices
  const onTouchStart = (e) => {
    setIsPanning(true);
    const touch = e.touches[0];
    mouseOrigin.current = { x: touch.clientX, y: touch.clientY };
    panOrigin.current = { ...pan };
  };
  const onTouchMove = (e) => {
    if (!isPanning) return;
    const touch = e.touches[0];
    const dx = touch.clientX - mouseOrigin.current.x;
    const dy = touch.clientY - mouseOrigin.current.y;
    setPan({
      x: panOrigin.current.x + dx,
      y: panOrigin.current.y + dy,
    });
  };
  const onTouchEnd = () => {
    setIsPanning(false);
  };

  // Theme toggle
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <div className={`app-bg${theme === "dark" ? " dark-theme" : ""}`}>
      <div
        className="org-chart-viewport"
        style={{ cursor: isPanning ? "grabbing" : "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="org-chart-root"
          style={{
            transform: `translate(${pan.x}px,${pan.y}px) scale(${zoom})`,
            transformOrigin: "top center",
            transition: isPanning ? "none" : "transform 0.18s cubic-bezier(0.4,0,0.2,1)",
            userSelect: isPanning ? "none" : "auto",
            pointerEvents: "auto",
          }}
        >
          <OrgNode
            node={orgData}
            expanded={expanded}
            onToggle={handleToggle}
            level={0}
            rowColor={getColorForLevel(0)}
            siblingsLength={1}
            siblingIdx={0}
            theme={theme}
          />
        </div>
      </div>
      <div className="chart-controls">
        <button onClick={handleExpandAll} title="Expand All">
          <svg width="28" height="28" viewBox="0 0 24 24">
            <path
              d="M12 2v20M2 12h20"
              stroke="#444e7c"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button onClick={handleMinimizeAll} title="Minimize All">
          <svg width="28" height="28" viewBox="0 0 24 24">
            <path
              d="M2 12h20"
              stroke="#444e7c"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button onClick={handleZoomIn} title="Zoom In">
          <svg width="28" height="28" viewBox="0 0 24 24">
            <circle
              cx="11"
              cy="11"
              r="8"
              stroke="#444e7c"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M21 21l-4.35-4.35M11 8v6M8 11h6"
              stroke="#444e7c"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button onClick={handleZoomOut} title="Zoom Out">
          <svg width="28" height="28" viewBox="0 0 24 24">
            <circle
              cx="11"
              cy="11"
              r="8"
              stroke="#444e7c"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M21 21l-4.35-4.35M8 11h6"
              stroke="#444e7c"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {/* Theme Toggle Button */}
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "dark" ? (
            <svg width="28" height="28" viewBox="0 0 24 24">
              {/* Sun for light mode */}
              <circle cx="12" cy="12" r="5" fill="#ffd700" />
              <g stroke="#ffd700" strokeWidth="2">
                <line x1="12" y1="2" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="2" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="22" y2="12" />
                <line x1="4.2" y1="4.2" x2="6.3" y2="6.3" />
                <line x1="17.7" y1="17.7" x2="19.8" y2="19.8" />
                <line x1="17.7" y1="6.3" x2="19.8" y2="4.2" />
                <line x1="4.2" y1="19.8" x2="6.3" y2="17.7" />
              </g>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24">
              {/* Moon for dark mode */}
              <path
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                fill="#444e7c"
                stroke="#444e7c"
                strokeWidth="1.5"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default App;
