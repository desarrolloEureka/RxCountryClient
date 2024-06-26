import _ from "lodash";
import { useRef } from "react";

interface useDebounceProps {
    callback: (e: any) => void;
    wait: number;
    options?: any;
}

function useDebounce({ callback, wait, options }: useDebounceProps) {
    return useRef(_.debounce(callback, wait, options)).current;
}

export default useDebounce;
