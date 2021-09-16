/**
 * SVGで表示する内容
 */
export const circles: string = `
<svg 
    width="50vw"
    height="50vw"
    viewBox="-2 -2 4 4"
>
    <g>
        <line 
            x1="-2"
            y1="0"
            x2="2"
            y2="0"
            stroke="black"
            stroke-width="0.01"
        />
        <line 
            x1="0"
            y1="-2"
            x2="0"
            y2="2"
            stroke="black"
            stroke-width="0.01"
        />
        <circle 
            cx="-1"
            cy="-1"
            r="0.5"
            fill="none"
            stroke="black"
            stroke-width="0.01"
        />
        <ellipse 
            cx="1"
            cy="1"
            rx="1"
            ry="0.5"
            fill="none"
            stroke="black"
            stroke-width="0.01"
        />
    </g>
</svg>
`