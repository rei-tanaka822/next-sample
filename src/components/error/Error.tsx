import { Header } from "@/components/layouts/Header";

interface Props {
    errorMsg: string;
}
export const Error = (props: Props) => {
    const handleReload = () => {
        window.location.reload();
    };
    return (
        <main>
            <Header />
            <div>
                <h2 className="text-3xl font-bold m-4">Error!</h2>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
                    <pre className="error">{props.errorMsg}</pre>
                </div>
                <div className="m-4">
                    <button type="button" onClick={handleReload}>
                        再表示
                    </button>
                </div>
            </div>
        </main>
    );
};
