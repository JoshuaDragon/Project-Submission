import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";


// Retrieved elements from the DOM using query Selectors
const dataHeaderSearch = document.querySelector('[data-header-search]')
const dataHeaderSettings = document.querySelector('[data-header-settings]')
const dataListItems = document.querySelector('[data-list-items]')
const dataListMessage = document.querySelector('[data-list-message]')
const dataListButton = document.querySelector('[data-list-button]')
const dataListActive = document.querySelector('[data-list-active]')
const dataListBlur = document.querySelector('[data-list-blur]')
const dataListImage = document.querySelector('[data-list-image]')
const dataListTitle = document.querySelector('[data-list-title]')
const dataListSubtitle = document.querySelector('[data-list-subtitle]')
const dataListDescription = document.querySelector('[data-list-description]')
const dataListClose = document.querySelector('[data-list-close]')
const dataSearchOverlay = document.querySelector('[data-search-overlay]')
const dataSearchForm = document.querySelector('[data-search-form]')
const dataSearchTitle = document.querySelector('[data-search-title]')
const dataSearchGenres = document.querySelector('[data-search-genres]')
const dataSearchAuthors = document.querySelector('[data-search-authors]')
const dataSearchCancel = document.querySelector('[data-search-cancel]')
const dataSettingsOverlay = document.querySelector('[data-settings-overlay]')
const dataSettingsForm = document.querySelector('[data-settings-form]')
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const dataSettingsCancel = document.querySelector('[data-settings-cancel]')

// displays the first 36 books of array and sets page number to 0
let matches = books
let page = 1;     //used to keep track of current page of book reviews being displayed
const range = [0, BOOKS_PER_PAGE]  

// Checks if books is not empty/undefined, and if it is an array.
if (!books && !Array.isArray(books)) {
    throw new Error('Source required')
}

if (!range && range.length === 2) {
    throw new Error('Range must be an array with two numbers')
}

// The createPreview() function takes a book preview object and returns 
// a button element (showPreview) containing the book preview information in HTML form
function createPreview(preview) {
    const { author: authorId, id, image, title } = preview

    const showPreview = document.createElement('button')
    showPreview.classList = 'preview'
    showPreview.setAttribute('data-preview', id)
    
    // A template literate is used to create an html preview of the book.
    showPreview.innerHTML = /* html */ `
        <img
            class="preview__image"
            src="${image}"
        />

        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[authorId]}</div>
        </div>
    `

    return showPreview
}

const startIndex = (page - 1) * BOOKS_PER_PAGE
const endIndex = startIndex + BOOKS_PER_PAGE

const bookFragment = document.createDocumentFragment()
const bookExtracted = books.slice(startIndex, endIndex)

// loop iterates over the book previews to display on current page 
for (const preview of bookExtracted) {
    // creates a book preview button using the createPreview function
    const showPreview = createPreview(preview)
    bookFragment.appendChild(showPreview)
}

// appends the button to the bookFragment container
dataListItems.appendChild(bookFragment)

//This sets up a click event listener for the "Show More" button. When clicked, the code executes the logic to display the next set of book previews.
dataListButton.addEventListener('click', () => {
    page++;

    const newStartIndex = (page - 1) * BOOKS_PER_PAGE
    const newEndIndex = newStartIndex + BOOKS_PER_PAGE

    const newBookExtracted = books.slice(newStartIndex, newEndIndex)

    const newBookFragment = document.createDocumentFragment()

    for (const preview of newBookExtracted) {
        const showPreview = createPreview(preview)
        newBookFragment.appendChild(showPreview)
    }

    dataListItems.appendChild(newBookFragment);

    const remaining = matches.length - page * BOOKS_PER_PAGE;
    dataListButton.innerHTML = /* HTML */ `
      <span>Show more</span>
      <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
    `;

    dataListButton.disabled = remaining <= 0;
})


dataListButton.innerHTML = /* HTML */
    `<span>Show more</span>
    <span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>
    `;

// When dataListItems is clicked, it shows a modal by invoking showModal() on dataListActive.
dataListItems.addEventListener('click', (event) => {
    dataListActive.showModal()
    let pathArray = Array.from(event.path || event.composedPath())
    let active;
  
    for (const node of pathArray) {
      if (active) break;
      const id = node?.dataset?.preview
      
      for (const singleBook of books) {
        if (singleBook.id === id) {
          active = singleBook
          break;
        }
      }
    }
  
    if (!active) return;
    dataListImage.src = active.image;
    dataListBlur.src = active.image;
    dataListTitle.textContent = active.title; 
    dataListSubtitle.textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
    dataListDescription.textContent = active.description;
})


//When dataListClose is clicked, it closes the modal by invoking close() on dataListActive.
dataListClose.addEventListener('click', () => {
    dataListActive.close()
})


/**
 * GENRES AND AUTHORS
 */

//When dataHeaderSearch is clicked, it shows a modal by invoking showModal() on dataSearchOverlay
dataHeaderSearch.addEventListener('click', () => {
    dataSearchOverlay.showModal()
    dataSearchTitle.focus()
})

//When dataSearchCancel is clicked, it closes modal by invoking close() on dataSearchOverlay
dataSearchCancel.addEventListener('click', () => { 
    dataSearchOverlay.close()
})

const genresFragment = document.createDocumentFragment()
const genreElement = document.createElement('option')
genreElement.value = 'any'
genreElement.innerText = 'All Genres'
genresFragment.appendChild(genreElement)

for (const [id] of Object.entries(genres)) {
    const genreElement = document.createElement('option')
    genreElement.value = id
    genreElement.innerText = genres[id]
    genresFragment.appendChild(genreElement)
}

dataSearchGenres.appendChild(genresFragment)

const authorsFragment = document.createDocumentFragment()
const authorsElement = document.createElement('option')
authorsElement.value = 'any'
authorsElement.innerText = 'All Authors'
authorsFragment.appendChild(authorsElement)

for (const [id] of Object.entries(authors)) {
    const authorsElement = document.createElement('option')
    authorsElement.value = id
    authorsElement.innerText = authors[id]
    authorsFragment.appendChild(authorsElement)
}

dataSearchAuthors.appendChild(authorsFragment)


/**
 * FILTER BOOKS BY TITLE, GENRE AND AUTHOR
 */

dataSearchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []
    
    // The for loop checks if any of the filters matches with the books and if its true the book gets pushed to the result array .
    for (const book of books) {
        const titleMatch = filters.title.trim() !== '' && book.title.toLowerCase().includes(filters.title.toLowerCase())
        const genreMatch = filters.genre !== 'any' && book.genres.includes(filters.genre)
        const authorMatch = filters.author !== 'any' && book.author.includes(filters.author)
  
        if (titleMatch || authorMatch || genreMatch) {
            result.push(book)
        }
    }

    let page = 1
    // This if statement checks the result array and the result length is equal to 0 none of the books will be displayed and the "Show More" button will be disabled.
    if (result.length === 0) {
        dataListItems.innerHTML = ''
        dataListButton.disabled = true 
        dataListMessage.classList.add('list__message_show')

        const remaining = result.length - page * BOOKS_PER_PAGE;
        dataListButton.innerHTML = /* HTML */ `
            <span>Show more</span>
            <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
        `;
    } else {
        dataListMessage.classList.remove('list__message_show')
        dataListItems.innerHTML = ''

        const searchStartIndex = (page - 1) * BOOKS_PER_PAGE
        const searchEndIndex = searchStartIndex + BOOKS_PER_PAGE

        const searchBookFragment = document.createDocumentFragment()
        const searchBookExtracted = result.slice(searchStartIndex, searchEndIndex)

        // This loop iterates over the book previews to display on the current page, creates a book preview button using the createPreview function, and appends the button to the bookFragment container
        for (const preview of searchBookExtracted) {
            const showPreview = createPreview(preview)
            searchBookFragment.appendChild(showPreview)
        }
        
        dataListItems.appendChild(searchBookFragment)
        
        const remaining = result.length - page * BOOKS_PER_PAGE;
        dataListButton.innerHTML = /* HTML */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
        `;

        dataListButton.disabled = remaining <= 0;

        // This sets up a click event listener for the "Show More" button. When clicked, the code executes the logic to display the next set of book previews.
        dataListButton.addEventListener('click', () => {
            page++;
        
            const moreSearchStartIndex = (page - 1) * BOOKS_PER_PAGE
            const moreSearchEndIndex = moreSearchStartIndex + BOOKS_PER_PAGE
        
            const moreSearchBookExtracted = result.slice(moreSearchStartIndex, moreSearchEndIndex)
        
            const moreSearchBookFragment = document.createDocumentFragment()
        
            for (const preview of moreSearchBookExtracted) {
                const showPreview = createPreview(preview)
                moreSearchBookFragment.appendChild(showPreview)
            }

            dataListItems.appendChild(moreSearchBookFragment);
        
            const remaining = result.length - page * BOOKS_PER_PAGE;
            dataListButton.innerHTML = /* HTML */ `
              <span>Show more</span>
              <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
            `;
        
            dataListButton.disabled = remaining <= 0;
        })
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    dataSearchOverlay.close()
    dataSearchForm.reset()
})


/** 
 * THEME SELECT
 */

dataHeaderSettings.addEventListener('click', () => {
    dataSettingsOverlay.showModal()
})

dataSettingsCancel.addEventListener('click', () => { 
    dataSettingsOverlay.close()
})

//The css object defines two themes, 'day' and 'night'
const css = {
    day : ['255, 255, 255', '10, 10, 20'],
    night: ['10, 10, 20', '255, 255, 255']
}

//The value of the dataSettingsTheme input is determined based on whether the user's preferred color scheme is dark or not.
dataSettingsTheme.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
let v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'

//This code sets up for a submit event listener. When the form is submitted, the selected object is created by converting the form data to an object using Object.fromEntries(). 
// Depending on the theme selected, the --color-light and --color-dark CSS variables are updated with the corresponding light and dark color values from the css object
dataSettingsForm.addEventListener('submit', (event) => { 
    event.preventDefault()
    const formSubmit = new FormData(event.target)
    const selected = Object.fromEntries(formSubmit)

    if (selected.theme === 'night') {
        document.documentElement.style.setProperty('--color-light', css[selected.theme][0])
        document.documentElement.style.setProperty('--color-dark', css[selected.theme][1])     
    } else if (selected.theme === 'day') {
        document.documentElement.style.setProperty('--color-light', css[selected.theme][0])
        document.documentElement.style.setProperty('--color-dark', css[selected.theme][1])
    }

    dataSettingsOverlay.close()
})