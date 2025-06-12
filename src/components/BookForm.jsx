import React,{useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { addBook, updateBook } from '../api/book';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const BookForm = ({ onClose, isOpen, book }) => {
    const queryClient = useQueryClient();
    const { register, handleSubmit,setValue, reset, formState: { errors } } = useForm()
    useEffect(() => {
        if (book) {
            setValue('title', book.title);
            setValue('author', book.author);
            setValue('genre', book.genre);
            setValue('publishedYear', book.publishedYear);
            setValue('status', book.status);
        } else {
            reset({
                title: '',
                author: '',
                genre: '',
                publishedYear: '',
                status: 'Available'
            });
        }
    }, [book, setValue, reset]);


    const addMutation = useMutation({
        mutationFn: addBook,
        onSuccess: () => {
            queryClient.invalidateQueries(['books'])
            toast.success("Books added sucessfully")
            onClose();
            reset();
        },
        onError: () => {
            toast.error("Error while adding book")
        }
    })
    const updateMutation = useMutation({
        mutationFn: (data) => updateBook(data, book.id),
        onSuccess: () => {
            queryClient.invalidateQueries(['books'])
            toast.success("Books updated sucessfully")
            onClose();
        },
        onError: () => {
            toast.error("Error while updating book")
        }
    })
    const onSubmit = (data) => {
        if (book) {
            updateMutation.mutate(data)
        }
        else {
            addMutation.mutate(data)
        }
    }
    if (!isOpen) return null;
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{book ? "Edit Book" : "Add New Book"}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className='block text-gray-700 mb-2'>Title</label>
                        <input className="w-full px-3 py-2 border rounded" {...register('title', { required: 'Title is required' })} />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                        )}

                    </div>
                    <div className="mb-4">
                        <label className='block text-gray-700 mb-2'>Author</label>
                        <input className="w-full px-3 py-2 border rounded" {...register('author', { required: 'Author is required' })} />
                        {errors.author && (
                            <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className='block text-gray-700 mb-2'>Genre</label>
                        <select {...register('genre', { required: 'Genre is required' })} className="w-full px-3 py-2 border rounded">

                            <option value="">Select Genre</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Non-Fiction">Non-Fiction</option>
                            <option value="Science Fiction">Science Fiction</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Romance">Romance</option>
                            <option value="Classic">Classic</option>
                            <option value="Dystopian">Dystopian</option>
                            <option value="Biography">Biography</option>
                        </select>
                        {errors.genre && (
                            <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className='block text-gray-700 mb-2'>Published Year</label>
                        <input type='number' className="w-full px-3 py-2 border rounded" {...register('publishedYear', {
                            required: 'Published year is required',
                            min: {
                                value: 1000,
                                message: 'Year must be valid'
                            },
                            max: {
                                value: new Date().getFullYear(),
                                message: `Year can't be in the future`
                            }
                        })} />
                        {errors.publishedYear && (
                            <p className="text-red-500 text-sm mt-1">{errors.publishedYear.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className='block text-gray-700 mb-2'>Status</label>
                        <select {...register('status')} className="w-full px-3 py-2 border rounded">
                            <option value="Available">Available</option>
                            <option value="Issued">Issued</option>
                        </select>

                    </div>
                    <div className="flex justify-end space-x-3">
                        <button className="px-4 py-2 border rounded" type='button' onClick={() => {
                            onClose()
                            reset();
                        }}>Cancel</button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" type='submit' disabled={addMutation.isLoading || updateMutation.isLoading}>{addMutation.isLoading || updateMutation.isLoading ? "Saving" : "Save"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BookForm