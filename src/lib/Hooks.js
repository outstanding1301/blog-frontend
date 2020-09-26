import { useState } from "react"

export const usePreEffect = (func) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    func();
    setHasBeenCalled(true);
}