const getPostsByUserId = (id) => fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    .then(value => value.json());
const start = async () => {
    const url = new URL(location.href);
    const userId = url.searchParams.get('userId');
    const posts = await getPostsByUserId(+userId);
    const postContainerDiv = document.querySelector('#postContainer');
    posts.forEach(post => {
        const postItemDiv = document.createElement('div');
        postItemDiv.innerText = `${post.id}) userId: ${post.userId} -- ${post.title}`;
        postContainerDiv.appendChild(postItemDiv);
    });
};
start();
//# sourceMappingURL=posts.js.map