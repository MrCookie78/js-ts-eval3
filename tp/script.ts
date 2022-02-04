interface Users {
	id : number ,
	name : string ,
	email : string
}

interface Posts {
	userId: number,
	title: string
}

let Users : any ; 
let Posts : any ; 

document.addEventListener("DOMContentLoaded", async () => {
	const reponseUsers = await fetch("https://jsonplaceholder.typicode.com/users") 
	const Users = (await reponseUsers.json()) as Array<Partial<Users>>;

	const reponsePosts = await fetch("https://jsonplaceholder.typicode.com/posts") 
	const Posts = (await reponsePosts.json()) as Array<Partial<Posts>>;
	
	render(Users, Posts);

	(document.querySelector("#filter") as HTMLFormElement).addEventListener("submit" , (e : Event) => {
		e.preventDefault()
		const title = document.querySelector("#titre") as HTMLInputElement ;
		const author = document.querySelector("#auteur") as HTMLSelectElement ;

		const listUserFiltre = Users.filter( user =>  user.name?.toLowerCase().includes(author.value.toLowerCase()));
		const listPostFiltre = Posts.filter( article => article.title?.toLowerCase().includes(title.value.toLowerCase()));
		
		render(listUserFiltre, listPostFiltre);
	})
})

function render(Users: Array<Partial<Users>>, Posts: Array<Partial<Posts>>){
	
	let html = "";
	Users.forEach( user => {
		const UserArticle = Posts.filter((post) => post.userId === user.id);
		html += `
			<div class="col-md-4">
				<h2 class="text-primary">${user.name}</h2>
				<p>${user.email}</p>

				<div>
					<h3 class="text-warning">Titre des articles rédigés</h3>
					<ul>`;
					UserArticle.forEach( article => {
						html += `<li>${article.title}</li>`;
					})
					html += `</ul></div></div>`;
		
		document.querySelector("main").innerHTML = html
	})
}