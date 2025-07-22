"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('/api/feedback');
        setFeedbackList(response.data);
      } catch (error) {
        toast.error('Failed to fetch feedback');
        console.error('Failed to fetch feedback', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this feedback?')) {
      try {
        await axios.delete('/api/feedback', { data: { id } });
        setFeedbackList(feedbackList.filter(f => f._id !== id));
        toast.success('Feedback deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete feedback');
        console.error('Failed to delete feedback', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Feedback Submissions</h1>
      <div className="space-y-4">
        {feedbackList.map(feedback => (
          <div key={feedback._id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold">{feedback.name} <span className="text-sm text-gray-500">({feedback.email})</span></p>
                <p className="text-yellow-500">{'★'.repeat(feedback.rating)}{'☆'.repeat(5 - feedback.rating)}</p>
                <p className="mt-2">{feedback.feedback}</p>
                <p className="text-sm text-gray-500 mt-1">Category: {feedback.category}</p>
              </div>
              <button onClick={() => handleDelete(feedback._id)} className="text-red-600 hover:text-red-900">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage; 