import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ProductVariety } from '../types/candle';
import { Flame, Wind, RotateCcw, ZoomIn, ZoomOut, Upload, Info, CheckCircle2 } from 'lucide-react';

interface InteractiveProductViewerProps {
  product: ProductVariety;
  onUpdateUserImage?: (productId: string, imageUrl: string) => void;
  interactiveMode?: 'full' | 'compact';
}

type AngleView = 'front' | 'angled' | 'top';

export const InteractiveProductViewer: React.FC<InteractiveProductViewerProps> = ({
  product,
  onUpdateUserImage,
  interactiveMode = 'full',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States
  const [isLit, setIsLit] = useState<boolean>(false);
  const [isExtinguished, setIsExtinguished] = useState<boolean>(false);
  const [justIgnited, setJustIgnited] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [currentAngle, setCurrentAngle] = useState<AngleView>('front');

  // Matchstick dragging states
  const [isDraggingMatch, setIsDraggingMatch] = useState<boolean>(false);
  const [matchPosition, setMatchPosition] = useState<{ x: number; y: number } | null>(null);
  const [proximityDistance, setProximityDistance] = useState<number | null>(null);

  // File upload state for genuine photo
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    product.customUserImage || localStorage.getItem(`gharglow_photo_${product.id}`) || null
  );

  // Reset match to initial resting position
  const resetMatchPosition = useCallback(() => {
    setIsDraggingMatch(false);
    setMatchPosition(null);
    setProximityDistance(null);
  }, []);

  // Handle extinguishing
  const handleExtinguish = () => {
    if (!isLit) return;
    setIsLit(false);
    setIsExtinguished(true);
    setTimeout(() => {
      setIsExtinguished(false);
    }, 2000);
  };

  // Full reset
  const handleReset = () => {
    setIsLit(false);
    setIsExtinguished(false);
    setJustIgnited(false);
    resetMatchPosition();
  };

  // File upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setUploadedImage(result);
          try {
            localStorage.setItem(`gharglow_photo_${product.id}`, result);
          } catch {
            // ignore localStorage quota error
          }
          if (onUpdateUserImage) {
            onUpdateUserImage(product.id, result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Pointer drag events for matchstick
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isLit) return; // already lit
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDraggingMatch(true);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMatchPosition({ x, y });
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingMatch || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    setMatchPosition({ x, y });

    // The burning tip of the matchstick is at the top-left of the match head
    // Match head offset: the match head is approx 10px above and 5px left of pointer
    const matchTipX = x - 8;
    const matchTipY = y - 36;

    // Actual wick tip location relative to container
    // We adjust for zoom and angle
    let targetWickX = (product.wickCoordinate.x / 100) * rect.width;
    let targetWickY = (product.wickCoordinate.y / 100) * rect.height;

    // Small offset if angled view is active
    if (currentAngle === 'angled') {
      targetWickX += rect.width * 0.02;
      targetWickY -= rect.height * 0.03;
    } else if (currentAngle === 'top') {
      targetWickX = rect.width * 0.5;
      targetWickY = rect.height * 0.48;
    }

    const dist = Math.hypot(matchTipX - targetWickX, matchTipY - targetWickY);
    setProximityDistance(dist);

    // Collision threshold: burning tip touches the actual wick!
    if (dist <= 26 && !isLit) {
      setIsLit(true);
      setJustIgnited(true);
      setIsDraggingMatch(false);
      setMatchPosition(null);

      setTimeout(() => {
        setJustIgnited(false);
      }, 1200);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingMatch) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    // Releasing the matchstick anywhere other than the actual wick does NOT light the candle
    resetMatchPosition();
  };

  // Synchronized wick position percentages
  const getWickStyle = () => {
    if (currentAngle === 'top') {
      return { left: '50%', top: '48%' };
    }
    if (currentAngle === 'angled') {
      return {
        left: `${product.wickCoordinate.x + 2}%`,
        top: `${product.wickCoordinate.y - 3}%`,
      };
    }
    return {
      left: `${product.wickCoordinate.x}%`,
      top: `${product.wickCoordinate.y}%`,
    };
  };

  const wickStyle = getWickStyle();

  return (
    <div className="w-full bg-[#faf7f2] rounded-2xl border border-[#ebd8e2] overflow-hidden shadow-sm flex flex-col">
      {/* Top control bar: Zoom & Angles */}
      <div className="px-4 py-2.5 bg-[#f5ede1] border-b border-[#ebd8e2] flex items-center justify-between text-xs text-[#4f256d]">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="text-[#88547b] uppercase tracking-wider font-semibold">Inspection Angle:</span>
          <div className="flex items-center bg-white rounded-lg p-0.5 border border-[#ebd8e2]">
            <button
              onClick={() => setCurrentAngle('front')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                currentAngle === 'front' ? 'bg-[#3c1a53] text-white shadow-xs' : 'text-[#5d306b] hover:text-[#3c1a53]'
              }`}
            >
              Front
            </button>
            <button
              onClick={() => setCurrentAngle('angled')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                currentAngle === 'angled' ? 'bg-[#3c1a53] text-white shadow-xs' : 'text-[#5d306b] hover:text-[#3c1a53]'
              }`}
            >
              3/4 Angle
            </button>
            <button
              onClick={() => setCurrentAngle('top')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                currentAngle === 'top' ? 'bg-[#3c1a53] text-white shadow-xs' : 'text-[#5d306b] hover:text-[#3c1a53]'
              }`}
            >
              Top-Down
            </button>
          </div>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.85, Number((z - 0.15).toFixed(2))))}
            className="p-1 rounded bg-white hover:bg-[#fbdde6] text-[#4f256d] border border-[#ebd8e2] transition-colors"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-1.5 tabular-nums font-mono text-[11px] text-[#5d306b]">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.45, Number((z + 0.15).toFixed(2))))}
            className="p-1 rounded bg-white hover:bg-[#fbdde6] text-[#4f256d] border border-[#ebd8e2] transition-colors"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative w-full aspect-square sm:aspect-4/3 min-h-[340px] max-h-[460px] bg-gradient-to-b from-[#f9f3ec] via-[#f7eee5] to-[#f2e6d9] flex items-center justify-center overflow-hidden select-none touch-none cursor-default"
      >
        {/* Ambient Candlelight Glow when Lit */}
        {isLit && (
          <div
            className="absolute pointer-events-none transition-all duration-700 ease-out"
            style={{
              left: wickStyle.left,
              top: wickStyle.top,
              transform: 'translate(-50%, -50%)',
              width: `${260 * zoomLevel}px`,
              height: `${260 * zoomLevel}px`,
              background: 'radial-gradient(circle, rgba(251,191,36,0.38) 0%, rgba(249,115,22,0.18) 45%, rgba(236,72,153,0.05) 70%, transparent 85%)',
              borderRadius: '50%',
              filter: 'blur(16px)',
              zIndex: 15,
            }}
          />
        )}

        {/* Product Silhouette & Real Photo Layer */}
        <div
          className="relative transition-transform duration-300 ease-out flex items-center justify-center w-full h-full p-8"
          style={{
            transform: `scale(${zoomLevel}) ${
              currentAngle === 'angled'
                ? 'perspective(600px) rotateX(12deg) rotateY(-10deg)'
                : currentAngle === 'top'
                ? 'perspective(600px) rotateX(44deg)'
                : ''
            }`,
          }}
        >
          {uploadedImage ? (
            /* Genuine Photo Uploaded */
            <div className="relative max-w-full max-h-full flex items-center justify-center">
              <img
                src={uploadedImage}
                alt={product.name}
                className="max-h-[300px] object-contain rounded-lg shadow-md"
              />
            </div>
          ) : (
            /* Authentic Handcrafted Vector Architecture matching exact physical reality */
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              {renderAuthenticProductArt(product.productType, isLit, currentAngle)}
            </div>
          )}

          {/* Actual Wick Anchor Indicator (when unlit, subtle target; when lit, anchor for flame) */}
          <div
            className="absolute transition-all duration-200 pointer-events-none"
            style={{
              left: wickStyle.left,
              top: wickStyle.top,
              transform: 'translate(-50%, -100%)',
              zIndex: 20,
            }}
          >
            {/* The Actual Flame when Lit */}
            {isLit && (
              <div className="relative flex flex-col items-center">
                {/* Active Teardrop Flame */}
                <div className="animate-flicker relative w-7 h-12 flex items-center justify-center">
                  {/* Outer amber halo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200 rounded-full opacity-90 blur-[1px]" />
                  {/* Inner yellow glow */}
                  <div className="absolute bottom-1 w-4 h-8 bg-gradient-to-t from-amber-400 via-yellow-200 to-white rounded-full opacity-95" />
                  {/* Intense white-hot core */}
                  <div className="absolute bottom-1.5 w-2 h-4 bg-white rounded-full blur-[0.5px]" />
                  {/* Blue base characteristic of pure cow ghee or clean wax */}
                  <div className="absolute bottom-0 w-3 h-2 bg-blue-500/70 rounded-full blur-[1px]" />
                </div>

                {/* Subtle ignition flash burst on contact */}
                {justIgnited && (
                  <div className="absolute -top-3 w-12 h-12 rounded-full bg-amber-300/80 animate-ping pointer-events-none" />
                )}
              </div>
            )}

            {/* Extinguished Smoke Wisp */}
            {isExtinguished && (
              <div className="animate-smoke absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-10 flex flex-col items-center pointer-events-none">
                <div className="w-1.5 h-6 bg-slate-400/50 rounded-full blur-[1px]" />
                <div className="w-2.5 h-4 bg-slate-300/30 rounded-full blur-[2px] -mt-1" />
              </div>
            )}

            {/* Visual Wick Target Ring (Guides the customer to touch the actual wick tip with the matchstick) */}
            {!isLit && isDraggingMatch && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                <div className="w-9 h-9 rounded-full border-2 border-dashed border-amber-500/80 animate-pulse bg-amber-400/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-amber-600" />
                </div>
                <span className="absolute -top-6 whitespace-nowrap text-[10px] font-semibold text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded shadow-xs">
                  Target: Baati / Wick
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Draggable Matchstick Layer */}
        {/* 1. Resting matchstick in matchbox (when not being dragged and candle unlit) */}
        {!isLit && !isDraggingMatch && (
          <div
            onPointerDown={handlePointerDown}
            className="absolute bottom-4 right-4 z-30 cursor-grab active:cursor-grabbing group p-2 rounded-xl bg-white/90 backdrop-blur-xs border border-[#ebd8e2] shadow-md hover:shadow-lg transition-transform hover:scale-105"
            title="Drag the burning matchstick to the wick tip"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative w-28 h-8 flex items-center">
                {/* Matchstick body */}
                <div className="h-2 w-22 bg-[#e2be89] rounded-l-xs shadow-xs border-y border-[#c59a60]" />
                {/* Match head with active flame */}
                <div className="relative -ml-1">
                  <div className="w-4 h-3 bg-[#b91c1c] rounded-full shadow-inner" />
                  {/* Burning tip flame */}
                  <div className="absolute -top-6 -left-1 animate-match-flicker w-4 h-7">
                    <div className="w-full h-full bg-gradient-to-t from-red-600 via-amber-400 to-yellow-200 rounded-full blur-[0.5px]" />
                  </div>
                </div>
              </div>
              <div className="text-left pr-1">
                <p className="text-[11px] font-semibold text-[#3c1a53] uppercase tracking-wider">
                  Drag Match
                </p>
                <p className="text-[10px] text-[#7d486d]">Touch to baati wick</p>
              </div>
            </div>
          </div>
        )}

        {/* 2. Actively Dragged Matchstick following pointer */}
        {isDraggingMatch && matchPosition && (
          <div
            className="absolute z-40 pointer-events-none transition-none"
            style={{
              left: `${matchPosition.x}px`,
              top: `${matchPosition.y}px`,
              transform: 'translate(-8px, -36px) rotate(-35deg)',
            }}
          >
            <div className="relative flex items-center">
              {/* Wooden Stick */}
              <div className="h-2.5 w-32 bg-[#e2be89] rounded-l-xs shadow-md border-y border-[#c59a60]" />
              {/* Red Match Head */}
              <div className="relative -ml-1">
                <div className="w-4.5 h-3.5 bg-[#b91c1c] rounded-full shadow-inner" />
                {/* Match Flame with flickers */}
                <div className="absolute -top-7 -left-1.5 animate-match-flicker w-5 h-9">
                  <div className="w-full h-full bg-gradient-to-t from-red-600 via-amber-400 to-yellow-100 rounded-full blur-[0.5px]" />
                  <div className="absolute bottom-1 left-1.5 w-2 h-4 bg-white rounded-full blur-[0.5px]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lit Candle Actions Overlay */}
        {isLit && (
          <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
            <button
              onClick={handleExtinguish}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-white bg-[#3c1a53] hover:bg-[#4f256d] shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Extinguish</span>
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-full text-[#3c1a53] bg-white hover:bg-[#fbdde6] border border-[#ebd8e2] shadow-sm transition-all cursor-pointer"
              title="Reset Diya"
              aria-label="Reset Diya"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Status prompt at top of stage */}
        <div className="absolute top-3 left-3 z-20 pointer-events-none">
          <div className="bg-white/85 backdrop-blur-xs px-2.5 py-1 rounded-md border border-[#ebd8e2]/80 text-[11px] font-medium text-[#4f256d] flex items-center gap-1.5 shadow-2xs">
            {isLit ? (
              <>
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-400 animate-pulse" />
                <span className="text-amber-900 font-semibold">Lit at authentic wick</span>
              </>
            ) : isDraggingMatch ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span>Move flame tip to the baati wick</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#f8c2d3]" />
                <span>Drag matchstick to ignite the baati</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Model & Asset Transparency Notice */}
      <div className="px-4 py-2 bg-[#fdfaf7] border-t border-[#ebd8e2] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#6d3a5e]">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#88547b] shrink-0" />
          <span>
            {uploadedImage
              ? 'Using uploaded authentic high-res batch photo.'
              : 'Authentic physical silhouette rendered. Multi-angle photogrammetry 3D scan pending.'}
          </span>
        </div>

        {/* Owner Photo Upload Button */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-[10px] font-medium text-[#4f256d] hover:text-[#3c1a53] underline flex items-center gap-1 cursor-pointer"
          >
            <Upload className="w-3 h-3" />
            <span>Upload Real Photo</span>
          </button>
          {uploadedImage && (
            <button
              onClick={() => {
                setUploadedImage(null);
                localStorage.removeItem(`gharglow_photo_${product.id}`);
              }}
              className="text-[10px] text-rose-600 hover:underline cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Authentic vector illustration of each candle variety capturing
 * genuine physical characteristics (clay panti, red cotton baati, golden ghee,
 * motichoor granules, carved rose petals, etc.)
 */
function renderAuthenticProductArt(
  productType: ProductVariety['productType'],
  isLit: boolean,
  angle: AngleView
) {
  switch (productType) {
    case 'panti_diya_ghee':
      // Authentic Terracotta Brown Panti Diya with Golden Ghee and Hand-rolled Red Cotton Baati
      return (
        <svg viewBox="0 0 320 260" className="w-full h-full drop-shadow-md">
          <defs>
            <radialGradient id="gheeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="65%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </radialGradient>
            <linearGradient id="clayPanti" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9c5333" />
              <stop offset="40%" stopColor="#7b4129" />
              <stop offset="100%" stopColor="#532717" />
            </linearGradient>
            <linearGradient id="clayLip" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b46440" />
              <stop offset="50%" stopColor="#8d492c" />
              <stop offset="100%" stopColor="#67311c" />
            </linearGradient>
            <filter id="clayShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#2e140d" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Table shadow */}
          <ellipse cx="160" cy="195" rx="100" ry="24" fill="#3a1c12" opacity="0.18" />

          {/* Earthen Clay Diya Body */}
          <path
            d="M 50 120 C 50 175, 110 200, 160 200 C 210 200, 270 175, 270 120 C 270 110, 250 95, 225 95 C 190 95, 175 80, 155 80 C 135 80, 120 95, 85 95 C 60 95, 50 110, 50 120 Z"
            fill="url(#clayPanti)"
            filter="url(#clayShadow)"
          />

          {/* Diya Inner Cavity / Ghee Pool */}
          <ellipse cx="160" cy="130" rx="88" ry="42" fill="#582a1b" />
          <ellipse cx="160" cy="132" rx="80" ry="36" fill="url(#gheeGlow)" />

          {/* Ghee surface highlights */}
          <ellipse cx="152" cy="126" rx="55" ry="20" fill="#fef9c3" opacity="0.4" />

          {/* Hand-rolled Red Cotton Baati (Wick) resting along the clay lip */}
          {/* Baati body extending from inside ghee to the forward lip */}
          <path
            d="M 175 145 C 168 135, 158 118, 154 92"
            stroke="#991b1b"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          {/* Baati cotton twist texture */}
          <path
            d="M 175 145 C 168 135, 158 118, 154 92"
            stroke="#dc2626"
            strokeWidth="4"
            strokeDasharray="4 3"
            strokeLinecap="round"
            fill="none"
          />
          {/* Exposed Wick Tip at exact coordinate (154, 91) -> which corresponds to 48%, 35% */}
          <circle cx="154" cy="91" r="3.5" fill="#450a0a" />
          <circle cx="154" cy="91" r="2" fill="#7f1d1d" />

          {/* Front Diya Clay Rim & Pinch Spout Lip */}
          <path
            d="M 50 120 C 80 150, 240 150, 270 120 C 255 128, 220 135, 160 135 C 100 135, 65 128, 50 120 Z"
            fill="url(#clayLip)"
          />

          {/* Subtle diya clay texture ridges */}
          <path d="M 90 148 C 120 162, 200 162, 230 148" stroke="#a35b38" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M 110 168 C 135 178, 185 178, 210 168" stroke="#a35b38" strokeWidth="1.5" fill="none" opacity="0.4" />
        </svg>
      );

    case 'pink_laddu':
      // Motichoor Laddu Shaped Candle with spherical granulated texture & top wick
      return (
        <svg viewBox="0 0 320 260" className="w-full h-full drop-shadow-md">
          <defs>
            <radialGradient id="ladduGradient" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="35%" stopColor="#f472b6" />
              <stop offset="75%" stopColor="#db2777" />
              <stop offset="100%" stopColor="#9d174d" />
            </radialGradient>
          </defs>
          <ellipse cx="160" cy="205" rx="75" ry="18" fill="#4a1525" opacity="0.2" />

          {/* Main spherical body */}
          <circle cx="160" cy="140" r="70" fill="url(#ladduGradient)" />

          {/* Motichoor bead droplets textured surface */}
          {[
            [130, 105, 5], [145, 95, 6], [165, 96, 6], [185, 105, 5],
            [120, 125, 7], [140, 120, 8], [160, 118, 8], [180, 122, 7], [200, 130, 6],
            [115, 150, 7], [138, 148, 8], [162, 145, 9], [185, 150, 8], [205, 155, 6],
            [125, 175, 6], [145, 175, 7], [168, 174, 8], [190, 172, 6],
            [140, 195, 6], [160, 196, 6], [178, 193, 5],
          ].map(([bx, by, br], i) => (
            <circle key={i} cx={bx} cy={by} r={br} fill="#f9a8d4" opacity="0.65" />
          ))}

          {/* Edible Gold Leaf Vark Specks */}
          <polygon points="152,110 156,108 158,114 150,113" fill="#fde047" opacity="0.9" />
          <polygon points="170,128 175,125 174,132 168,130" fill="#fde047" opacity="0.85" />

          {/* Braided Cotton Wick emerging from top center (160, 80) -> { x: 50, y: 31 } */}
          <path d="M 160 92 L 160 80" stroke="#1f2937" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 160 92 L 160 80" stroke="#f3f4f6" strokeWidth="1.5" strokeDasharray="2 2" strokeLinecap="round" />
          <circle cx="160" cy="80" r="2" fill="#111827" />
        </svg>
      );

    case 'rose_floating_sculpted':
    case 'rose_floating_small':
      // Rose-Shaped Floating Candle with layered concentric rose petals
      return (
        <svg viewBox="0 0 320 260" className="w-full h-full drop-shadow-md">
          <defs>
            <radialGradient id="roseGradient" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#fdeef3" />
              <stop offset="35%" stopColor="#f8c2d3" />
              <stop offset="70%" stopColor="#e87698" />
              <stop offset="100%" stopColor="#a3274c" />
            </radialGradient>
          </defs>
          {/* Water reflection ripples */}
          <ellipse cx="160" cy="180" rx="90" ry="20" fill="#381324" opacity="0.15" />
          <ellipse cx="160" cy="180" rx="105" ry="12" stroke="#f472b6" strokeWidth="1" fill="none" opacity="0.25" />

          {/* Outer Layer Petals */}
          <path d="M 100 145 C 90 110, 130 90, 160 100 C 190 90, 230 110, 220 145 C 235 175, 195 205, 160 195 C 125 205, 85 175, 100 145 Z" fill="#c03967" />

          {/* Mid Layer Petals */}
          <path d="M 112 140 C 105 115, 135 102, 160 110 C 185 102, 215 115, 208 140 C 220 165, 185 185, 160 180 C 135 185, 100 165, 112 140 Z" fill="url(#roseGradient)" />

          {/* Inner Petal Swirls */}
          <path d="M 135 130 C 130 118, 150 112, 160 116 C 170 112, 190 118, 185 130 C 190 145, 170 155, 160 152 C 150 155, 130 145, 135 130 Z" fill="#be185d" />
          <path d="M 145 125 C 145 118, 155 115, 160 118 C 165 115, 175 118, 175 125 C 175 135, 165 140, 160 138 C 155 140, 145 135, 145 125 Z" fill="#fda4af" />

          {/* Centered Cotton Wick (160, 96) -> { x: 50, y: 37 } */}
          <path d="M 160 115 L 160 96" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
          <circle cx="160" cy="96" r="2" fill="#111827" />
        </svg>
      );

    case 'rose_ghee_vati':
      // Green Rose-Shaped Pure Ghee Ful Vati
      return (
        <svg viewBox="0 0 320 260" className="w-full h-full drop-shadow-md">
          <defs>
            <radialGradient id="greenGheeGrad" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#d1e3d3" />
              <stop offset="40%" stopColor="#8db893" />
              <stop offset="80%" stopColor="#55815b" />
              <stop offset="100%" stopColor="#325337" />
            </radialGradient>
          </defs>
          <ellipse cx="160" cy="190" rx="80" ry="18" fill="#1b2e1e" opacity="0.2" />

          {/* Rose petal contours formed from solidified curd ghee */}
          <path d="M 105 140 C 95 115, 130 95, 160 102 C 190 95, 225 115, 215 140 C 230 170, 190 195, 160 188 C 130 195, 90 170, 105 140 Z" fill="#3b6241" />
          <path d="M 115 138 C 110 118, 135 106, 160 112 C 185 106, 210 118, 205 138 C 215 160, 185 180, 160 175 C 135 180, 105 160, 115 138 Z" fill="url(#greenGheeGrad)" />

          {/* Solidified pure cow ghee creamy texture highlights */}
          <path d="M 135 125 C 145 115, 175 115, 185 125 C 175 140, 145 140, 135 125 Z" fill="#b9d6bc" opacity="0.75" />

          {/* Upright cotton baati wick emerging from center (160, 94) -> { x: 50, y: 36 } */}
          <path d="M 160 115 L 160 94" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <path d="M 160 102 L 160 94" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
          <circle cx="160" cy="94" r="2.5" fill="#111827" />
        </svg>
      );

    case 'chandan_ghee_vati':
      // Orange / Peach Chandan Sandalwood Pure Ghee Ful Vati
      return (
        <svg viewBox="0 0 320 260" className="w-full h-full drop-shadow-md">
          <defs>
            <radialGradient id="chandanGrad" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="40%" stopColor="#f97316" />
              <stop offset="85%" stopColor="#c2410c" />
              <stop offset="100%" stopColor="#7c2d12" />
            </radialGradient>
          </defs>
          <ellipse cx="160" cy="195" rx="75" ry="18" fill="#431407" opacity="0.2" />

          {/* Conical rounded curd vati base */}
          <path
            d="M 100 175 C 100 190, 220 190, 220 175 C 215 130, 185 98, 160 96 C 135 98, 105 130, 100 175 Z"
            fill="url(#chandanGrad)"
          />

          {/* Ghee surface curd rings */}
          <ellipse cx="160" cy="172" rx="55" ry="14" fill="#ea580c" opacity="0.7" />
          <ellipse cx="160" cy="145" rx="42" ry="10" fill="#fed7aa" opacity="0.55" />

          {/* Cotton baati wick tip at (160, 88) -> { x: 50, y: 34 } */}
          <path d="M 160 104 L 160 88" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <path d="M 160 96 L 160 88" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
          <circle cx="160" cy="88" r="2.5" fill="#1e293b" />
        </svg>
      );

    case 'kewra_ghee_vati':
      // Pale Yellow Kewra Flower Pure Ghee Ful Vati
      return (
        <svg viewBox="0 0 320 260" className="w-full h-full drop-shadow-md">
          <defs>
            <radialGradient id="kewraGrad" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="45%" stopColor="#fde047" />
              <stop offset="85%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#854d0e" />
            </radialGradient>
          </defs>
          <ellipse cx="160" cy="195" rx="75" ry="18" fill="#422006" opacity="0.2" />

          {/* Conical rounded pale-yellow curd vati */}
          <path
            d="M 100 175 C 100 190, 220 190, 220 175 C 215 130, 185 98, 160 96 C 135 98, 105 130, 100 175 Z"
            fill="url(#kewraGrad)"
          />
          <ellipse cx="160" cy="172" rx="55" ry="14" fill="#eab308" opacity="0.7" />
          <ellipse cx="160" cy="145" rx="42" ry="10" fill="#fef08a" opacity="0.75" />

          {/* Cotton baati wick tip at (160, 88) -> { x: 50, y: 34 } */}
          <path d="M 160 104 L 160 88" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <path d="M 160 96 L 160 88" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
          <circle cx="160" cy="88" r="2.5" fill="#1e293b" />
        </svg>
      );

    case 'small_lantern':
    case 'flower_lantern':
      // Handcrafted table lantern housing with pierced filigree
      return (
        <svg viewBox="0 0 320 260" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="35%" stopColor="#d97706" />
              <stop offset="70%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
          </defs>
          <ellipse cx="160" cy="225" rx="65" ry="14" fill="#291205" opacity="0.2" />

          {/* Lantern Top Loop & Dome */}
          <ellipse cx="160" cy="65" rx="14" ry="14" fill="none" stroke="url(#brassGrad)" strokeWidth="4" />
          <path d="M 125 95 C 130 75, 190 75, 195 95 Z" fill="url(#brassGrad)" />

          {/* Lantern Frame Columns & Glass Chamber */}
          <rect x="120" y="95" width="80" height="110" rx="6" fill="#fef3c7" opacity="0.35" stroke="url(#brassGrad)" strokeWidth="4" />

          {/* Interior Tea Light / Candle resting inside lantern at (160, 143) -> { x: 50, y: 55 } */}
          <ellipse cx="160" cy="180" rx="22" ry="7" fill="#f59e0b" />
          <rect x="142" y="152" width="36" height="28" rx="2" fill="#fffbeb" />
          <path d="M 160 152 L 160 143" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="160" cy="143" r="2" fill="#111827" />

          {/* Filigree flower cutouts */}
          <circle cx="140" cy="120" r="3" fill="#92400e" />
          <circle cx="180" cy="120" r="3" fill="#92400e" />
          <circle cx="160" cy="112" r="3" fill="#92400e" />
        </svg>
      );

    default:
      // Pure Ghee / Kapoor Ful Vatis (Classic natural ivory curd)
      return (
        <svg viewBox="0 0 320 260" className="w-full h-full drop-shadow-md">
          <defs>
            <radialGradient id="ivoryGheeGrad" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#fef3c7" />
              <stop offset="85%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#d97706" />
            </radialGradient>
          </defs>
          <ellipse cx="160" cy="195" rx="75" ry="18" fill="#312e81" opacity="0.1" />

          {/* Pure Ghee Solidified Cone */}
          <path
            d="M 105 175 C 105 190, 215 190, 215 175 C 210 130, 185 98, 160 96 C 135 98, 110 130, 105 175 Z"
            fill="url(#ivoryGheeGrad)"
          />
          <ellipse cx="160" cy="170" rx="50" ry="12" fill="#fef08a" opacity="0.4" />

          {/* Cotton braided baati wick at (160, 91) -> { x: 50, y: 35 } */}
          <path d="M 160 106 L 160 91" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <path d="M 160 98 L 160 91" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
          <circle cx="160" cy="91" r="2.5" fill="#111827" />
        </svg>
      );
  }
}
