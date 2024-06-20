import React from 'react';
import { useState, useEffect } from 'react';
import { BaseSelect } from './BaseSelect';
import { Option, OptionProps } from '@/types/option';

/**
 * ユーザーセレクトボックス表示用コンポーネント
 *
 * @param {Props} props セレクトボックスの情報
 * @returns {JSX.Element}
 */
export const UserSelect = (props: OptionProps) => {
    const { itemName, handleFunc } = props;
    // ユーザー一覧管理用
    const [userMst, setUserMst] = useState<Option[]>([]);

    // ユーザー一覧をマスタから取得
    const selectUserMst = async () => {
        const res = await fetch('api/selectUserMst');
        const data = await res.json();
        // 取得結果を更新
        setUserMst(data);
    };

    useEffect(() => {
        selectUserMst();
    }, []);

    return (
        <div>
            <p>{itemName}</p>
            <BaseSelect
                className="filter"
                optionList={userMst}
                handleFunc={handleFunc}
            />
        </div>
    );
};
