// import  { useState } from 'react'

// const Feedback = () => {

//     const [isFeedback, setIsFeedback] = useState(false);
//     const [feedbackText, setFeedbackText] = useState('');
//     const [feedbackEmoji, setFeedbackEmoji] = useState(null)
//     const handleEmojiClick = (e: MouseEvent) => {
//         setFeedbackEmoji(e.target.value)
//        }
//        const sendFeedback = () => {
//         setIsFeedback(false)
//        }
//   return (
//     <div className="feedback-box h-fit z-50 w-72 bg-black absolute p-2 top-12 -left-20 rounded-md border-2 border-gray-500">
//               <textarea name="" id="" 
//                 value={feedbackText}
//                 onChange={(e) => setFeedbackText(e.currentTarget.value)}
//                 placeholder="Your feedback..."
//                 className="feedback-box h-28 w-full text-white p-2 bg-transparent outline-none none border-2 border-gray-200 rounded-md no-underline" 
//               ></textarea>
//               <div className="feedback-box flex justify-between pt-3">
//               <div
//                 className="feedback-box flex text-2xl gap-1 px-1 cursor-pointer items-center"
//               >
//                 <option onClick={handleEmojiClick} value={1}
//                   className={`feedback-box ${feedbackEmoji == 1 ? 'border-2 border-green-500 h-fit w-fit rounded-full' : ''}`}
//                 >😄</option>
//                 <option onClick={handleEmojiClick} value={2}
//                   className={`feedback-box ${feedbackEmoji == 2 ? 'border-2 border-blue-500 h-fit w-fit rounded-full' : ''}`}
//                 >😊</option>
//                 <option onClick={handleEmojiClick} value={3}
//                  className={`feedback-box ${feedbackEmoji == 3 ? 'border-2 border-yellow-500 h-fit w-fit rounded-full' : ''}`}
//                 >😗</option>
//                 <option onClick={handleEmojiClick} value={4}
//                  className={`feedback-box ${feedbackEmoji == 4 ? 'border-2 border-orange-500 h-fit w-fit rounded-full' : ''}`}
//                 >😑</option>
//                 <option onClick={handleEmojiClick} value={5}
//                  className={`feedback-box ${feedbackEmoji == 5 ? 'border-2 border-red-600 h-fit w-fit rounded-full' : ''}`}
//                 >😞</option>
//               </div>
                
//                  <button
//                   onClick={sendFeedback}
//                   className="px-4 py-[6px] align-middle hover:border-gray-200 border-2 border-gray-500 rounded-lg"
//                  >send</button>  
                     
//               </div>
//             </div>
//   )
// }

// export default Feedback