const form = document.querySelector("#postForm");
const title = document.querySelector("#title");
const content = document.querySelector("#content");



form.addEventListener("submit",writePost);


async function writePost(event) {
    event.preventDefault();

    const postData = {
        title: title.value,
        content: content.value,
        user: {
            name: sessionStorage.getItem("userName")
        }

    };

    if (postData.title.trim() === "" || postData.content.trim() === "") {
        alert("빈칸을 작성하세요");
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/user/post/post_form', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if(!response.ok){
            const errorText = await response.text();
            console.log(errorText);
            return;
        }

        const data = await response.text();
        alert(data);
        location.href = "/user";
    } catch(error){
        console.log(error);
    }
}