import "./Tooltip1.css";

export default function Tooltip1(props: Tooltip1Props) {
  return (
    <div className="tooltip-1-tooltip">
      <div className={` tooltip-1-tooltip-master-auto-layout`}>
        <div className="tooltip-1-tooltip-wrapper">
          <div className={` tooltip-1-beak-top`}>
            <svg
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              viewBox="0 0 48 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 16 8 L 32 8 L 24 0 L 16 8 Z" fill="#373D3F" />
              <path
                d="M 16 9.5 L 32 9.5 L 24 1.5 L 16 9.5 Z"
                fill="#373D3F"
               />
            </svg>
          </div>
          <div className="tooltip-1-beak-bubble-beak">
            <div className="tooltip-1-bubble">
              <div className="tooltip-1-tooltip-content">
                <p className="tooltip-1-tooltip-content-1">
                  Tooltip content.
                </p>
              </div>
              <div className="tooltip-1-close-1">
                <div className={` tooltip-1-close`}>
                  <svg
                    width="100%"
                    height="100%"
                    preserveAspectRatio="none"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M 3.577 15.245 C 3.252 15.571 3.252 16.098 3.577 16.424 C 3.903 16.749 4.43 16.749 4.756 16.424 L 10 11.18 L 15.244 16.424 C 15.57 16.749 16.097 16.749 16.423 16.424 C 16.748 16.098 16.748 15.571 16.423 15.245 L 11.179 10.001 L 16.423 4.757 C 16.748 4.432 16.748 3.904 16.423 3.578 C 16.097 3.253 15.57 3.253 15.244 3.578 L 10 8.823 L 4.756 3.578 C 4.43 3.253 3.903 3.253 3.577 3.578 C 3.252 3.904 3.252 4.432 3.577 4.757 L 8.821 10.001 L 3.577 15.245 Z"
                      fill="#8C979A"
                     />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Tooltip1.defaultProps = {
  className: "",
  style: {},
};

interface Tooltip1Props {
  className: string;
  style: Object;
}

