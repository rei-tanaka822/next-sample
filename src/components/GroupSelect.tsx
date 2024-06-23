import React from "react";
import { BaseSelect } from "./BaseSelect";
import { Option, OptionProps } from "@/types/option";
import { useFetchOption } from "@/hooks/useFetchOption";

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
    groupMst = useFetchOption("api/selectGroupMst");

    return (
        <div>
            <p>{itemName}</p>
            <BaseSelect className="filter" optionList={groupMst} handleFunc={handleFunc} />
        </div>
    );
};
