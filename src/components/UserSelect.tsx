import React from 'react';
import { useState, useEffect } from 'react';
import { BaseSelect } from './BaseSelect';

/**
 * Propsの型
 *
 * @property {string} itemName 項目名
 * @property {{(e: React.ChangeEvent<HTMLSelectElement>) => void}} handleFunc ハンドラメソッド
 */
type Props = {
    itemName: string;
    handleFunc: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * ユーザーの型
 *
 * @property {string} id ユーザーID
 * @property {string} value ユーザー名
 */
type UserMst = {
    id: number;
    value: string;
}

/**
 * ユーザーセレクトボックス表示用コンポーネント
 *
 * @param {Props} props セレクトボックスの情報
 * @returns {JSX.Element}
 */
export const UserSelect = (props: Props) => {
    const { itemName, handleFunc } = props;
    // ユーザー一覧管理用
    const [userMst, setUserMst] = useState<UserMst[]>([]);

    // ユーザー一覧をマスタから取得
    const selectUserMst = async () => {
		const res = await fetch('api/selectUserMst');
		const data = await (res.json());
		// 取得結果を更新
		setUserMst(data);
	}

    useEffect(() => {
        selectUserMst();
    }, []);

    return (
        <div>
        <p>{itemName}</p>
            <BaseSelect className="filter" optionList={userMst} handleFunc={handleFunc} />
        </div>
    );
}