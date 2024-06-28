import { useState } from "react";
import { ContactDetail, SearchWords } from "@/types/contact";
import { ERROR_FETCH_CONTACT_LIST } from "@/message";

/**
 * 検索用フック
 *
 * @returns {(SearchWords) => Promise<ContactDetail[]>} search 検索用関数
 */
export function useSearch() {
    const [, setState] = useState();

    const search = async (searchWords: SearchWords): Promise<ContactDetail[]> => {
        try {
            const params = new URLSearchParams(searchWords);
            // 検索API呼び出し
            const res = await fetch(`api/contact/search?${params}`);
            if (!res.ok) {
                setState(() => {
                    throw new Error(ERROR_FETCH_CONTACT_LIST);
                });
            }
            return await res.json();
        } catch (error) {
            setState(() => {
                throw error;
            });
        }
        throw new Error(ERROR_FETCH_CONTACT_LIST);
    };

    return search;
}
