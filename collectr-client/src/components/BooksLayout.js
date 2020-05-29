import React from 'react';
import GridLayout from 'react-grid-layout';
import '../GridLayout.css'

class BooksLayout extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			bookSearchResults: [],
		};
	}

	componentDidMount() {

		this.props.getUsersBooksFromDb().then((value) => {
			this.setState({
				bookSearchResults: value
			});
		}, (err) => {
			console.log(err);
		});

	}
	async getBooksFromDb() {

		var bookResults = [];
		await this.props.getUsersBooksFromDb().then(result => {
			//console.log("result: " + result);
			bookResults = result;
		})
			.catch(err => {
				console.log(err.response);
			});

		return bookResults;
	}

	render() {

		var layouts = [];
		var y = 2;
		var x = 5;

		if (this.props.isHomePage === true) {

			var usersBooks = this.state.bookSearchResults;
			console.log("books: " + JSON.stringify(usersBooks));


			//alert("Before: " + (typeof this.props.bookSearchResults[0]));
			var j = 0;
			for (let i = 0; i < (Object.keys(usersBooks).length); i += 1) {
				const idOne = Math.random().toString(36).slice(2);

				if ((i % 2 === 0) && i !== 0) {

					y += 9;
					x = 5;
				}

				//var url = usersBooks.data[j].img_url;
				//parse up the chain


				if (j < usersBooks.data.length) {
					layouts.push({ i: idOne, x: x, y: y, w: 3.0, h: 8, static: true, img: usersBooks.data[j].img_url, isbn: usersBooks.data[j].isbn, title: usersBooks.data[j].title, author: usersBooks.data[j].author, checked: true });
					x += 4;
					++j;
				}

			}
		}
		else {

			//alert("Before: " + (typeof this.props.bookSearchResults[0]));
			for (let i = 0; i < (Object.keys(this.props.bookSearchResults).length); i += 1) {
				const idOne = Math.random().toString(36).slice(2);

				if ((i % 2 === 0) && i !== 0) {
					y += 9;
					x = 5;
				}

				var imgArray = this.props.getParsedImgUrl(i);
				var book = this.props.getTitle(i);
				var author = this.props.getAuthor(i);
				if (imgArray !== "0") {
					var str = imgArray;
					var res = str.replace("-S", "-M");
					imgArray = res;
				}

				console.log(imgArray);
				//parse up the chain	
				layouts.push({ i: idOne, x: x, y: y, w: 3.0, h: 8, static: true, img: imgArray, isbn: this.props.isbns[i], title: book, author: author, checked: false });
				x += 4;
			}
		}

		const layoutsArray = Array.from(layouts);

		return (
			<GridLayout className="layout" layout={layouts} cols={12} rowHeight={30} width={1200}>

				{
					layoutsArray.map((item, index) => (
						<div key={item.i} > <img id="bookImage" alt="Book cover" src={item.img} onError={(e) => { e.target.onerror = null; e.target.src = "../NoImage.png" }} />
							<div id="title"> Title: {item.title} </div>
							<div id="title"> Author: {item.author} </div>
							<div id="title"> {item.isbn} </div>
							<div className="center">
								<label className="label">
									<input className="label__checkbox" type="checkbox" onChange={() => this.props.addBookToDb(item)} />
									<span className="label__text">
										<span className="label__check">
											<i className="fa fa-check icon"></i>
										</span>
									</span>
								</label>
							</div>

						</div>
					))
				}




			</GridLayout>
		)

	}
}

export default BooksLayout