import { createOrderData, state, updateDragging } from './data.js';
import { html, createOrderHtml, moveToColumn, updateDraggingHtml } from './view.js';


/**
 * A handler that fires when a user drags over any element inside a column. In
 * order to determine which column the user is dragging over the entire event
 * bubble path is checked with `event.path` (or `event.composedPath()` for
 * browsers that don't support `event.path`). The bubbling path is looped over
 * until an element with a `data-area` attribute is found. Once found both the
 * active dragging column is set in the `state` object in "data.js" and the HTML
 * is updated to reflect the new column.
 *
 * @param {Event} event 
 */
const handleDragOver = (event) => {
    event.preventDefault();
    const path = event.path || event.composedPath()
    let column = null

    for (const element of path) {
        const { area } = element.dataset
        if (area) {
            column = area
            break;
        }
    }

    if (!column) return
    updateDragging({ over: column })
    updateDraggingHtml({ over: column })
}


const handleDragStart = (event) => {
    const item = event.target
    updateDragging(item)
    updateDraggingHtml(item)
}

const handleDragEnd = (event) => {
    moveToColumn(event.target.dataset.id,state.dragging.over)
};

const handleHelpToggle = (event) => {
    // Show help overlay when clicking on the help button, close when clicking cancel
    if (event.target == html.other.help){
        html.help.overlay.show()
    } else if (event.target == html.help.cancel) {
        html.help.overlay.close()
    }
}

const handleAddToggle = (event) => {
    // Show add overlay when clicking on the add button, close when clicking cancel
    if (event.target == html.other.add){
        html.add.overlay.show()
    } else if (event.target == html.add.cancel) {
        html.add.overlay.close()
    }
}
const handleAddSubmit = (event) => {
    event.preventDefault()

    // Gather input values and create order data
    const props = {
        title: html.add.title.value,
        table: html.add.table.value,
        column: "ordered"
    }

    // Find the target grid and append the new order
    const grid = html.other.grid.querySelector(`[data-column=${props.column}]`)
    const orderData = createOrderData(props)
    const order = createOrderHtml(orderData)
    grid.appendChild(order)

    // Close the add overlay and reset the form
    html.add.overlay.close()
    html.add.form.reset()
}

const handleEditToggle = (event) => {
    // Show edit overlay and populate fields when clicking on an order element
    html.edit.overlay.show()
    

    if (event.target.dataset.id){
        // Populate fields if clicking on an order element
        const props = {
            id: event.target.dataset.id,
            title: event.target.querySelector('[data-order-title]').textContent,
            table: event.target.querySelector('[data-order-table]').textContent,
        }

        // Set values in the edit form
        html.edit.id = props.id
        html.edit.title.setAttribute('value',props.title)
        html.edit.table.selectedIndex = props.table - 1

    } else if (event.target == html.edit.cancel){
        // Reset the form and close the overlay if clicking cancel
        html.edit.form.reset()
        html.edit.overlay.close()
    }
}

const handleEditSubmit = (event) => {
    event.preventDefault()

    // Gather input values and create order data
    const props = {
        id: html.edit.id,
        title: html.edit.title.value,
        table: html.edit.table.value,
        created: new Date(),
        column: html.edit.column.selectedIndex
    }

    // Map status column values
    const statusCol = {0:"ordered", 1:"preparing", 2:"served"}

    // Find the target order and its grid
    const order = document.querySelector(`[data-id="${html.edit.id}"]`)
    const removeOrder = document.querySelector(`[data-id="${html.edit.id}"]`)
    
    // Check if the order is moved to the same column
    if (props.column == 0 && document.querySelector(`[data-column="ordered"] [data-id="${html.edit.id}"]`)) {
        order.querySelector('[data-order-title]').textContent = html.edit.title.value
        order.querySelector('[data-order-table]').textContent = html.edit.table.value
    } else {
        // Create a new order element and move it to the appropriate grid
        const newOrder = createOrderHtml(props)
        removeOrder.remove()
        const grid = html.other.grid.querySelector(`[data-column=${statusCol[props.column]}]`)
        grid.appendChild(newOrder)
    }

    // Reset the form and close the overlay
    html.edit.form.reset()
    html.edit.overlay.close()
}
const handleDelete = (event) => {
    // Close the edit overlay and remove the order element
    html.edit.overlay.close()
    const order = document.querySelector(`[data-id="${html.edit.id}"]`)
    order.remove()
}

html.add.cancel.addEventListener('click', handleAddToggle)
html.other.add.addEventListener('click', handleAddToggle)
html.add.form.addEventListener('submit', handleAddSubmit)

html.other.grid.addEventListener('click', handleEditToggle)
html.edit.cancel.addEventListener('click', handleEditToggle)
html.edit.form.addEventListener('submit', handleEditSubmit)
html.edit.delete.addEventListener('click', handleDelete)

html.help.cancel.addEventListener('click', handleHelpToggle)
html.other.help.addEventListener('click', handleHelpToggle)

for (const htmlColumn of Object.values(html.columns)) {
    htmlColumn.addEventListener('dragstart', handleDragStart)
    htmlColumn.addEventListener('dragend', handleDragEnd)
}

for (const htmlArea of Object.values(html.area)) {
    htmlArea.addEventListener('dragover', handleDragOver)
}
