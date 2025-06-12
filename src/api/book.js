import axios from "axios";
const API_URL = "https://crudcrud.com/api/7a87f7131a63492b82d8f548fe3739f2/books";

export const fetchBooks = async () => {
    const response = await axios.get(API_URL)
    // console.log(response.data, "amit")
    return response.data;

}

export const addBook = async (book) => {
    const response = await axios.post(API_URL, book)
    return response.data;
}

export const deleteBook = async (_id) => {
    const response = await axios.delete(`${API_URL}/${_id}`)
    return response.data;
}

export const updateBook = async (book,_id) => {
    const response = await axios.put(`${API_URL}/${_id}`, book)
    return response.data;
}