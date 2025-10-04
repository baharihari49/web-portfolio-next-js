// components/blog/CommentsSection.tsx
// import React, { useState } from 'react';
// import Image from 'next/image';
// import { CommentType } from './types/blog';

interface CommentsSectionProps {
  postId: string;
  commentCount: number;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ commentCount }) => {
  // Keep the state variables but comment them out for future use
  /*
  const [comments, setComments] = useState<CommentType[]>([
    {
      id: '1',
      author: 'Michael Anderson',
      avatar: '/images/avatar/user-1.jpg',
      date: '3 days ago',
      content: `This article was incredibly helpful! I've been struggling with configuring Webpack properly, and your section on build tools cleared up a lot of my confusion. Looking forward to more content like this.`,
      replies: [
        {
          id: '2',
          author: 'Somalia D. Silva',
          avatar: '/images/avatar/author-1.jpg',
          date: '2 days ago',
          content: `Thanks Michael! I'm glad you found it helpful. I'll be covering more advanced Webpack configurations in a future article.`
        }
      ]
    },
    {
      id: '3',
      author: 'Jennifer Lee',
      avatar: '/images/avatar/user-2.jpg',
      date: '5 days ago',
      content: `Great overview of terminal tools! I would also recommend adding Fig to the list for terminal autocomplete. It's been a game-changer for my workflow.`,
      replies: []
    }
  ]);
  
  const [newComment, setNewComment] = useState<string>('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string>('');
  
  const handleSubmitComment = (e: React.FormEvent): void => {
    e.preventDefault();
    if (newComment.trim() === '') return;
    
    const newCommentObj: CommentType = {
      id: `comment-${Date.now()}`,
      author: 'Guest User',
      avatar: '/images/avatar/default.jpg',
      date: 'Just now',
      content: newComment,
      replies: []
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };
  
  const handleSubmitReply = (commentId: string, e: React.FormEvent): void => {
    e.preventDefault();
    if (replyContent.trim() === '') return;
    
    const newReply: CommentType = {
      id: `reply-${Date.now()}`,
      author: 'Guest User',
      avatar: '/images/avatar/default.jpg',
      date: 'Just now',
      content: replyContent
    };
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setReplyContent('');
    setReplyTo(null);
  };
  
  const toggleReplyForm = (commentId: string): void => {
    if (replyTo === commentId) {
      setReplyTo(null);
    } else {
      setReplyTo(commentId);
      setReplyContent('');
    }
  };
  */

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 mb-10 animate-on-scroll opacity-0">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Comments <span className="text-blue-600">({commentCount})</span>
      </h3>
      
      <div className="text-center py-10 bg-gray-50 rounded-lg">
        {commentCount === 0 ? (
          <>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 mx-auto mb-4 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">No Comments Yet</h4>
            <p className="text-gray-600 mb-6">Be the first to share your thoughts about this article!</p>
          </>
        ) : (
          <>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 mx-auto mb-4 text-blue-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Comments Available</h4>
            <p className="text-gray-600 mb-6">There are {commentCount} comments on this article.</p>
          </>
        )}
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 max-w-xl mx-auto">
          <h5 className="font-semibold text-blue-700 mb-2">Comments Feature Coming Soon!</h5>
          <p className="text-gray-700">
          {`  We're working on an exciting new commenting system that will allow you to engage with our content and other readers.
            Stay tuned for updates!`}
          </p>
          <div className="mt-6 flex justify-center">
            <button
              disabled
              className="px-6 py-2 bg-blue-600 text-white rounded-full opacity-75 cursor-not-allowed flex items-center"
            >
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Comments Feature Under Development
            </button>
          </div>
        </div>
      </div>
      
      {/* Optional: Email notification sign-up */}
      {/* <div className="mt-8 border-t border-gray-100 pt-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Get Notified When Comments Launch</h4>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Notify Me
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          We'll let you know when our commenting system is ready. No spam, promise!
        </p>
      </div> */}

      {/* Comment listing and form - commented out for future use */}
      {/*
      {comments.length > 0 ? (
        <div className="space-y-8 mb-8">
          {comments.map(comment => (
            <div key={comment.id} className="border-b border-gray-100 pb-8 last:border-0">
              <div className="flex">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 mr-4">
                  <Image
                    src={comment.avatar}
                    alt={comment.author}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{comment.author}</h4>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-gray-600 mb-3">{comment.content}</p>
                  <button
                    onClick={() => toggleReplyForm(comment.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                  >
                    Reply
                  </button>
                  
                  {replyTo === comment.id && (
                    <form 
                      onSubmit={(e) => handleSubmitReply(comment.id, e)}
                      className="mt-4 mb-6"
                    >
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                        placeholder="Write your reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        required
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          type="button"
                          onClick={() => setReplyTo(null)}
                          className="px-4 py-2 text-gray-600 mr-2 hover:text-gray-800 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                        >
                          Reply
                        </button>
                      </div>
                    </form>
                  )}
                  
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-6 space-y-6 pl-6 border-l-2 border-gray-100">
                      {comment.replies.map(reply => (
                        <div key={reply.id} className="flex">
                          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 mr-3">
                            <Image
                              src={reply.avatar}
                              alt={reply.author}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap justify-between mb-2">
                              <h4 className="font-semibold text-gray-800">{reply.author}</h4>
                              <span className="text-sm text-gray-500">{reply.date}</span>
                            </div>
                            <p className="text-gray-600">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        </div>
      )}
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Leave a Comment</h4>
        <form onSubmit={handleSubmitComment}>
          <div className="mb-4">
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={5}
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Your Name *"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="email"
              placeholder="Your Email *"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="text"
              placeholder="Your Website"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="save-info"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="save-info" className="ml-2 text-gray-600">
              Save my name, email, and website in this browser for the next time I comment.
            </label>
          </div>
          
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Post Comment
          </button>
        </form>
      </div>
      */}
    </div>
  );
};

export default CommentsSection;