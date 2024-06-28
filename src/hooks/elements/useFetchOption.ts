import { useState, useEffect } from "react";
import { Option } from "@/types/option";
import { ERROR_FETCH_MST } from "@/message";

/**
 * 選択肢を取得するカスタムフック
 *
 * @param {string} url APIのURL
 */
export function useFetchOption(url: string): Option[] {
    // 取得データ管理用
    const [option, setOption] = useState<Option[]>([]);
    const [, setState] = useState();

    // マスタからデータを取得
    try {
        useEffect(() => {
            const fetchData = async () => {
                const res = await fetch(url);
                const data = await res.json();
                if (!res.ok) {
                    setState(() => {
                        throw new Error(ERROR_FETCH_MST);
                    });
                }
                // 取得結果を更新
                setOption(data);
            };
            fetchData();
        }, []);
    } catch (error) {
        setState(() => {
            throw error;
        });
    }

    return option;
}
