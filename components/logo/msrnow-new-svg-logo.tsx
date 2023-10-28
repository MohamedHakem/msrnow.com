export default function MsrnowSVGLogo({ color, width, height }: { color: string, width: number, height: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width={width || "70"} height={height || "70"} viewBox="0 0 500.000000 500.000000" preserveAspectRatio="xMidYMid meet">
      <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)" fill={color || "#000000"} stroke="none">
        <path d="M1646 2590 c-465 -813 -846 -1482 -846 -1485 0 -3 246 -5 548 -5 l547 0 234 408 c129 224 389 674 578 1001 189 326 343 598 343 603 0 14 -542 958 -550 958 -4 0 -388 -666 -854 -1480z" />
        <path d="M2747 1957 c-268 -464 -487 -847 -487 -850 0 -4 146 -7 324 -7 l324 0 326 565 326 565 -161 283 c-89 155 -163 283 -164 285 -1 1 -221 -377 -488 -841z" />
        <path d="M3504 1513 c-126 -218 -230 -400 -232 -405 -2 -4 206 -8 463 -8 289 0 465 4 463 9 -8 24 -454 800 -459 801 -3 0 -109 -178 -235 -397z" />
      </g>
    </svg>
  )
};