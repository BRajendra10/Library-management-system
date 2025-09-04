export default function BookRequestCard({ id, data }) {
  const { bookThumbnail, bookTitle, memberImage, memberName, requestDate } = data;

  return (
    <article
      key={id}
      className="w-full bg-white rounded-lg shadow-sm p-4 
                 flex flex-col gap-4 sm:grid sm:grid-cols-12 sm:gap-2"
    >
      {/* Book Section */}
      <div className="flex items-center gap-3 sm:col-span-4">
        <img
          className="w-12 h-16 object-cover rounded"
          src={bookThumbnail}
          alt={bookTitle}
        />
        <div className="flex flex-col overflow-hidden">
          <h4 className="text-sm font-semibold text-stone-800 truncate">
            {bookTitle}
          </h4>
          <span className="text-xs text-stone-500 bg-stone-100 px-2 py-[2px] rounded w-fit">
            #4235532
          </span>
        </div>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-3 sm:col-span-3">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={memberImage}
          alt={memberName}
        />
        <div className="flex flex-col">
          <h4 className="text-sm font-semibold text-stone-800 truncate">
            {memberName}
          </h4>
          <span className="text-xs text-stone-500 bg-stone-100 px-2 py-[2px] rounded w-fit">
            #321352
          </span>
        </div>
      </div>

      {/* Request Date */}
      <div className="flex flex-col justify-center sm:items-start sm:col-span-3 
                      border-t sm:border-t-0 sm:border-l border-stone-200 
                      pt-2 sm:pt-0 sm:pl-4">
        <span className="text-xs text-stone-500">Requested on</span>
        <span className="text-sm font-bold text-stone-800">{requestDate}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 sm:flex-col sm:col-span-2">
        <button className="flex-1 sm:flex-none px-3 py-1 text-sm font-medium text-green-600 bg-green-100 rounded hover:bg-green-200">
          Approve
        </button>
        <button className="flex-1 sm:flex-none px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded hover:bg-red-200">
          Deny
        </button>
      </div>
    </article>
  );
}
