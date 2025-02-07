import { useRouter } from "nextjs-toploader/app";
import { FC, useEffect } from "react";

export default function RedirectIfUnauthenticated(Component: FC) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function IsAuthenticated(props: any) {
        const router = useRouter();

        useEffect(() => {
            
            (async () => {
                const response = await fetch("/api/user");
                if (response.status >= 400) {
                    return router.replace("/login")
                }
            })()
         }, [router]);

        return <Component {...props} />;
    };
}