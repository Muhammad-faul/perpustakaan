import { LibraryController } from "./controllers/LibraryController.js";
import { BookForm } from "./views/BookForm.js";
import { BookList } from "./views/BookList.js";

// Inisialisasi komponen setelah seluruh elemen DOM dimuat
document.addEventListener("DOMContentLoaded", () => {
  const bookForm = new BookForm();
  const bookList = new BookList();
  const libraryController = new LibraryController(bookForm, bookList);

  // Inisialisasi tampilan form dan daftar buku
  bookForm.render(libraryController.addBook.bind(libraryController));
  bookList.render(
    libraryController.books,
    libraryController.deleteBook.bind(libraryController),
    libraryController.editBook.bind(libraryController)
  );

  // Inisialisasi tema saat aplikasi dimulai
  libraryController.initTheme();

  // Tambahkan event listener untuk toggle tema, jika elemen `theme-toggle` ada di DOM
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener(
      "click",
      libraryController.toggleTheme.bind(libraryController)
    );
  } else {
    console.warn("Element #theme-toggle tidak ditemukan di DOM.");
  }
});
