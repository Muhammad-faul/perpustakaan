document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const bookList = document.getElementById("book-list-ul");
  
    // Debugging: Cek apakah elemen ditemukan
    console.log(bookList); // Pastikan ini tidak null
  
    if (!bookList) {
      console.error("Elemen daftar buku tidak ditemukan.");
      return;
    }
  
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const books = JSON.parse(localStorage.getItem("books")) || [];
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
      );
  
      bookList.innerHTML = ""; // Clear current book list
  
      if (filteredBooks.length === 0) {
        bookList.innerHTML = "<li class='list-group-item'>Buku tidak ditemukan.</li>";
        return;
      }
  
      filteredBooks.forEach((book) => {
        const bookItem = document.createElement("li");
        bookItem.classList.add("list-group-item");
        bookItem.innerHTML = `
          <strong>${book.title}</strong> oleh ${book.author} <br />
          <small>Kategori: ${book.category || "Tidak ada kategori"}</small><br />
          <p>${book.description || "Tidak ada deskripsi"}</p>
        `;
        bookList.appendChild(bookItem);
      });
    });
  });
  