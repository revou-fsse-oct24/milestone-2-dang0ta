import { cn } from "@/lib/utils";

export const RollingNumber = ({ value }: { value: number }) => {
  const digitsArray = digits(value);
  return (
    <div className="flex overflow-hidden">
      {digitsArray.map((digit, i) => (
        <Digit key={i} value={digit} />
      ))}
    </div>
  );
};

const Digit = ({ value }: { value: number }) => {
  return (
    <div
      style={{
        transform: `translateY(-${value}rem)`,
        width: "calc(.5rem + 1px)",
        height: "calc(1rem + 1px)",
      }}
      className={cn("flex flex-col transition-transform")}
    >
      {[...Array(10)
        .keys()]
        .map((n) => (
          <span key={n} className="leading-[1rem] h-[1rem] text-sm text-muted-foreground">
            {`${n}`}
          </span>
        ))}
    </div>
  );
};

const digits = (value: number): number[] => {
  if (value == 0) {
    return [0];
  }
  return Array(digitCount(value))
    .fill(0)
    .map((_, i) => Math.floor(value / Math.pow(10, i)) % 10)
    .reverse();
};
const digitCount = (value: number): number => Math.floor(Math.log10(value)) + 1;
