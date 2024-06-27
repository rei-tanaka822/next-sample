import React from "react";
import { BaseSelect } from "./BaseSelect";
import { Option } from "@/types/option";
import { useFetchOption } from "@/hooks/useFetchOption";

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
 * ユーザーセレクトボックス表示用コンポーネント
 *
 * @param {Props} props セレクトボックスの情報
 * @returns {JSX.Element}
 */
export const UserSelect = (props: OptionProps) => {
    const { itemName, handleFunc } = props;
    const userMst: Option[] = useFetchOption("api/selectUserMst");

    return (
        <div>
            <p>{itemName}</p>
            <BaseSelect className="filter" optionList={userMst} handleFunc={handleFunc} />
        </div>
    );
};
