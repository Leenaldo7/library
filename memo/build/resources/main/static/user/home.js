const header = document.querySelector(".header");
const userName = sessionStorage.getItem("userName");
const headerBtn = document.querySelector(".header_btn");

(load)();


const writeBtn = document.querySelector(".writeBtn");
const search = document.querySelector(".search")

headerBtn.addEventListener("click",(e)=>{

    switch (e.target.className) {
        case "logoutBtn":
            sessionStorage.removeItem("userName");
            window.location.replace("/");
            return;

        case "userInformationBtn":
            loadUserData().then( ()=>{})

    }

})

writeBtn.addEventListener("click",(e)=>{
    window.location.replace('/user/post');
})

search.addEventListener("input", (e) => {
    const search_data = e.target.value.toLowerCase();
    const postRows = document.querySelectorAll('.postContainer tr');

    postRows.forEach((postRow) => {
        const postTitle = postRow.querySelector('td:nth-child(2) div').innerText.toLowerCase();

        if (postTitle.indexOf(search_data) === -1) {
            postRow.style.display = 'none';
        } else {
            postRow.style.display = ''; //
        }
    });
});


document.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtn")) {
        const postId = e.target.closest("tr").querySelector("td:nth-child(1) div").textContent;
        const postName = e.target.closest("tr").querySelector("td:nth-child(4) div").textContent;

        if(postName !== userName){
            alert("다른 사람의 글은 삭제할 수 없습니다");
        } else{
            deletePost(postId);
        }

    }
});







function load(){
    if(userName === null){
        window.location.replace('/');
    } else{
        const p = document.createElement("p");
        p.setAttribute("class", "name_p");
        p.innerText = userName+"님 환영합니다!";
        header.insertBefore(p,headerBtn);
        loadPost();
    }
}


async function loadPost() {
    try {
        const response = await fetch('/api/posts');

        if (!response.ok) {
            const errorText = await response.text();
            alert(errorText);
            return;
        }

        const data = await response.text();

        const postsContainer = document.querySelector('.postContainer');

        const posts = JSON.parse(data);


        posts.forEach(post => {
            const postElement = document.createElement('tr');
            postElement.innerHTML = `
                <td><div>${post.id}</div></td>
                <td><div>${post.title}</div></td>
                <td><div>${post.content}</div></td>
                <td class="userName"><div>${post.userName}</td>
                <td><div>${post.createdAt}</div></td>
                <button class="deleteBtn">삭제</button>
            
            `;
            postsContainer.appendChild(postElement);
        });

    } catch (error) {
        console.log(error);
    }
}

async function loadUserData(){
    const userData = {
        name : userName
    };

    try{
        const response = await fetch('http://localhost:8080/user/information', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(userData)
        });

        if(!response.ok){
            const errorText = await response.text();
            console.log(errorText);
            return;
        }

        const data = await response.text();
        sessionStorage.setItem("userInformation", data);
        location.href = "/user/profile";

    } catch(e){
        console.log("에러띠");
    }
}

async function deletePost(postId) {
    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            const errorText = await response.text();
            alert(errorText);
            return;
        }
        location.reload();
    } catch (error) {
        console.error(error);
    }
}