import { FallbackProps } from "react-error-boundary";
import { Header } from "@/components/layouts/Header";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <main>
            <Header />
            <div>
                <h2 className="text-3xl font-bold m-4">Error!</h2>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
                    <pre className="error">{error.message}</pre>
                </div>
                <div className="m-4">
                    <button type="button" onClick={resetErrorBoundary}>
                        再表示
                    </button>
                </div>
            </div>
        </main>
    );
}
export default ErrorFallback;
