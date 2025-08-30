export default function BookRequestCard({ id, data }) {
  const { bookThumbnail, bookTitle, memberImage, memberName, requestDate } = data

  return (
    <article className="w-full h-[5rem] flex items-center justify-between bg-white rounded-lg px-4" key={id}>

      {/* Book Section */}
      <div className="flex items-center gap-3 w-[18rem]">
        <img
          className="w-10 h-14 object-cover rounded"
          src={bookThumbnail}
          alt="book"
        />
        <div className="flex flex-col max-w-[12rem]">
          <h4 className="text-sm font-semibold text-stone-800 truncate">
            {bookTitle}
            {/* <span className="font-normal text-stone-500">by George s. calson</span> */}
          </h4>
          <span className="text-xs text-stone-500 bg-stone-100 px-2 py-[2px] rounded">
            #4235532
          </span>
        </div>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-3 w-[14rem] pl-4">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={memberImage}
          alt="user"
        />
        <div className="flex flex-col">
          <h4 className="text-sm font-semibold text-stone-800">{memberName}</h4>
          <span className="text-xs text-stone-500 bg-stone-100 px-2 py-[2px] rounded">
            #321352
          </span>
        </div>
      </div>

      {/* Request Date */}
      <div className="flex flex-col items-start w-[10rem] border-l border-stone-300 pl-4">
        <span className="text-xs text-stone-500">Requested on</span>
        <span className="text-sm font-bold text-stone-800">{requestDate}</span>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 pl-4">
        <button className="px-3 py-1 text-sm font-medium text-green-600 bg-green-100 rounded hover:bg-green-200">
          Approve
        </button>
        <button className="px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded hover:bg-red-200">
          Deny
        </button>
      </div>
    </article>
  );
}
