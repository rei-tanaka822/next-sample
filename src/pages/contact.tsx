import React from 'react';
import { GroupSelect } from "@/components/GroupSelect";
import { UserSelect } from "@/components/UserSelect";
import { StatusCheckList } from "@/components/StatusCheckList";
import { Header } from "@/components/Header";
import { GetServerSideProps, NextPage } from "next";
import { ContactDetail } from "@/types/contact";
import { useInputText, useInputSelect, useInputChecks } from "@/hooks/useInput";
import { useContactList } from "@/hooks/useContactList";
import { fetchContactList } from "@/services/fetchContactList";

/**
 * Propsの型
 *
 * @property {ContactDetail[]} initialContactDetailList 問合せ一覧（初期表示）
 */
type ContactProps = {
    initialContactDetailList: ContactDetail[];
};

/**
 * 一覧ページ表示用コンポーネント
 *
 * @param {ContactProps} props 案件情報
 * @returns {JSX.Element}
 */
const ContactPage: NextPage<ContactProps> = (props: ContactProps) => {
    // 検索ワード
    const searchWordContact = useInputText("");
    const searchWordClient = useInputText("");
    // 絞り込み条件
    const checkedStatuses = useInputChecks([]);
    const selectedGroup = useInputSelect("");
    const selectedPersonInCharge = useInputSelect("");
    // 検索結果
    const { contactDetailList, search, filter } = useContactList(props.initialContactDetailList);

    // 検索ボタン押下時の処理
    const handleSearchButtonClick = () => {
        search({
            contact: searchWordContact.value,
            client: searchWordClient.value,
        });
    };

    // 絞り込みボタン押下時の処理
    const handleFilterButtonClick = () => {
        filter({
            statuses: checkedStatuses.values,
            group: selectedGroup.value,
            personInCharge: selectedPersonInCharge.value,
        });
    };

    return (
        <div>
            <Header />
            <title>問合せ一覧</title>
            <main>
                <div className="contents">
                    <div className="sidebar">
                        <button>+ 新規問合せ</button>
                        <div className="filterBox">
                            <StatusCheckList handleFunc={checkedStatuses.onChange} />
                            <GroupSelect itemName="問合せ種別" handleFunc={selectedGroup.onChange} />
                            <UserSelect itemName="担当者" handleFunc={selectedPersonInCharge.onChange} />
                            <button onClick={handleFilterButtonClick}>絞り込み</button>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <h1>問合せ一覧</h1>
                            <div className="searchBox">
                                <input className="searchContact" type="text" placeholder="問合せ番号または件名（部分一致）" value={searchWordContact.value} onChange={searchWordContact.onChange}></input>
                                <input className="searchClient" type="text" placeholder="顧客名（部分一致）" value={searchWordClient.value} onChange={searchWordClient.onChange}></input>
                                <button className="searchButton" onClick={handleSearchButtonClick}>
                                    検索
                                </button>
                            </div>
                        </div>
                        <div className="searchList">
                            <table>
                                <thead>
                                    <tr>
                                        <th>問合せ番号</th>
                                        <th className="subject">件名</th>
                                        <th className="clientName">顧客名</th>
                                        <th>ステータス</th>
                                        <th className="personInCharge">担当者</th>
                                    </tr>
                                    {contactDetailList.map((contactDetail, index) => (
                                        <tr key={index}>
                                            <td>{contactDetail.number}</td>
                                            <td>{contactDetail.subject}</td>
                                            <td>{contactDetail.client_name}</td>
                                            <td>{contactDetail.status}</td>
                                            <td>{contactDetail.person_in_charge}</td>
                                        </tr>
                                    ))}
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// [メモ]asyncで、Promiseオブジェクトを返す関数にする
export const getServerSideProps: GetServerSideProps<ContactProps> = async () => {
    let contactDetailList: ContactDetail[] = [];
    try {
        contactDetailList = await fetchContactList(`${process.env.BASE_URL}/api/contactList`);
    } catch (error) {
        console.error("Failed to fetch data", error);
    }

    return {
        props: {
            initialContactDetailList: contactDetailList,
        },
    };
};

export default ContactPage;

