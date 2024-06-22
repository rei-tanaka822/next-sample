import React from "react";
import { BaseSelect } from "./BaseSelect";
import { Option, OptionProps } from "@/types/option";
import { useFetchOption } from "@/hooks/useFetchOption";

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
