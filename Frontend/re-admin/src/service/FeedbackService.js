import axios from 'axios';

const FEEDBACK_API_BASE_URL = "http://localhost:8081/api/v1/feedback";

const getAllFeedbacks = () => {
    return axios.get(FEEDBACK_API_BASE_URL);
}

const getFeedbackById = (feedbackId) => {
    return axios.get(FEEDBACK_API_BASE_URL + '/' + feedbackId);
}

const answerFeedback = (feedback) => {
    return axios.post(FEEDBACK_API_BASE_URL + '/answer', feedback);
}

export {getAllFeedbacks, getFeedbackById, answerFeedback}