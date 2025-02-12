import { CircleXIcon } from "lucide-react";

type Props = {
label: string, onRemove: () => void;
}
export default function FilterChip({ label, onRemove }: Props) {
    return (
        <button className="flex items-center  gap-2 justify-between p-2 bg-gray-200 rounded-sm border group cursor-pointer hover:bg-gray-300 transition-colors" onClick={() => onRemove()}>
            <span className="text-gray-400 text-xs group-hover:text-gray-500 transition-colors">{label}</span>
            <CircleXIcon size={12} className="text-gray-400 cursor-pointer group-hover:text-gray-500 transition-colors" />
        </button>
    );
};