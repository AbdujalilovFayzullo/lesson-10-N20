const form = document.querySelector(".form")

const box = document.querySelector(".box")

async function createPost() {
    const inputTitle = document.querySelector(".inputTitle").value
    const body = document.getElementById("body").value


    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            inputTitle, body, userID: 1
        })
    })

    if(response.ok){
        const newPost = await response.json();

        const postElement = document.createElement('div');
        postElement.innerHTML = `
        <h2>${newPost.inputTitle}</h2>
        <p>${newPost.body}</p>
        `
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'DELETE'
        postElement.appendChild(deleteButton)
        box.appendChild(postElement)
        form.reset()

        deleteButton.addEventListener('click', () => {
            deletePost(newPost.id, postElement)
        })


    }
}


async function deletePost(postID, postElement) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`,{
        method: 'DELETE'
    });

    if(response.ok) {
        box.removeChild(postElement);
    }else {
        console.log(`${postID} xatolik ro'y berdi`)
    }


}


form.addEventListener('submit', ((e) => {
    e.preventDefault()
    createPost()
}))