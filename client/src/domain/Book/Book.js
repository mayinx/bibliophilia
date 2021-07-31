import "./Book.css";
import { Link } from "react-router-dom";

// TODO: Move that beauty here somewhere generic - dunno: 'src/Utils' f.i. - or iplemen it as useConditionalWrapper-custom hook or whatnot?
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

export default function Book({ book, as }) {
  console.log("book!: ", book);
  const renderAsListItem = as && as === "ListItem";

  return (
    <section
      className={`Resource Book Book--${book.isRead ? "read" : "unread"} ${
        renderAsListItem && "Resource__ListItem Book__ListItem"
      }`}
      key={book.id}
      id={book.id}
    >
      <ConditionalWrapper
        condition={renderAsListItem}
        wrapper={(children) => (
          <Link to={`/books/${book._id}`}>{children}</Link>
        )}
      >
        <p className="book__avatar-wrapper">
          <img src={book.image} className="Book__Avatar" alt="" />
        </p>
        <div className="book__meta">
          <h2>{book.title}</h2>
          <div>Book ID {book.id}</div>
          <div>Author: {book.author}</div>
          <div>Genre: {book.genre}</div>
          <div>
            Read:{" "}
            {book.isRead
              ? "Yep! Read And Proud!"
              : "Nope - still on my Bucket List!"}
          </div>
        </div>
      </ConditionalWrapper>
    </section>
  );
}
