import React from 'react'
import BlogCard from '../../components/BlogCard/BlogCard'
import { BlogInfo } from '../../components/BlogCard/BlogCard'
import { SERVER_URL } from '../../variables'
import classes from "./blogs.module.scss"
import { useTheme } from '../../context/them.context'
import { Protected } from '../../components/Protected/Protected'


const Blogs = ({ blogs }: any) => {
    const { theme } = useTheme()
    return (
        <Protected>
            <div className={`${classes.wrapper} ${classes[theme]}`}>
                <h1>Blogs</h1>
                {blogs ? blogs.map((blog: BlogInfo) => {
                    return <BlogCard
                        key={blog._id}
                        title={blog.title}
                        snippet={blog.snippet}
                        category={blog.category}
                        auther={blog.auther}
                        createAt={(blog.createAt).split(" ")[0]}
                        readTime={Math.round(blog.readTime)}
                        _id={blog._id}
                    />
                }) :
                    <p>No blogs yet</p>}
            </div>
        </Protected>
    )
}

export default Blogs

export async function getStaticProps() {
    const response = await fetch(SERVER_URL + "/blogs")
    const result = await response.json()
    const { data } = result
    return {
        props: {
            blogs: data || null
        }
    }
} 