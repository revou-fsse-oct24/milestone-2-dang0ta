import { useRouter } from 'nextjs-toploader/app';
import { useEffect } from "react";

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        router.push("/shop");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}