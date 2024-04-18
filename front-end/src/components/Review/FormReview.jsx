import React from "react";

export default function FormReview({ text, comment, setComment, handlePost }) {
  return (
    <form onSubmit={handlePost} className='w-full'>
      <input
        type='text'
        placeholder={`${
          text === "reply" ? "Reply ..." : "Write comments here ..."
        }`}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        className='w-full py-2 px-2 outline-none placeholder:text-black text-black bg-white'
      />
      <button
        type='submit'
        className='py-1 w-full bg-main-red flex px-3 justify-center'
      >
        <span>{text === "reply" ? "Reply" : "Post"}</span>
      </button>
    </form>
  );
}
