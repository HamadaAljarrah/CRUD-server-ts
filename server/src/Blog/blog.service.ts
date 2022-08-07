import Blog from "./blog.model"
import { IBlog } from "./blog.interface"
import { MongoId } from "../Common/services/mongoose.services"
import { ICheckResponse } from "../Common/interfaces"


export const fetchBlogs = async (): Promise<Array<IBlog>> => {
    const blogs: Array<IBlog> = await Blog.find()
    return blogs
}


export const getBlog = async (id: MongoId): Promise<IBlog | null> => {
    return await Blog.findById(id)
}


export const validateBlogContent = (data: Omit<IBlog, "date">): ICheckResponse => {

    const { title, snippet, content, auther, category } = data
    if (!(title && snippet && content && auther && category)) {
        return {
            status: 400,
            success: false,
            message: "All fields required"
        }
    }



    return {
        status: 200,
        success: true,
        message: "Valid content"
    }
}


export const calcReadTime = (content: string): number => {
    const wpm = 150;
    const numOfWords = content.trim().split(/\s+/).length
    const readTime = numOfWords / wpm;
    return readTime
}

export const getCurrentTime = (): string => {
    return new Date()
        .toLocaleDateString("sv-SE", {
            minute: '2-digit',
            hour: '2-digit',
            second: '2-digit'
        })
}

export const createNewBlog =
    async (data: Omit<IBlog, "createAt" | "readTime">, readTime: number, createAt: string)
        : Promise<IBlog> => {
        const newBlog = new Blog({
            title: data.title,
            snippet: data.snippet,
            content: data.content,
            auther: data.auther,
            category: data.category,
            readTime: readTime,
            createAt: createAt,
        })

        await newBlog.save();
        return newBlog
    }


export const updateBlog = async (id: MongoId, updated: Omit<IBlog, "createAt">): Promise<void> => {
    await Blog.findOneAndUpdate(id, updated);
}

export const removeBlog = async (id: MongoId): Promise<void> => {
    await Blog.findOneAndDelete(id);
}