import * as React from "react";

function LightIcon(props) {
    return (
        <div className={props.className}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={23}
                viewBox="0 0 14 23"
                fill="none"
                {...props}
            >
                <path
                    d="M8.397 20.906h-2.77a.683.683 0 00-.49.209.725.725 0 000 1.01c.13.133.306.208.49.208h2.77c.184 0 .36-.075.49-.209a.725.725 0 000-1.009.683.683 0 00-.49-.209zm.693-2.14H4.934a.683.683 0 00-.49.208.725.725 0 000 1.01c.13.133.306.208.49.208H9.09c.183 0 .36-.075.49-.209a.725.725 0 000-1.009.682.682 0 00-.49-.209zM11.92 3.007A6.784 6.784 0 007.011.926a6.733 6.733 0 00-2.652.538 6.9 6.9 0 00-2.25 1.547 7.137 7.137 0 00-1.5 2.317 7.307 7.307 0 00-.523 2.734c0 2.079.773 4.024 2.121 5.335l.189.183c.78.75 1.845 1.78 1.845 2.688v1.07c0 .19.073.37.203.505.13.134.306.209.49.209h1.039c.092 0 .18-.038.245-.105a.362.362 0 00.101-.252v-5.226a.365.365 0 00-.06-.202.349.349 0 00-.162-.131c-.4-.168-.78-.383-1.132-.64a.702.702 0 01-.307-.466.735.735 0 01.116-.55.701.701 0 01.468-.292.672.672 0 01.527.148c.32.234.937.58 1.243.58.305 0 .922-.347 1.243-.58a.676.676 0 01.933.19.73.73 0 01-.13.97 5.61 5.61 0 01-1.132.638.347.347 0 00-.16.131c-.04.06-.062.13-.062.202v5.228c0 .095.037.185.102.252a.341.341 0 00.245.105H9.09c.183 0 .36-.075.49-.21a.725.725 0 00.202-.504v-1.07c0-.887 1.055-1.915 1.825-2.666l.212-.208c1.386-1.363 2.119-3.21 2.119-5.332a7.286 7.286 0 00-.518-2.735 7.118 7.118 0 00-1.499-2.319z"
                    fill={props.color}
                />
            </svg>
        </div>
    );
}

export default LightIcon;
