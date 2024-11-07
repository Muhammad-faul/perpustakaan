import { Book } from "./models/Book.js";
import { showAlert } from "./utils/alert.js";

export class LibraryController {
  constructor(bookForm, bookList) {
    this.bookForm = bookForm;
    this.bookList = bookList;
    this.books = [];
    this.loadBooks();
    this.saveAndRender(); // Memastikan data awal langsung ditampilkan
  }

  loadBooks() {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    this.books = storedBooks;
  }

  addBook(bookData) {
    const newBook = new Book(
      Date.now(), // ID unik berbasis timestamp
      bookData.title,
      bookData.author,
      bookData.year
    );
    this.books.push(newBook);
    this.saveAndRender();
    showAlert("success", "Buku berhasil ditambahkan!");
  }

  editBook(id) {
    id = parseInt(id);
    const book = this.books.find((b) => b.id === id);

    if (book) {
      this.bookForm.render((updatedBook) => {
        const index = this.books.findIndex((b) => b.id === id);
        this.books[index] = { ...updatedBook, id };
        this.saveAndRender();
        showAlert("success", "Buku berhasil diperbarui!");
      });
      
      // Isi form dengan data buku yang akan diedit
      this.bookForm.fillForm(book);
    }
  }

  deleteBook(id) {
    id = parseInt(id);
    this.books = this.books.filter((b) => b.id !== id);
    this.saveAndRender();
    showAlert("warning", "Buku berhasil dihapus!");
  }

  saveAndRender() {
    localStorage.setItem("books", JSON.stringify(this.books));
    if (this.bookList) {
      this.bookList.render(
        this.books,
        this.deleteBook.bind(this),
        this.editBook.bind(this)
      );
    }
  }

  toggleTheme() {
    const currentTheme = document.body.classList.contains("theme-dark")
      ? "dark"
      : "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.body.classList.toggle("theme-dark", newTheme === "dark");
    document.body.classList.toggle("theme-light", newTheme === "light");

    localStorage.setItem("theme", newTheme);
    this.updateThemeIcon();
  }

  updateThemeIcon() {
    const themeIcon = document.getElementById("theme-icon");
    const isDarkTheme = document.body.classList.contains("theme-dark");
    if (themeIcon) {
      themeIcon.classList.toggle("bi-sun-fill", isDarkTheme);
      themeIcon.classList.toggle("bi-moon-fill", !isDarkTheme);
    }
  }

  initTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("theme-dark", savedTheme === "dark");
    document.body.classList.toggle("theme-light", savedTheme === "light");
    this.updateThemeIcon();
  }
}
