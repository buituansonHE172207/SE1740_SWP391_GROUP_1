import axios from "axios";

const API_URL = "http://localhost:8081/api/v1/feedback";

const getAllFeedback = () => {
    return axios.get(API_URL);
}

const getFeedbackById = (feedbackId) => {
    return axios.get(API_URL + `/${feedbackId}`);
}

const answerFeedback = (feedback) => {
    return axios.post(API_URL, feedback);
}

const getFeedbackByBookId = (bookId) => {
    return axios.get(`http://localhost:8081/api/v1/feedback/by-book?book=${bookId}&sortBy=id&page=0&size=10&sortOrder=asc`);
}

export {getAllFeedback, getFeedbackById, answerFeedback, getFeedbackByBookId}