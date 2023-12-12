'use client'
import { Provider } from "react-redux";
import { setupStore } from "@/redux/store";

interface Props {
    children: React.ReactNode
}

export function Providers({ children }: Props) {
    const store = setupStore()
    return <Provider store={store}>
        {children}
    </Provider>
}