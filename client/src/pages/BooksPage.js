import BookList from "../domain/Book/BookList.js";

export default function BooksPage() {
  return (
    <div className="App__Page App__ResourcesPage">
      <h1 className="App__Page__Head">Rick 'n Morty Books</h1>
      <BookList />
    </div>
  );
}
