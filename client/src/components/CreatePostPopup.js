export function CreatePostPopup({ onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow flex flex-col w-1/2">
                <div className="border flex flex-row justify-between px-5 my-auto">
                    <h2 className="text-lg font-bold mb-4">Create New Post</h2>
                    <p className="text-lg font-bold mb-4">Share</p>
                </div>
                <p>Popup content goes here...</p>
                <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
