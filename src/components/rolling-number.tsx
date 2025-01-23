export const RollingNumber = ({ value }: { value: number; }) => {
    const digitsArray = digits(value);
    return (
        <div className="flex overflow-hidden">
            {digitsArray.map((digit, i) => (
                <Digit key={`${digit}-${i}`} value={digit} />
            ))}
        </div>
    );
};

const Digit = ({ value }: { value: number; }) => {
    return (
        <div
            style={{
                transform: `translateY(-${value}rem)`,
                width: "calc(.5rem + 1px)",
                height: "calc(1rem + 1px)",
            }}
            className="flex flex-col transition-transform"
        >
            <span className="leading-[1rem] h-[1rem] text-sm text-muted-foreground">0</span>
            <span className="leading-[1rem] h-[1rem] text-sm text-muted-foreground">1</span>
            <span className="leading-[1rem] h-[1rem] text-sm text-muted-foreground">2</span>
            <span className="leading-[1rem] h-[1rem] text-sm text-muted-foreground">3</span>
            <span className="leading-[1rem] h-[1rem] text-sm text-muted-foreground">4</span>
            <span className="leading-[1rem] h-[1rem] text-sm text-muted-foreground">5</span>
            <span className="leading-[1rem] h-[1rem] text-sm text-muted-foreground">6</span>
            <span className="leading-[1rem] h-[1rem] text-sm text-muted-foreground">7</span>
            <span className="leading-[1rem] h-[1rem] text-sm text-muted-foreground">8</span>
            <span className="leading-[1rem] h-[1rem] text-sm text-muted-foreground">9</span>
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
