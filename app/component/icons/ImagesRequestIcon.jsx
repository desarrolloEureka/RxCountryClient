import * as React from "react"

export default function ImagesRequestIcon(props) {
  return (
      <div className={props.className}>
          <svg
              width={34}
              height={30}
              viewBox="0 0 34 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              {...props}
          >
              <path
                  d="M5.268 6.585v21.598A1.317 1.317 0 006.585 29.5h25.812a1.317 1.317 0 001.317-1.317V6.585a1.317 1.317 0 00-1.317-1.317H6.585a1.317 1.317 0 00-1.317 1.317zM24.57 9.306a3.03 3.03 0 11-3.047 3.03 3.042 3.042 0 013.047-3.03zM7.357 27.48v-6.287l8.084-7.257 6.175 6.148-7.441 7.396H7.357zm24.25 0H17.055l9.52-9.482 5.032 4.297v5.185z"
                  fill={props.color}
              />
              <path
                  d="M1.317 0A1.317 1.317 0 000 1.317v22.652a1.317 1.317 0 001.317 1.317h1.844V4.478A1.317 1.317 0 014.478 3.16H29.5V1.317A1.317 1.317 0 0028.183 0H1.317z"
                  fill={props.color}
              />
          </svg>
      </div>
  );
}
