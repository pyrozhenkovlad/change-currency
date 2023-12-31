export const Save = ({
  disabled,
  cursor,
  onClick,
}: {
  disabled: boolean;
  cursor: "pointer" | "not-allowed";
  onClick?: () => void;
}) => (
  <div onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={17}
      fill={`${disabled && "gray"}`}
      style={{ cursor }}
    >
      <path
        fill={`${disabled ? "gray" : "#1EC11B"}`}
        d="M14.215 4.617a.5.5 0 0 1 .066.658l-.04.049-6.5 7a.5.5 0 0 1-.698.033l-.044-.044-3.5-4a.5.5 0 0 1 .708-.703l.044.044 3.136 3.583 6.122-6.594a.5.5 0 0 1 .658-.066l.048.04Z"
      />
    </svg>
  </div>
);
