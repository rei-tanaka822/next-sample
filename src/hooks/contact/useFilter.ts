import { useState } from "react";
import { ContactDetail, FilterItems } from "@/types/contact";
import { ERROR_FETCH_CONTACT_LIST } from "@/message";

/**
 * 絞り込み用フック
 *
 * @returns {(FilterItems) => Promise<ContactDetail[]>} filter 絞り込み用関数
 */
export function useFilter() {
    const [, setState] = useState();

    const filter = async (filterItems: FilterItems): Promise<ContactDetail[]> => {
        try {
            const params = new URLSearchParams();
            // クエリパラメータの手動設定　※ステータス（配列）が配列のため、そのままだと渡せない
            filterItems.statuses.forEach((status) => params.append("statuses", status));
            if (filterItems.group) {
                params.append("group", filterItems.group);
            }
            if (filterItems.personInCharge) {
                params.append("personInCharge", filterItems.personInCharge);
            }
            // 絞り込みAPI呼び出し
            const res = await fetch(`api/contact/filter?${params}`);
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

    return filter;
}
