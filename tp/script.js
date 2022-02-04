var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let Users;
let Posts;
document.addEventListener("DOMContentLoaded", () => __awaiter(this, void 0, void 0, function* () {
    const reponseUsers = yield fetch("https://jsonplaceholder.typicode.com/users");
    const Users = (yield reponseUsers.json());
    const reponsePosts = yield fetch("https://jsonplaceholder.typicode.com/posts");
    const Posts = (yield reponsePosts.json());
    render(Users, Posts);
    document.querySelector("#filter").addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.querySelector("#titre");
        const author = document.querySelector("#auteur");
        const listUserFiltre = Users.filter(user => { var _a; return (_a = user.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(author.value.toLowerCase()); });
        const listPostFiltre = Posts.filter(article => { var _a; return (_a = article.title) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(title.value.toLowerCase()); });
        render(listUserFiltre, listPostFiltre);
    });
}));
function render(Users, Posts) {
    let html = "";
    Users.forEach(user => {
        const UserArticle = Posts.filter((post) => post.userId === user.id);
        html += `
			<div class="col-md-4">
				<h2 class="text-primary">${user.name}</h2>
				<p>${user.email}</p>

				<div>
					<h3 class="text-warning">Titre des articles rédigés</h3>
					<ul>`;
        UserArticle.forEach(article => {
            html += `<li>${article.title}</li>`;
        });
        html += `</ul></div></div>`;
        document.querySelector("main").innerHTML = html;
    });
}
