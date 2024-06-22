import { useState, useEffect } from "react";
import { Option } from "@/types/option";

/**
 * 選択肢を取得するカスタムフック
 *
 * @param {string} url APIのURL
 */
export function useFetchOption(url: string): Option[] {
    // 取得データ管理用
    const [option, setOption] = useState<Option[]>([]);

    // マスタからデータを取得
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url);
            const data = await res.json();
            // 取得結果を更新
            setOption(data);
        };
        fetchData();
    }, []);

    return option;
}
