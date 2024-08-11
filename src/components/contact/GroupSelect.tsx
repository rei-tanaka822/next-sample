import React from "react";
import { BaseSelect } from "../elements/BaseSelect";
import { Option } from "@/types/option";
import { useFetchOption } from "@/hooks/elements/useFetchOption";

/**
 * Propsの型（選択項目用）
 *
 * @property {string} itemName 項目名
 * @property {{(e: React.ChangeEvent<HTMLSelectElement>) => void}} handleFunc ハンドラメソッド
 */
export type OptionProps = {
    itemName: string;
    handleFunc: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

/**
 * 種別セレクトボックス表示用コンポーネント
 *
 * @param {Props} props セレクトボックスの情報
 * @returns {JSX.Element}
 */
export const GroupSelect = (props: OptionProps) => {
    const { itemName, handleFunc } = props;
    let groupMst: Option[] = [];

    // 種別一覧
    groupMst = useFetchOption("api/master/selectGroupMst");

    return (
        <div>
            <p>{itemName}</p>
            <BaseSelect className="filter" optionList={groupMst} handleFunc={handleFunc} />
        </div>
    );
};
