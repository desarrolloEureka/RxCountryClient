import * as React from "react";

export default function OrderIcon(props) {

  return (
    <svg
      width={36}
      height={37}
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M32 8.067h-.713a.489.489 0 01-.282-.09.514.514 0 01-.183-.238 2.711 2.711 0 00-.967-1.262A2.577 2.577 0 0028.367 6h-6.734c-.53 0-1.05.167-1.488.477-.438.31-.775.75-.967 1.262a.514.514 0 01-.183.238.489.489 0 01-.282.09H18c-1.06 0-2.078.435-2.828 1.21A4.204 4.204 0 0014 12.2v20.667c0 1.096.421 2.147 1.172 2.922A3.936 3.936 0 0018 37h14c1.06 0 2.078-.435 2.828-1.21A4.204 4.204 0 0036 32.866V12.2a4.204 4.204 0 00-1.172-2.923A3.935 3.935 0 0032 8.067zM28.992 12.2h-7.984a.984.984 0 01-.707-.303 1.051 1.051 0 01-.293-.73c0-.274.105-.537.293-.731a.984.984 0 01.707-.303h7.984c.265 0 .52.11.707.303.188.194.293.457.293.73 0 .275-.105.538-.293.731a.984.984 0 01-.707.303z"
        fill={props.color}
      />
      <path
        d="M9.5 0C4.262 0 0 4.037 0 9s4.262 9 9.5 9S19 13.963 19 9s-4.262-9-9.5-9zm4.385 9.692H10.23v3.462H8.769V9.692H5.115V8.308H8.77V4.846h1.462v3.462h3.654v1.384z"
        fill={props.color}
      />
    </svg>
  );
}
