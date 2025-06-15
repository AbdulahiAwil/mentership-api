
const posts = [
    {id: 1, name: "POS 1"},
    {id: 2, name: "POS 2"},
    {id: 3, name: "POS 3"},
    {id: 4, name: "POS 4"},

]

export const getPosts = (req, res) => {
    res.json(posts)
}

export const getPostsInfo = (req, res) => {

    const post = posts.find(p => p.id == req.params.id)
    if(!post) return res.status(404).send("User not Found");
     res.json(post)

}

