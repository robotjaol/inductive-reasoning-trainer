import React from 'react';
import { StimulusItem } from '../types';

interface SvgStimulusProps {
  stimulus?: StimulusItem;
  size?: number; // size in px
  className?: string;
  showBorder?: boolean;
  highlight?: boolean;
}

export const SvgStimulus: React.FC<SvgStimulusProps> = ({
  stimulus,
  size = 120,
  className = '',
  showBorder = true,
  highlight = false,
}) => {
  if (!stimulus) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`flex items-center justify-center rounded-lg bg-slate-50 border border-dashed border-slate-300 text-slate-400 text-xs ${className}`}
      >
        ?
      </div>
    );
  }

  const cx = 100;
  const cy = 100;
  const r = 68;

  // Generate polygon points
  const getPolygonPoints = (sides: number, radius: number, rotDeg: number = 0): string => {
    const points: string[] = [];
    const rotRad = (rotDeg - 90) * (Math.PI / 180);
    for (let i = 0; i < sides; i++) {
      const angle = rotRad + (i * 2 * Math.PI) / sides;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return points.join(' ');
  };

  // Generate Star points
  const getStarPoints = (numRays = 5, outerR = 68, innerR = 34, rotDeg = 0): string => {
    const points: string[] = [];
    const rotRad = (rotDeg - 90) * (Math.PI / 180);
    const totalPoints = numRays * 2;
    for (let i = 0; i < totalPoints; i++) {
      const currentR = i % 2 === 0 ? outerR : innerR;
      const angle = rotRad + (i * Math.PI) / numRays;
      const x = cx + currentR * Math.cos(angle);
      const y = cy + currentR * Math.sin(angle);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return points.join(' ');
  };

  // Primary shape rendering
  const renderPrimaryShape = () => {
    const stroke = stimulus.strokeColor || '#1e293b';
    const strokeWidth = stimulus.strokeWidth || 3;
    const rotation = stimulus.rotation || 0;
    
    // Fill color evaluation
    let fill = 'none';
    if (stimulus.fillColor === 'filled' || stimulus.fillColor === 'black') {
      fill = '#1e293b';
    } else if (stimulus.fillColor === 'shaded' || stimulus.fillColor === 'gray') {
      fill = '#cbd5e1';
    } else if (stimulus.fillColor === 'light') {
      fill = '#f1f5f9';
    } else if (stimulus.fillColor && stimulus.fillColor !== 'none') {
      fill = stimulus.fillColor;
    }

    switch (stimulus.primaryShape) {
      case 'circle':
        return (
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      case 'square':
        return (
          <rect
            x={cx - r * 0.82}
            y={cy - r * 0.82}
            width={r * 1.64}
            height={r * 1.64}
            rx={4}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            transform={`rotate(${rotation} ${cx} ${cy})`}
          />
        );
      case 'diamond':
        return (
          <polygon
            points={`${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            transform={`rotate(${rotation} ${cx} ${cy})`}
          />
        );
      case 'triangle':
        return (
          <polygon
            points={getPolygonPoints(3, r, rotation)}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      case 'pentagon':
        return (
          <polygon
            points={getPolygonPoints(5, r, rotation)}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      case 'hexagon':
        return (
          <polygon
            points={getPolygonPoints(6, r, rotation)}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      case 'star':
        return (
          <polygon
            points={getStarPoints(5, r, r * 0.45, rotation)}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      case 'cross': {
        const w = 24;
        const l = r;
        return (
          <path
            d={`M ${cx - w/2} ${cy - l} 
               H ${cx + w/2} 
               V ${cy - w/2} 
               H ${cx + l} 
               V ${cy + w/2} 
               H ${cx + w/2} 
               V ${cy + l} 
               H ${cx - w/2} 
               V ${cy + w/2} 
               H ${cx - l} 
               V ${cy - w/2} 
               H ${cx - w/2} Z`}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            transform={`rotate(${rotation} ${cx} ${cy})`}
          />
        );
      }
      default:
        if (stimulus.sides && stimulus.sides >= 3) {
          return (
            <polygon
              points={getPolygonPoints(stimulus.sides, r, rotation)}
              fill={fill}
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
          );
        }
        return null;
    }
  };

  // Segments rendering (e.g. pizza slices / sectors)
  const renderSegments = () => {
    if (!stimulus.segments) return null;
    const { total, shadedIndices } = stimulus.segments;
    if (total <= 1) return null;

    if (stimulus.primaryShape === 'square' && total === 4) {
      const half = r * 0.82;
      return <g transform={`rotate(${stimulus.rotation ?? 0} ${cx} ${cy})`}>
        {[[cx, cy - half], [cx, cy], [cx - half, cy], [cx - half, cy - half]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width={half} height={half} fill={shadedIndices.includes(i) ? '#1e293b' : 'none'} stroke="#1e293b" strokeWidth={1.5} />
        ))}
      </g>;
    }

    const paths: React.ReactNode[] = [];
    const angleStep = (2 * Math.PI) / total;

    for (let i = 0; i < total; i++) {
      const startAngle = i * angleStep - Math.PI / 2;
      const endAngle = (i + 1) * angleStep - Math.PI / 2;
      const x1 = cx + (r - 2) * Math.cos(startAngle);
      const y1 = cy + (r - 2) * Math.sin(startAngle);
      const x2 = cx + (r - 2) * Math.cos(endAngle);
      const y2 = cy + (r - 2) * Math.sin(endAngle);
      const isShaded = shadedIndices.includes(i);

      // Arc path
      const pathD = `M ${cx} ${cy} L ${x1} ${y1} A ${r - 2} ${r - 2} 0 0 1 ${x2} ${y2} Z`;
      paths.push(
        <path
          key={`segment-${i}`}
          d={pathD}
          fill={isShaded ? '#1e293b' : 'none'}
          stroke="#1e293b"
          strokeWidth={1.5}
        />
      );
    }
    return <g>{paths}</g>;
  };

  // Inner shapes rendering
  const renderInnerShapes = () => {
    if (!stimulus.innerShapes || stimulus.innerShapes.length === 0) return null;

    return stimulus.innerShapes.map((inner, idx) => {
      const fill =
        inner.fill === 'black'
          ? '#0f172a'
          : inner.fill === 'white'
          ? '#ffffff'
          : inner.fill === 'gray'
          ? '#94a3b8'
          : inner.fill === 'accent'
          ? '#3b82f6'
          : '#0f172a';
      const stroke = '#0f172a';
      const count = inner.count ?? 1;

      // Coordinate helper
      const getInnerCoords = (index: number, total: number) => {
        if (inner.position === 'corners' || inner.position === 'border') {
          const angle = -Math.PI / 2 + index * 2 * Math.PI / Math.max(3, total);
          return { x: cx + 25 * Math.cos(angle), y: cy + 25 * Math.sin(angle) };
        }
        if (total === 1) return { x: cx, y: cy };
        if (inner.position === 'radial' || inner.position === 'distributed') {
          const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
          const dist = 32;
          return {
            x: cx + dist * Math.cos(angle),
            y: cy + dist * Math.sin(angle),
          };
        }
        // default linear horizontal spread
        const span = 46;
        const startX = cx - span / 2;
        const step = total > 1 ? span / (total - 1) : 0;
        return {
          x: startX + index * step,
          y: cy,
        };
      };

      const shapes: React.ReactNode[] = [];
      for (let i = 0; i < count; i++) {
        const { x, y } = getInnerCoords(i, count);
        const key = `inner-${idx}-${i}`;

        if (inner.shape === 'dot') {
          shapes.push(
            <circle
              key={key}
              cx={x}
              cy={y}
              r={7}
              fill={fill}
              stroke={stroke}
              strokeWidth={2}
            />
          );
        } else if (inner.shape === 'circle') {
          shapes.push(
            <circle
              key={key}
              cx={x}
              cy={y}
              r={14}
              fill={fill}
              stroke={stroke}
              strokeWidth={2}
            />
          );
        } else if (inner.shape === 'square') {
          shapes.push(
            <rect
              key={key}
              x={x - 12}
              y={y - 12}
              width={24}
              height={24}
              rx={2}
              fill={fill}
              stroke={stroke}
              strokeWidth={2}
            />
          );
        } else if (inner.shape === 'triangle') {
          shapes.push(
            <polygon
              key={key}
              points={`${x},${y - 14} ${x + 13},${y + 11} ${x - 13},${y + 11}`}
              fill={fill}
              stroke={stroke}
              strokeWidth={2}
            />
          );
        } else if (inner.shape === 'cross') {
          shapes.push(
            <g key={key} stroke={stroke} strokeWidth={2.5}>
              <line x1={x - 8} y1={y - 8} x2={x + 8} y2={y + 8} />
              <line x1={x + 8} y1={y - 8} x2={x - 8} y2={y + 8} />
            </g>
          );
        } else if (inner.shape === 'line') {
          shapes.push(
            <line
              key={key}
              x1={x - 12}
              y1={y}
              x2={x + 12}
              y2={y}
              stroke={stroke}
              strokeWidth={2.5}
            />
          );
        }
      }
      return <g key={`inner-group-${idx}`} transform={`rotate(${(stimulus.rotation ?? 0) + (inner.rotation ?? 0)} ${cx} ${cy})`}>{shapes}</g>;
    });
  };

  // Dots rendering (e.g. black and white tokens)
  const renderDots = () => {
    if (!stimulus.dots) return null;
    const { blackCount = 0, whiteCount = 0 } = stimulus.dots;
    const total = blackCount + whiteCount;
    if (total === 0) return null;

    const items: React.ReactNode[] = [];
    const radius = 30;

    // Arrange dots in circle or linear
    for (let i = 0; i < total; i++) {
      const isBlack = i < blackCount;
      const angle = (i * 2 * Math.PI) / total - Math.PI / 2;
      const grid = stimulus.dots.positions === 'grid';
      const columns = Math.ceil(Math.sqrt(total));
      const rows = Math.ceil(total / columns);
      const spacing = Math.min(18, 94 / Math.max(columns, rows));
      const x = grid ? cx + ((i % columns) - (columns - 1) / 2) * spacing : total === 1 ? cx : cx + radius * Math.cos(angle);
      const y = grid ? cy + (Math.floor(i / columns) - (rows - 1) / 2) * spacing : total === 1 ? cy : cy + radius * Math.sin(angle);

      items.push(
        <circle
          key={`dot-${i}`}
          cx={x}
          cy={y}
          r={grid ? Math.min(5, spacing * 0.32) : 6.5}
          fill={isBlack ? '#0f172a' : '#ffffff'}
          stroke="#0f172a"
          strokeWidth={2}
        />
      );
    }
    return <g>{items}</g>;
  };

  // Custom paths if provided
  const renderCustomPaths = () => {
    if (!stimulus.customPaths) return null;
    return stimulus.customPaths.map((p, i) => (
      <path
        key={`custom-path-${i}`}
        d={p.d}
        fill={p.fill || 'none'}
        stroke={p.stroke || '#1e293b'}
        strokeWidth={p.strokeWidth || 2.5}
        strokeDasharray={p.strokeDasharray}
      />
    ));
  };

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center select-none transition-all duration-150 rounded-xl ${
        showBorder
          ? highlight
            ? 'bg-amber-50/70 border-2 border-amber-500 shadow-sm'
            : 'bg-white border border-slate-200/90 shadow-xs hover:border-slate-300'
          : 'bg-transparent'
      } ${className}`}
    >
      <svg
        role="img"
        aria-label={stimulus.description || 'Figur pola induktif'}
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="w-full h-full p-1 overflow-visible"
      >
        {/* Render base layers */}
        {renderPrimaryShape()}
        {renderSegments()}
        {renderInnerShapes()}
        {renderDots()}
        {renderCustomPaths()}
      </svg>

      {/* Optional text label or hint */}
      {stimulus.textLabel && (
        <span className="absolute bottom-1 right-1.5 text-[10px] font-mono font-semibold px-1 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
          {stimulus.textLabel}
        </span>
      )}
    </div>
  );
};
